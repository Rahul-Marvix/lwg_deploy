import React from 'react'
import Link from "next/link"
import { adminAxiosInstance } from '@/utils/axiosUtils'
import LocationTable from '@/components/admin/LocationsPage/LocationTable'
import { revalidatePath } from "next/cache";


export const revalidate=0
export default async function page() {
  let locations=[
  ]
  try {
    const response=await adminAxiosInstance.get("/location/location")
    if(response.data.success){
      locations=response.data.location
    }
  } catch (error) {
   console.log(error); 
  }
    const reFetch = async () => {
      "use server";
      revalidatePath("/admin/locations");
    };
  return (
    <main className="mx-4 pt-4 ">
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="font-bold text-xl">Locations</h1>
      </div>
      
      <Link href={"/admin/locations/addlocation"}>
      <div className=" bg-[#222121] hover:scale-105 hover:bg-black px-2 font-bold text-sm text-white rounded-md p-1">
        <button>Add Location</button>
      </div>
      </Link>
      
    </div>
    <div className="mt-3 ">
        <LocationTable locations={locations} reFetch={reFetch}  />
      </div>
      </main>
  )
}
