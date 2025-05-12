'use server'

import OpenAI from 'openai'
import { z } from "zod"
import { zodTextFormat } from "openai/helpers/zod";

const openai_key = process.env.OPENAI_API_KEY
if (!openai_key) {
    throw new Error('OpenAI API key not found')
}

const openai = new OpenAI({ apiKey: openai_key })


// sasve the input to the database as a user input then use the input to query the openai model. Then parse and save the resposne to the database as a model output. 




// query the openai model with the user input and return the response.

// create a response query 

const moaResourcesSchema = z.object({
    pmid: z.string(),
    title: z.string(),
    year: z.string(),
    brief_experimental_summary: z.string(),
    
})

const moaResponseSchema = z.object({
    input_gene: z.string(),
    gene_description: z.string(),
    overall_mechanism_of_disease: z.string(),
    solid_tumor_specificity: z.string(),
    hematologic_malignancy_specificity: z.string(),
    moa_resources: z.array(moaResourcesSchema),

})


const inputWord = z.object({
    input_word: z.string(),
})

export const getGPTResponse = async (
    prevState:any,formData:FormData
   
    ) => {

    const validatedData = inputWord.safeParse({
        input_word: formData.get("input_word"),
    })
    if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error);
        return;
    }

    const { input_word } = validatedData.data;
        const prompt = `
        Generate a report detailing the mechanism of disease for the following ${input_word} in the context of cancer. Output the report in JSON format using the following schema:`

        try{
           
            const response = await openai.responses.parse({
                model: 'gpt-4.1-2025-04-14',
                input: [
                    {
                        role: 'system', 
                        content: 'You provide detailedResponse according to the user input.'       }
                        ,
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                    
            })
            const raw = response.output_parsed
            if (!raw) throw new Error('OpenAI returned empty response')
                console.log(raw, "raw response")
           
                    return {
                response: raw,
                success: true
            }
        } catch (error) {
            console.error('Error generating response:', error)
            throw new Error('Error generating response')
        }        
    

}