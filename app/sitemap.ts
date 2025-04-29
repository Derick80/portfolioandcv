'use server'
import { MetadataRoute } from 'next'

function getSiteUrl (path = '') {
    return new URL(
        path,
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://derickhoskinson.com'
    )
}
const revalidate = 60

export default async function sitemap (): Promise<MetadataRoute.Sitemap> {
    const staticMap = [
        {
            url: getSiteUrl('/').href,
            lastModified: new Date().toISOString().split('T')[0],
            priority: 1
        },
        {
            url: getSiteUrl('/blog').href,
            lastModified: new Date().toISOString().split('T')[0],
            priority: 1
        },
        {
            url: getSiteUrl('/blog/category').href,
            lastModified: new Date().toISOString().split('T')[0],
            priority: 0.8
        },
        {
            url: getSiteUrl('/cv').href,
            lastModified: new Date().toISOString().split('T')[0],
            priority: 1
        },
        {
            url: getSiteUrl('/about').href,
            lastModified: new Date().toISOString().split('T')[0],
            priority: 0.8
        },
        {
            url: getSiteUrl('/genetics').href,
            lastModified: new Date().toISOString().split('T')[0],
            priority: 0.8
        },
        
        
    ] satisfies MetadataRoute.Sitemap


    return [...staticMap]
}
