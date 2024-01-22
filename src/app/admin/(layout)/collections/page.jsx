import React from "react";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import CollectionTable from "../../../../components/admin/collections/CollectionTable";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const revalidate=0
export default async function page() {
  let collections = [];
  try {
    const response = await adminAxiosInstance.get("/category/category");
    if (response.data.success) {
      collections = response.data.category;
    }
  } catch (error) {
    console.log(error);
  }
  const reFetch = async () => {
    "use server";
    revalidatePath("/admin/collections");
  };
  return (
    <div>
      <main className="px-4 pt-4">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="font-bold text-xl">Collection</h1>
          </div>
          <Link href={"/admin/collections/addcollection"}>
            <div className=" bg-[#222121] hover:scale-105 hover:bg-black px-2 font-bold text-sm text-white rounded-md p-1">
              <button>Add Collection</button>
            </div>
          </Link>
        </div>
        <div className="mt-3 ">
          <CollectionTable collections={collections} reFetch={reFetch} />
        </div>
      </main>
    </div>
  );
}
