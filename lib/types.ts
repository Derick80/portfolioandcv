/* Mdx Blog types */
import { User ,MdxPost} from '@prisma/client'
import { z } from 'zod'

export const BASE_URL = 'https://derickhoskinson.com'
export const frontMatter = z.object({
    title: z.string({
        required_error:
            'Title is required You forgot to add a title in the front matter'
    }),
    date: z.string({
        required_error:
            'Date is required You forgot to add a date in the front matter'
    }),
    author: z.string({
        required_error:
            'Author is required You forgot to add an author in the front matter'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    imageUrl: z.string().optional(),
    published: z.boolean({
        required_error: 'Published is required'
    }),
    categories: z.array(
        z.string({
            required_error: 'At least one category should be assigned.'
        })
    )
})

export type FrontMatter = z.infer<typeof frontMatter>

export const mdxcompiled = frontMatter.extend({
    slug: z.string({
        required_error:
            'Slug is required. Something went wrong with the slug generation'
    }),
    wordCount: z.number({
        required_error:
            'WordCount is required. Something went wrong with the word count calculation'
    }),
    content: z.string({
        required_error:
            'Content is required. Something went wrong with the content'
    })
})

export type MdxCompiled = z.infer<typeof mdxcompiled>
export const commentPostSchema = z.object({
    message: z.string({
        required_error: 'Message is required    '
    }),
    postId: z.string({
        required_error: 'Post ID is required'
    }),
    targetId: z.string({
        required_error: 'Target ID is required'
    }),
    shield: z.string({
        required_error: 'Shield is required'
    })
})
export type CategoryFilterType = {
    category: string
    related: string[]
    categoryCount: number
}

export const blogPostSchema = z.object({
    slug: z.string({
        required_error: 'Slug is required'
    })
})

export const targetPostSchema = z.object({
    postId: z.string({
        required_error: 'Post ID is required'
    })
})

export type BlogPostSlug = z.infer<typeof blogPostSchema>
export type TargetPostId = z.infer<typeof targetPostSchema>

export type PostWithRelations = MdxPost & {
    author: User
    categories: []
}

export interface Duty {
    title: string
    order: number
}
export interface Experience {
    company: string
    position: string
    location: string | null
    startDate: Date
    endDate: Date | null
    isCurrent: boolean
    duties: Duty[]
}

export interface Skill {
    title: string
    category: string
}

export interface Education {
    school: string
    degree: string
    startDate: Date
    endDate: Date
    description: string
    duties: Duty[]
}

export interface Publication {
    title: string
    journal: string
    journalInfo: string
    publicationDate: Date
    doi: string
    pmid: string
    authors: string[]
}

export interface CVData {
    name: string
    phone: string
    email: string
    address: string
    blurb: string
    experience: Experience[]
    education: Education[]
    publications: Publication[]
    skills: Skill[]
}




export const aiStatment = `This application's development process integrates artificial intelligence for the provision of code completion and ideational stimuli. It is imperative to delineate that the resultant creative and intellectual property, encompassing all textual content and written materials presented within this web application, originates from my authorship. Exceptions to this authorship are explicitly noted through meticulous citation of external sources, adhering to established academic and professional standards for intellectual property attribution. This methodology ensures both the efficient utilization of AI tools and the preservation of intellectual integrity.`