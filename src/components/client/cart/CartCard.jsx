"use client"
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import { userAxiosInstance } from '@/utils/axiosUtils';
export default function CartCard({item,reFetch,guestId}) {
    const removeItem=async(id)=>{
        console.log(id,"iddddddddddddddddddd");
        const response=await userAxiosInstance.delete("/cart/remove/"+id,{withCredentials:true}).then((res)=>{
            if(res.data.success){
                reFetch();
            }
        }).catch((err)=>console.log(err))
    }
    const changeQty=async(id,action)=>{
      console.log(id,"proiddddd");
      console.log(guestId?.value);
      const response= await userAxiosInstance.put("/cart/updateitem/"+id,{action:action},{
        withCredentials: true,
        // headers: {
        //   Cookie: `guestId=${guestId?.value}`,
        // },
      })
      console.log(response);
      if(response.data.success){
        reFetch();
    }  
    }

  return (
    <div className="rounded-lg  ">
    <div className=" mb-6 rounded-lg bg-white px-6 py-3 shadow-md border  ">
      <div className="sm:ml-4 w-full gap-3 flex  flex-row">
        <div>
          <Image
            height={500}
            width={500}
            src={item?.product?.imageUrls[0]}
            alt="product-image"
            className="  h-[105px] aspect-square  w-auto rounded"
          />     
        </div>
        <div className=" flex md:flex-row flex-col   w-full">
          <div className="  flex flex-col md:w-6/12">
            <h2 className="md:text-lg font-semibold text-gray-900">
           {item?.product?.name}
            </h2>
            <span className="mt-1">${item?.product?.salePrice} AUD</span>
          </div>
          <div className="mt-4 flex md:w-3/12 md:justify-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center border-gray-100">
                <span onClick={()=>changeQty(item.product._id,"-")} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                  {" "}
                  -{" "}
                </span>
                <span className="px-3 font-medium text-sm">{item.quantity}</span>
                <span onClick={()=>changeQty(item.product._id,"+")} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                  {" "}
                  +{" "}
                </span>
              </div>
              <div onClick={()=>removeItem(item._id)} className="hover:scale-105">
                <TrashIcon className="h-5 w-5 text-red-700" />
              </div>
            </div>
          </div>
          <div className=" mt-4 md:mt-0 md:w-3/12 items-center">
            <span>Total : ${item?.subTotal} AUD</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
