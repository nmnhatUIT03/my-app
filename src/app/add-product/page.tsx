
import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata ={
    title: "Add Product - Nhat's shop"
}

async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();   
    const imageUrl = formData.get("imageUrl")?.toString(); 
    const price = Number(formData.get("price") || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }

    await prisma.product.create({
        data: {name, description, imageUrl, price},
    });

    redirect("/")
}
export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-2 font-bold text-black">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="mb-2 w-full input input-bordered"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="imageUrl"
          type="url"
          className="mb-2 w-full input input-bordered"
        />
        <input
          required
          name="price"
          placeholder="price"
          type="number"
          className="mb-2 w-full input input-bordered"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
