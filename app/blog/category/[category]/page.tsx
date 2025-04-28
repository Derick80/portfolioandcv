export default async function CategoryPage(props: {
    params: Promise<{
        category: string
    }>
}) {
    const params = await props.params
    if (!params) return null
    return (
        <div>
            <h1>Category: {params.category}</h1>
            <p>Posts in this category</p>
        </div>
    )
}
