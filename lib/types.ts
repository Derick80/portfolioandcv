/* Mdx Blog types */
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
