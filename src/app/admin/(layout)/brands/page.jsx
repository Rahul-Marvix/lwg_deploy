import React from 'react'
import Link from "next/link"
import { adminAxiosInstance } from '@/utils/axiosUtils'
import BrandTable from '@/components/admin/brands/BrandTable';
import { revalidatePath } from "next/cache";

export const revalidate=0
export default async function page() {
  let brands=[]
  try {
    const response=await adminAxiosInstance.get("/product/brand") 
    if(response.data.success){
      brands=response.data.brands
    }
  } catch (error) {
    console.log(error);
  }
  const reFetch = async () => {
    "use server";
    revalidatePath("/admin/brands");
  };
  return (
    <main className="mx-4 pt-4 ">
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="font-bold text-xl">Brands</h1>
      </div>
      
      <Link href={"/admin/brands/addbrand"}>
      <div className=" bg-[#222121] hover:scale-105 hover:bg-black px-2 font-bold text-sm text-white rounded-md p-1">
        <button>Add Brands</button>
      </div>
      </Link>
      
    </div>
    <div className="mt-3 ">
        <BrandTable brands={brands} reFetch={reFetch}  />
      </div>
      </main>
  )
}
