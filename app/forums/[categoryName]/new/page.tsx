// app/forum/[categoryId]/new/page.tsx

import { getCategoryByName } from "@/app/actions/forum";
import NewThreadForm from "./new-thread-component";



export default async function NewThreadPage(
  props:{
    params: Promise<{ categoryName: string }>;
  }
) {
  const { categoryName } = await props.params;
  const category = await getCategoryByName(categoryName);
  if (!category) {
    // You can return NotFound or similar
    return <p>Category not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        New Thread in “{category.name}”
      </h1>
      <NewThreadForm categoryName={categoryName} />
    </div>
  );
}
