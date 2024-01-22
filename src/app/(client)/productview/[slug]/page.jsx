 import React from 'react'
import ProductView from '@/components/client/singleProduct/ProductView'
import { userAxiosInstance } from '@/utils/axiosUtils';

export const revalidate=0
export default async function Page({params: { slug } }) {
  console.log(slug);
  
  const getProductDetails=async()=>{
    try {
      const response=await userAxiosInstance.get("/product/product/"+slug)
      if(response.data.success){
        return response.data.product
      }
      return {}
    } catch (error) {
     console.log(error); 
    }
   
  }
  const product= await getProductDetails()
  console.log(product);
  return (
    <main className="2xl:mx-[15%] xl:mx-[10%] lg:mx-[3%] ">
    <div>
<ProductView product={product}/>
    </div>
    </main>
  )
}
