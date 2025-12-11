'use server'

import { prisma } from "@/prisma";
import * as z from "zod";
import OpenAI from "openai";

export const getAllGeneMechanisms = async () => {
  return prisma.mechanism.findMany({
    include: {
      articles: true,
    },
    orderBy: {
     createdAt: "desc",
    },
  });
}



const buildPubMedQuery = (geneSymbol: string): string => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;

  const cancerTypes = [
    "cancer",
    "carcinoma",
    "tumor",
    "neoplasm",
    "malignancy",
    "adenocarcinoma",
    "melanoma",
    "lymphoma",
    "leukemia",
    "sarcoma",
  ];

  const mechanisms = [
    "mechanism",
    "loss of function",
    "gain of function",
    "lof",
    "gof",
    "oncogene",
    "tumor suppressor",
    "pathogenic",
    "mutation",
    "driver",
  ];

  const modelTerms = [
    "cell line",
    "xenograft",
    "mouse model",
    "PDX",
    "in vitro",
    "in vivo",
  ];
  const mutationTerms = [
    "mutation",
    "mutant",
    "hotspot",
    "variant",
    "deletion",
    "insertion",
    "frameshift",
    "nonsense",
    "missense",
    "splice site",
    "truncating",

  ];

  const cancerSearch = cancerTypes.map((kw) => `"${kw}"`).join(" OR ");
  const mechanismSearch = mechanisms.map((kw) => `"${kw}"`).join(" OR ");

  const query = `
    ${geneSymbol}[Gene]
    AND (${cancerSearch})
    AND (${mechanismSearch})
    AND (${modelTerms.map((kw) => `"${kw}"`).join(" OR ")})
    AND (${mutationTerms.map((kw) => `"${kw}"`).join(" OR ")})
    AND ("${startYear}"[PDat] : "${currentYear}"[PDat])
    AND (english[lang])
  `.replace(/\s+/g, " ");

  return query;
};

const searchSchema = z.object({
  geneSymbol: z.string().min(1, "Gene symbol is required"),
});
export const searchPubmed = async(prevState:any, formData: FormData) => {
    const validatedData = searchSchema.safeParse({
        geneSymbol: formData.get("geneSymbol") as string,
    });

    if (!validatedData.success) {
        return {
            ...prevState,
            error: validatedData.error.errors.map((e) => e.message).join(", "),
        };
    }
    
    const { geneSymbol } = validatedData.data;
    const query = buildPubMedQuery(geneSymbol);
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?` +
    new URLSearchParams({
      db: "pubmed",
      term: query,
      retmode: "json",
      retmax: String(10),
      sort: "pub+date",
    }).toString();

    const response = await fetch(url);
    const data = await response.json();
    
    const idList: string[] = data.esearchresult.idlist;
    const articleData = await getArticleDetails(idList);
    // save the mechanism and then the article information to the database if needed
    const savedMechanism = await prisma.mechanism.upsert({
      where: { geneSymbol },
      update: {
        geneSymbol,
        query: query,
      },
      create: { 
        geneSymbol,
        query: query,
       },

    });
    // For each article, upsert into the database
  const updated = await Promise.all(articleData.map(async (article) => {
    return prisma.article.upsert({
      where: { pmid: article.pmid || "" },
      update: {
        title: article.title,
        abstract: article.abstract,
        year: article.year,
        journal: article.journal,
        authors: article.authors,
        url: article.url,
        mechanismId: savedMechanism.id,
      },
      create: {
        pmid: article.pmid || "",
        title: article.title,
        abstract: article.abstract,
        year: article.year,
        journal: article.journal,
        authors: article.authors,
        url: article.url,
        mechanismId: savedMechanism.id,
      },
    });
  }));
  // Send to GPT for summarization
  // const gptSummary = await sendGPTArticleData(articleData, geneSymbol);

    return JSON.stringify(updated, null, 2);


}


type Article = {
  pmid: string | null;
  title: string | null;
  abstract: string | null;
  year: string | null;
  journal: string | null;
  authors: string[];
  url: string | null;
};
const getArticleDetails = async (idList: string[]) => {
  if (idList.length === 0) {
    return [];
  }

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?` +
    new URLSearchParams({
      db: "pubmed",
      id: idList.join(","),
      retmode: "xml",
    }).toString();

  const response = await fetch(url);
  const xmlText = await response.text();

  return parseArticleXML(xmlText);
};

