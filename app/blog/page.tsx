import React from 'react'
import BlogListItem from '@/components/blog-list-item'
import { getPosts } from '../actions/blog'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dr. Hoskinson's Blog",
    description: 'A personal web app for Dr. Hoskinson',
    keywords: [
        'clinical genetics',
        'genetics phd',
        'acmg',
        'variant classification',
        'somatic',
        'germline',
        'tufts genetics phd'
    ],
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true
        }
    }
  }
  
export default async function Blog() {
    const posts = await getPosts()
    if (!posts.length) {
        return null
    }

    const frontmatter = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return (
        <div className='flex flex-col gap-4 py-2 md:gap-6'>
            <h1>Blog</h1>
            <p>
                Welcome to my blog! This blog is a collection of thoughts and
                ideas on clinical genetics, bioinformatics, and other topics
                that interest me. You may filter the posts by category and read
                the entire post by clicking on the Read More button.
            </p>

            {
                frontmatter?.map((post)=> (
                    <BlogListItem key={post.slug} post={post} />
                ))
            }
        </div>
    )
}
