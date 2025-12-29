export const posts = [
    {
        title: "Post 1",
        slug: "post-1",
        content: `This post explores how to build a modern blog using React 19, Prisma, and TailwindCSS.

Topics covered:
- Server Components
- Image-heavy layouts
- Schema design decisions`,
        images: [
            {

                url: "https://res.cloudinary.com/dch-photo/image/upload/v1741362240/faasi9o49wc4p0vln2hd.webp",
                alt: "Derick Hoskinson wearing glasses"
            }

        ],
        createdAt: new Date()
    },
    {
        title: "Post 2",
        slug: "post-2",
        content: `This second post explores how we made a second blog post.`,
        images: [
            {
                url: "https://res.cloudinary.com/dch-photo/image/upload/v1741365409/bcvr5cjulnuoxykwkfaw.webp",
                alt: "Derick Hoskinson wearing glasses"
            },
            {
                url: "https://res.cloudinary.com/dch-photo/image/upload/v1741362158/rhhyuuf2bj1pnryigwes.webp",
                alt: "Derick Hoskinson wearing glasses"
            }
        ],
        createdAt: new Date()
    },
    {
        title: "Post 3",
        slug: "post-3",
        content: `This third post explores how we made a third blog post.`,
        images: [
            {
                url: "https://res.cloudinary.com/dch-photo/image/upload/v1745945878/derickglasses_2025_fuqha5.jpg",
                alt: "Derick Hoskinson wearing glasses"
            },
            {
                url: "https://res.cloudinary.com/dch-photo/image/upload/v1742341923/1000100112_sjkqp7.jpg",
                alt: "Derick Hoskinson wearing glasses"
            },

        ],
        createdAt: new Date()
    },

]

export const images = [
    {
        id: 1,
        url: "https://res.cloudinary.com/dch-photo/image/upload/v1745945878/derickglasses_2025_fuqha5.jpg",
        alt: "Derick Hoskinson wearing glasses"
    },
    {
        id: 2,
        url: "https://res.cloudinary.com/dch-photo/image/upload/v1742341923/1000100112_sjkqp7.jpg",
        alt: "Derick Hoskinson wearing glasses"
    },
    {
        id: 3,
        url: "https://res.cloudinary.com/dch-photo/image/upload/v1741365409/bcvr5cjulnuoxykwkfaw.webp",
        alt: "Derick Hoskinson wearing glasses"
    },
    {
        id: 4,
        url: "https://res.cloudinary.com/dch-photo/image/upload/v1741362158/rhhyuuf2bj1pnryigwes.webp",
        alt: "Derick Hoskinson wearing glasses"
    },
    {
        id: 5,
        url: "https://res.cloudinary.com/dch-photo/image/upload/v1741362240/faasi9o49wc4p0vln2hd.webp",
        alt: "Derick Hoskinson wearing glasses"
    }
]