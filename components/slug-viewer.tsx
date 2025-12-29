// slug viewer component I want this component to display beneath the title input field and show the slug based on the title

const SlugViewer = (
    { title }: { title: string }
) => {
    const slug = slugify(title)
    return (
        <div className="mt-4">
            <p className="text-sm font-medium">Slug:</p>
            <p className="mt-1 text-sm">{slug}</p>
        </div>
    )
}




// slugify function to convert title into a unique slug
function slugify(text: string) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}`;
    return `${text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')}-${timestamp}`;
}

export default SlugViewer
