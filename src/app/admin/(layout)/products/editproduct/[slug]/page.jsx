import React from 'react'
import { adminAxiosInstance } from '@/utils/axiosUtils'
import EditProductForm from '@/components/admin/product/EditProductForm'

export const revalidate=0
export default async function page({params:{slug}}) {
const getProductData=async()=>{
const response =await adminAxiosInstance.get("/product/product/"+slug)
if(response.data.success){
  return response.data.product
}else{
  return undefined
}

}
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

const categorys=await getCategody()
const locations=await getLocation()
const brands=await getBrands()

const productData=await getProductData()
console.log(productData);
  return (
     <main className="ps-4 pt-4 ">
      <div className="flex  justify-center mb-5">
        <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
          <div className="font-medium text-lg  ">
            <h1>Edit Product</h1>
          </div>
<EditProductForm productData={productData} types={categorys} venders={locations} brands={brands} />
        </div>
      </div>
     
    </main>
  )
}
