// This file was created on 11/3/2023 and is used to seed the database with data from the acmg_disease_list.ts file

// rulesetVersion: 'SVC_V3', 'SVC_V3_5', 'SVC_V4'
// 'SVC_V3' refers to the 2015 ACMG guidelines (Richards et al. 2015) with lowered bayes weight to account for the change in guidelines where PVS1 wasn't quite enough to be considered Likely Pathogenic.
//  'SVC_V3_5' refers to the 2015 ACMG guidelines (Richards et al. 2015) with lowered bayes weights applied as suggested by Tatigian et al. 2020.
// 'SVC_V4' refers to the unreleased SVC_V4 guidelines that will be released later in 2023

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criterion_v4 = [
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PVS1",
    baseWeight: 5,
    baseStrength: "Very Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "Null variant (nonsense, frameshift, canonical ±1 or 2 splice sites, initiation codon, single or multiexon deletion) in a gene where LOF is a known mechanism of disease",
    example: "Val->Leu caused by either G>C or G>T in the same codon.",
    caveat:
      "Beware of genes where LOF is not a known disease mechanism (e.g., GFAP, MYH7). Use caution interpreting LOF variants at the extreme 3’ end of a gene. Use caution with splice variants that are predicted to lead to exon skipping but leave the remainder of the protein intact . Use caution in the presence of multiple transcripts.",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PS1",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "Same amino acid change as a previously established pathogenic variant regardless of nucleotide change. Use for protein changes as long as splicing is ruled-out for both alterations. se for protein changes as long as splicing is ruled-out for both alterations. Use for RNA changes as code PS1_RNA_Moderate if predictions or observations are similar or worse for the variant under consideration. Close matches must be VCEP approved LP/P variants.",
    example: "Val→Leu caused by either G>C or G>T in the same codon ",
    caveat:
      "Beware of changes that impact splicing rather than at the amino acid/protein level",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "DeNovoData",
    label: "PS2",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "De novo (both maternity and paternity confirmed) in a patient with the disease and no family history.",
    example: "",
    caveat:
      "Confirmation of paternity only is insufficient. Egg donation, surrogate motherhood, errors in embryo transfer, etc. can contribute to non-maternity.",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "Functional Data",
    label: "PS3",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "Well established in vitro or in vivo functional studies supportive of a damaging effect on the gene or gene product.",
    example: "",
    caveat:
      "Functional studies that have been validated and shown to be reproducible and robust in a clinical diagnostic laboratory setting are considered the most well-established.",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "PopulationData",
    label: "PS4",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "The prevalence of the variant in affected individuals is significantly increased compared to the prevalence in controls.",
    caveat:
      "Note 1: Relative risk (RR) or odds ratio (OR), as obtained from case-control studies, is >5.0 and the confidence interval around the estimate of RR or OR does not include 1.0. See manuscript for detailed guidance. Note 2: In instances of very rare variants where case-control studies may not reach statistical significance, the prior observation of the variant in multiple unrelated patients with the same phenotype, and its absence in controls, may be used as moderate level of evidence.",
    example: "",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "Functional Data",
    label: "PM1",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Located in a mutational hot spot and/or critical and well-established functional domain (e.g. active site of an enzyme) without benign variation.",
    example:
      "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes or Exome Aggregation Consortium.",
    caveat:
      "Population data for indels may be poorly called by next generation sequencing.",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "PopulationData",
    label: "PM2",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes or Exome Aggregation Consortium.",
    example: "",
    caveat:
      "Caveat: Population data for indels may be poorly called by next generation sequencing.",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "PopulationData",
    label: "PM2_Supporting",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes or Exome Aggregation Consortium.",
    example: "",
    caveat:
      "Caveat: Population data for indels may be poorly called by next generation sequencing.",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "AllelicData",
    label: "PM3",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "For recessive disorders, detected in trans with a pathogenic variant",
    example: "",
    caveat:
      "This requires testing of parents (or offspring) to determine phase.",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PM4",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Protein length changes due to in-frame deletions/insertions in a non-repeat region or stop-loss variants.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PM5",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Novel missense change at an amino acid residue where a different missense change determined to be pathogenic has been seen before.",
    example: "Arg156His is pathogenic; now you observe Arg156Cys.",
    caveat:
      "Beware of changes that impact splicing rather than at the amino acid/protein level.",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "DeNovoData",
    label: "PM6",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Assumed de novo, but without confirmation of paternity and maternity.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "SegregationData",
    label: "PP1",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Co-segregation with disease in multiple affected family members in a gene definitively known to cause the disease.",
    example: "",
    caveat:
      "Note: May be used as stronger evidence with increasing segregation data",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "Functional Data",
    label: "PP2",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Missense variant in a gene that has a low rate of benign missense variation and where missense variants are a common mechanism of disease.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PP3",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Multiple lines of Computational evidence support a deleterious effect on the gene or gene product (conservation, evolutionary, splicing impact, etc.).",
    example: "",
    caveat:
      "As many in silico algorithms use the same or very similar input for their predictions, each algorithm should not be counted as an independent criterion. PP3 can be used only once in any evaluation of a variant.",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "Other Data",
    label: "PP4",
    baseWeight: 1,
    evidenceTypeShort: "Other Data",
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition: `Patient’s phenotype or family history is highly specific for a disease with a single genetic etiology.`,
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "OtherDatabase",
    label: "PP5",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Reputable source recently reports variant as pathogenic, but the evidence is not available to the laboratory to perform an independent evaluation.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "PopulationData",
    label: "BA1",
    baseWeight: -5,
    baseStrength: "Stand alone",
    evidenceDirection: "Benign",
    definition: "Filtering Allele Frequency >.5%.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "PopulationData",
    label: "BS1",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition: "Filtering Allele Frequency >.05%.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "PopulationData",
    label: "BS2",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition:
      "bserved in a healthy adult individual for a recessive (homozygous), dominant (heterozygous), or X-linked (hemizygous) disorder, with full penetrance expected at an early age.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "Functional Data",
    label: "BS3",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition:
      "Well-established in vitro or in vivo functional studies show no damaging effect on protein function or splicing.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "SegregationData",
    label: "BS4",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition: "Lack of segregation in affected members of a family.",
    example: '"ack of segregation in affected members of a family.',
    caveat:
      "Caveat: The presence of phenocopies for common phenotypes (i.e. cancer, epilepsy) can mimic lack of segregation among affected individuals. Also, families may have more than one pathogenic variant contributing to an autosomal dominant disorder, further confounding an apparent lack of segregation.",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP1",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Missense variant in a gene for which primarily truncating variants are known to cause disease.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "AllelicData",
    label: "BP2",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Observed in trans with a pathogenic variant for a fully penetrant dominant gene/disorder or observed in cis with a pathogenic variant in any inheritance pattern.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP3",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "In frame-deletions/insertions in a repetitive region without a known function.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP4",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Multiple lines of Computational evidence suggest no impact on gene or gene product (conservation, evolutionary, splicing impact, etc)",
    example: "",
    caveat:
      "Caveat: As many in silico algorithms use the same or very similar input for their predictions, each algorithm cannot be counted as an independent criterion. BP4 can be used only once in any evaluation of a variant",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "AllelicData",
    label: "BP5",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Variant found in a case with an alternate molecular basis for disease.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "OtherDatabase",
    label: "BP6",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Reputable source recently reports variant as benign, but the evidence is not available to the laboratory to perform an independent evaluation.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },

  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP7",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "A synonymous variant for which splicing prediction algorithms predict no impact to the splice consensus sequence nor the creation of a new splice site AND the nucleotide is not highly conserved.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PVS1",
    baseWeight: 5,
    baseStrength: "Very Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "Null variant (nonsense, frameshift, canonical ±1 or 2 splice sites, initiation codon, single or multiexon deletion) in a gene where LOF is a known mechanism of disease",
    example: "Val->Leu caused by either G>C or G>T in the same codon.",
    caveat:
      "Beware of genes where LOF is not a known disease mechanism (e.g., GFAP, MYH7). Use caution interpreting LOF variants at the extreme 3’ end of a gene. Use caution with splice variants that are predicted to lead to exon skipping but leave the remainder of the protein intact . Use caution in the presence of multiple transcripts.",
    rulesetVersion: "SVC_V3",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PVS1",
    baseWeight: 8,
    baseStrength: "Very Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "Null variant (nonsense, frameshift, canonical ±1 or 2 splice sites, initiation codon, single or multiexon deletion) in a gene where LOF is a known mechanism of disease",
    example: "Val->Leu caused by either G>C or G>T in the same codon.",
    caveat:
      "Beware of genes where LOF is not a known disease mechanism (e.g., GFAP, MYH7). Use caution interpreting LOF variants at the extreme 3’ end of a gene. Use caution with splice variants that are predicted to lead to exon skipping but leave the remainder of the protein intact . Use caution in the presence of multiple transcripts.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PS1",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "Same amino acid change as a previously established pathogenic variant regardless of nucleotide change. Use for protein changes as long as splicing is ruled-out for both alterations. se for protein changes as long as splicing is ruled-out for both alterations. Use for RNA changes as code PS1_RNA_Moderate if predictions or observations are similar or worse for the variant under consideration. Close matches must be VCEP approved LP/P variants.",
    example: "Val→Leu caused by either G>C or G>T in the same codon",
    caveat:
      "Beware of changes that impact splicing rather than at the amino acid/protein level",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "DeNovoData",
    label: "PS2",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "De novo (both maternity and paternity confirmed) in a patient with the disease and no family history.",
    example: "",
    caveat:
      "Confirmation of paternity only is insufficient. Egg donation, surrogate motherhood, errors in embryo transfer, etc. can contribute to non-maternity.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "Functional Data",
    label: "PS3",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "Well established in vitro or in vivo functional studies supportive of a damaging effect on the gene or gene product.",
    example: "",
    caveat:
      "Functional studies that have been validated and shown to be reproducible and robust in a clinical diagnostic laboratory setting are considered the most well-established.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "PopulationData",
    label: "PS4",
    baseWeight: 4,
    baseStrength: "Strong",
    evidenceDirection: "Pathogenic",
    definition:
      "The prevalence of the variant in affected individuals is significantly increased compared to the prevalence in controls.",
    caveat:
      "Note 1: Relative risk (RR) or odds ratio (OR), as obtained from case-control studies, is >5.0 and the confidence interval around the estimate of RR or OR does not include 1.0. See manuscript for detailed guidance. Note 2: In instances of very rare variants where case-control studies may not reach statistical significance, the prior observation of the variant in multiple unrelated patients with the same phenotype, and its absence in controls, may be used as moderate level of evidence.",
    example: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "Functional Data",
    label: "PM1",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Located in a mutational hot spot and/or critical and well-established functional domain (e.g. active site of an enzyme) without benign variation.",
    example:
      "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes or Exome Aggregation Consortium.",
    caveat:
      "Population data for indels may be poorly called by next generation sequencing.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "PopulationData",
    label: "PM2",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes or Exome Aggregation Consortium.",
    example: "",
    caveat:
      "Caveat: Population data for indels may be poorly called by next generation sequencing.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "PopulationData",
    label: "PM2_Supporting",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes or Exome Aggregation Consortium.",
    example: "",
    caveat:
      "Caveat: Population data for indels may be poorly called by next generation sequencing.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "AllelicData",
    label: "PM3",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "For recessive disorders, detected in trans with a pathogenic variant",
    example: "",
    caveat:
      "This requires testing of parents (or offspring) to determine phase.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PM4",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Protein length changes due to in-frame deletions/insertions in a non-repeat region or stop-loss variants.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PM5",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Novel missense change at an amino acid residue where a different missense change determined to be pathogenic has been seen before.",
    example: "Arg156His is pathogenic; now you observe Arg156Cys.",
    caveat:
      "Beware of changes that impact splicing rather than at the amino acid/protein level.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "DeNovoData",
    label: "PM6",
    baseWeight: 2,
    baseStrength: "Moderate",
    evidenceDirection: "Pathogenic",
    definition:
      "Assumed de novo, but without confirmation of paternity and maternity.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "SegregationData",
    label: "PP1",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Co-segregation with disease in multiple affected family members in a gene definitively known to cause the disease.",
    example: "",
    caveat:
      "Note: May be used as stronger evidence with increasing segregation data",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "Functional Data",
    label: "PP2",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Missense variant in a gene that has a low rate of benign missense variation and where missense variants are a common mechanism of disease.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "PP3",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Multiple lines of Computational evidence support a deleterious effect on the gene or gene product (conservation, evolutionary, splicing impact, etc.).",
    example: "",
    caveat:
      "As many in silico algorithms use the same or very similar input for their predictions, each algorithm should not be counted as an independent criterion. PP3 can be used only once in any evaluation of a variant.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "Other Data",
    label: "PP4",
    baseWeight: 1,
    evidenceTypeShort: "Other Data",
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition: `Patient’s phenotype or family history is highly specific for a disease with a single genetic etiology.`,
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "OtherDatabase",
    label: "PP5",
    baseWeight: 1,
    baseStrength: "Supporting",
    evidenceDirection: "Pathogenic",
    definition:
      "Reputable source recently reports variant as pathogenic, but the evidence is not available to the laboratory to perform an independent evaluation.",
    example: "",
    caveat:
      "This fell out of favor in recent publications and should not be used",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "PopulationData",
    label: "BA1",
    baseWeight: -8,
    baseStrength: "Stand alone",
    evidenceDirection: "Benign",
    definition: "Filtering Allele Frequency >.5%.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "PopulationData",
    label: "BS1",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition:
      "Filtering Allele Frequency >.05% or AF is greater than expected for disorder",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "PopulationData",
    label: "BS2",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition:
      "Observed in a healthy adult individual for a recessive (homozygous), dominant (heterozygous), or X-linked (hemizygous) disorder, with full penetrance expected at an early age.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "Functional Data",
    label: "BS3",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition:
      "Well-established in vitro or in vivo functional studies show no damaging effect on protein function or splicing.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "SegregationData",
    label: "BS4",
    baseWeight: -4,
    baseStrength: "Strong",
    evidenceDirection: "Benign",
    definition: "Lack of segregation in affected members of a family.",
    example: '"ack of segregation in affected members of a family.',
    caveat:
      "Caveat: The presence of phenocopies for common phenotypes (i.e. cancer, epilepsy) can mimic lack of segregation among affected individuals. Also, families may have more than one pathogenic variant contributing to an autosomal dominant disorder, further confounding an apparent lack of segregation.",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP1",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Missense variant in a gene for which primarily truncating variants are known to cause disease.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "AllelicData",
    label: "BP2",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Observed in trans with a pathogenic variant for a fully penetrant dominant gene/disorder or observed in cis with a pathogenic variant in any inheritance pattern.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP3",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "In frame-deletions/insertions in a repetitive region without a known function.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP4",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Multiple lines of Computational evidence suggest no impact on gene or gene product (conservation, evolutionary, splicing impact, etc)",
    example: "",
    caveat:
      "Caveat: As many in silico algorithms use the same or very similar input for their predictions, each algorithm cannot be counted as an independent criterion. BP4 can be used only once in any evaluation of a variant",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "AllelicData",
    label: "BP5",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Variant found in a case with an alternate molecular basis for disease.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "OtherDatabase",
    label: "BP6",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "Reputable source recently reports variant as benign, but the evidence is not available to the laboratory to perform an independent evaluation.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    evidenceCategory: "ComputationalAndPredictiveData",
    label: "BP7",
    baseWeight: -1,
    baseStrength: "Supporting",
    evidenceDirection: "Benign",
    definition:
      "A synonymous variant for which splicing prediction algorithms predict no impact to the splice consensus sequence nor the creation of a new splice site AND the nucleotide is not highly conserved.",
    example: "",
    caveat: "",
    rulesetVersion: "SVC_v3_5",
  },
  {
    code: "CLN_CCR",
    label: "Case-control ratio",
    definition: `Case-control ratio is...`,
    evidenceCategory: "ClinicalEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "CLN_COB",
    label: "Case observation counts",
    definition: `Case observation counts are...`,

    evidenceCategory: "ClinicalEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "CLN_LNK",
    label: "Linkage",
    definition: `Linkage is...`,
    evidenceCategory: "ClinicalEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "CLN_PHE",
    label: "specific phenotype",
    definition: `specific phenotype is...`,
    evidenceCategory: "ClinicalEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "CLN_DNV",
    label: "de novo",
    definition: `de novo is...`,
    evidenceCategory: "ClinicalEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "CLN_CTG",
    label: "Cis and trans genotypes",
    definition: `cis and trans variants are...`,
    evidenceCategory: "ClinicalEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "POP_FRQ",
    label: "Population frequency",
    definition: `Allele frequency of variant under assessment compared to
calculated disease allele frequency (DAF) threshold is...`,
    evidenceCategory: "PopulationEvidence",

    rulesetVersion: "SVC_v4",
  },

  {
    code: "IMP_LOF",

    label: "Loss of function variants",
    definition: `Loss of function variants are those that are predicted to undergo nonsense mediated decay (NMD) or are frameshift variants.`,

    evidenceCategory: "MolecularImpactEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "IMP_NSM",
    label: "Missense variants",

    evidenceCategory: "MolecularImpactEvidence",

    rulesetVersion: "SVC_v4",
  },

  {
    code: "IMP_SVN",
    label: "Synonymous variants",

    evidenceCategory: "MolecularImpactEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "IMP_INF",
    label: "Inframe delins",

    evidenceCategory: "MolecularImpactEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "IMP_SPL",
    label: "Splice assessment",

    evidenceCategory: "MolecularImpactEvidence",
    rulesetVersion: "SVC_v4",
  },
  {
    code: "IMP_FXN",
    label: "Variant-specific functional evidence",
    evidenceCategory: "MolecularImpactEvidence",
    rulesetVersion: "SVC_v4",
  },
];
