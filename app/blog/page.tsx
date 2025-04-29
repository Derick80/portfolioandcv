import React from 'react'
import { getAllPosts } from '../actions/mdx-server-functions'
import BlogListItem from '@/components/blog-list-item'

export default async function Blog() {
    const posts = await getAllPosts()
    if (!posts.length) {
        return null
    }

    const frontmatter = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    console.log('frontmatter', frontmatter)
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