const parseArticleXML = (xmlText: string) => {
  const articles = [] as Article[];
  
  // Split by PubmedArticle tags
  const articleMatches = xmlText.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g);
  
  for (const match of articleMatches) {
    const articleXML = match[1];
    
    // Extract PMID
    const pmidMatch = articleXML.match(/<PMID[^>]*>(\d+)<\/PMID>/);
    const pmid = pmidMatch ? pmidMatch[1] : null;
    
    // Extract Title
    const titleMatch = articleXML.match(/<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : null;
    
    // Extract Abstract
    const abstractMatch = articleXML.match(/<Abstract>([\s\S]*?)<\/Abstract>/);
    let abstract = null;
    if (abstractMatch) {
      const abstractTexts = abstractMatch[1].matchAll(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/g);
      abstract = Array.from(abstractTexts).map(m => m[1].replace(/<[^>]+>/g, '')).join(' ');
    }
    
    // Extract Year
    const yearMatch = articleXML.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>/);
    const year = yearMatch ? yearMatch[1] : null;
    
    // Extract Journal
    const journalMatch = articleXML.match(/<Journal>[\s\S]*?<Title>([\s\S]*?)<\/Title>/);
    const journal = journalMatch ? journalMatch[1] : null;
    
    // Extract Authors
    const authors = [];
    const authorMatches = articleXML.matchAll(/<Author[^>]*>([\s\S]*?)<\/Author>/g);
    
    for (const authorMatch of authorMatches) {
      const authorXML = authorMatch[1];
      const lastNameMatch = authorXML.match(/<LastName>(.*?)<\/LastName>/);
      const foreNameMatch = authorXML.match(/<ForeName>(.*?)<\/ForeName>/);
      const initialsMatch = authorXML.match(/<Initials>(.*?)<\/Initials>/);
      
      if (lastNameMatch) {
        const lastName = lastNameMatch[1];
        const firstName = foreNameMatch ? foreNameMatch[1] : (initialsMatch ? initialsMatch[1] : '');
        authors.push(`${firstName} ${lastName}`.trim());
      }
    }
    
    articles.push({
      pmid,
      title,
      abstract,
      year,
      journal,
      authors,
      url: pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : null,
    });
  }
  
  return articles;
};


const GPTResponseSchema = z.object({
  // mechanism is loss of function or gain of function or conflicting or unknown
  mechanism: z.string(
    ).refine((val) => ['loss of function', 'gain of function', 'conflicting', 'unknown'].includes(val.toLowerCase()), { 
      message: "Mechanism must be one of: loss of function, gain of function, conflicting, unknown"
    }
  ),
  keyExperiments: z.string().optional(),
  pmid: z.string().optional(),

})


const sendGPTArticleData = async (articles: Article[], geneSymbol: string) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OpenAI API key not configured.");
  }
  const client = new OpenAI(
    {apiKey: apiKey}
  );

  const instructions = `
  1. first look through the article abstracts provided and ensure they are related to cancer mechanisms for the gene symbol provided.
  2. Next, for each article, determine if it provides evidence for a loss of function or gain of function mechanism in cancer for the specified gene symbol.
  3. If the article supports a loss of function mechanism, label it as "loss of function". If it supports a gain of function mechanism, label it as "gain of function".
  4. If the article provides conflicting evidence or is inconclusive, label it as "conflicting". If the article does not provide relevant information, label it as "unknown".
  5. For each article, summarize the key experiments or findings that led to your conclusion.
  6. Return the results in a JSON array format with each entry containing the fields: mechanism, keyExperiments, pmid.
  `;
  
  const response = await client.responses.create({
    model: "gpt-5",
    input:[
      {
        role: "system",
        content: `You are an expert in cancer genetics and gene mechanisms. Your task is to analyze scientific article abstracts to determine the mechanism of action for a specified gene symbol in cancer.`
      },
      {
        role: "user",
        content: `Gene Symbol: ${geneSymbol}\n\nInstructions: ${instructions}\n\nArticles:\n${articles.map((a, idx) => `Article ${idx + 1} (PMID: ${a.pmid}): ${a.abstract}`).join('\n\n')}`
      }
    ],
    
  }
)
console.log(response.output_text, 'GPT Response');;
return response.output_text;


}