import ProductTable from "@/components/admin/product/ProductTable";
import Link from "next/link";
import { adminAxiosInstance } from "@/utils/axiosUtils";

import { revalidatePath } from "next/cache";

export const revalidate=0
export default async function Page({ searchParams }) {
 
  const page= typeof searchParams.page==="string"?Number(searchParams.page):1
  const search= typeof searchParams.search==="string"?searchParams.search:undefined
  const status= typeof searchParams.status==="string"?searchParams.status:undefined
  let path="?"
  if(page){
path=path+`page=${page}`
  }
  if(status){
path=path+`&status=${status}`
  }
  if(search){
path=path+`&search=${search}`
  }
  console.log(path);
  let productss = []; // Provide an initial value

  const reFetch = async () => {
    "use server";
    revalidatePath("/admin/products"+path);
  };

  try {
    const response = await adminAxiosInstance.get(
      "/product/product" + path
    );
    productss = response.data.products;

    if (response.data.success) {

    }
  } catch (error) {
    console.log(error);
  }
 
  return (
    <main className="mx-4 pt-4  ">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-bold text-xl">Products</h1>
        </div>
        <Link href={"/admin/products/addproducts"}>
          <div className=" bg-[#222121] hover:scale-105 hover:bg-black px-2 font-bold text-sm text-white rounded-md p-1">
            <button>Add Product</button>
          </div>
        </Link>
      </div>
      <div className="mt-3 ">
        <ProductTable
          products={productss}
          reFetch={reFetch}
          page={page}
          status={status}
          search={search}
        />
      </div>
    </main>
  );
}
