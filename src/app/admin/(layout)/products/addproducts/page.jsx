 

import { adminAxiosInstance } from "@/utils/axiosUtils";
import AddProductFields from "@/components/admin/product/AddProductFields";

export default async function Page() {
  const getCategody=async()=>{
    const response=await adminAxiosInstance.get("/category/category")
if(response.data.success){
  return response.data.category
}else{
 return []
}
  }
  const getBrands=async()=>{
    const response=await adminAxiosInstance.get("/product/brand")
if(response.data.success){
  return response.data.brands
}else{
 return []
}
  }
  const getLocation=async()=>{
    const response=await adminAxiosInstance.get("/location/location")
if(response.data.success){
  return response.data.location
}else{
 return []
}
  }
  const getProductType=async()=>{
    const response=await adminAxiosInstance.get("/product-type")
if(response.data.success){
  return response.data.productType
}else{
 return []
}
  }
  const categorys=await getCategody()
  const locations=await getLocation()
  const brands=await getBrands()
  const productTypes=await getProductType()
  
   
   
  return (
    <main className="ps-4 pt-4 ">
      <div className="flex  justify-center mb-5">
        <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
          <div className="font-bold text-lg  ">
            <h1>Add Product</h1>
          </div>
     {/* <AddProductFields types={data.data.category} options={options}/> */}
     <AddProductFields types={categorys} venders={locations} brands={brands} productTypes={productTypes} />

        </div>
      </div>
     
    </main>
  );
}
