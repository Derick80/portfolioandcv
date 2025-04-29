'use server'

import * as fs from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { MdxCompiled } from '@/lib/types'
import { MdxComponents } from '@/lib/mdx-components'

// Constants
const POSTS_FOLDER = path.join(process.cwd(), 'app/blog/content')

// Utility Functions
/**
 * Reads the content of an MDX file and parses its frontmatter.
 * @param filePath - Path to the MDX file.
 */
const readMDXFile = async (filePath: string) => {
    const rawContent = await fs.readFile(filePath, 'utf-8')
    return parseFrontmatter(rawContent)
}

/**
 * Parses the frontmatter and content of an MDX file.
 * @param rawContent - Raw content of the MDX file.
 */
const parseFrontmatter = async (rawContent: string) => {
    const { content, frontmatter } = await compileMDX<MdxCompiled>({
        source: rawContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                format: 'mdx',
            },
        },
        components: {
            ...MdxComponents.components,
        },
    })

    frontmatter.slug = frontmatter.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
    frontmatter.wordCount = rawContent.split(/\s+/g).length
    frontmatter.content = rawContent

    return {
        ...frontmatter,
        rawMdx: content,
    }
}

/**
 * Retrieves all MDX files from a directory.
 * @param dir - Directory to search for MDX files.
 */
const getMDXFiles = async (dir: string) => {
    return await fs.readdir(dir).then((files) => {
        return files.filter((file) => path.extname(file) === '.mdx')
    })
}

// Exported Functions
/**
 * Retrieves all posts by reading and parsing MDX files in the posts folder.
 */
export const getAllPosts = async () => {
    return await getMdXData(POSTS_FOLDER)
}

/**
 * Retrieves a single post by its slug.
 * @param slug - The slug of the post.
 */
export const getPostBySlug = async (slug: string) => {
    return await getAllPosts().then((posts) => {
        return posts.find((post) => post.slug === slug)
    })
}

/**
 * Reads and parses all MDX files in a directory.
 * @param dir - Directory containing MDX files.
 */
export const getMdXData = async (dir: string) => {
    const files = await getMDXFiles(dir)
    return Promise.all(
        files.map(async (file) => {
            return await readMDXFile(path.join(dir, file))
        })
    )
}

/**
 * write a function to save the frontmatter to a database. 
 * 
 */
