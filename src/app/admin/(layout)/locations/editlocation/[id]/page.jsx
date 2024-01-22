import React from 'react'
import AddLocationForm from '@/components/admin/LocationsPage/AddLocationForm'
import axios from 'axios'
import { adminAxiosInstance } from '@/utils/axiosUtils'
import EditLocationForm from '@/components/admin/LocationsPage/EditLocationForm'



export const revalidate=0

export default async function Page({params: { id }}) {
  
  let locationData
  try {
    const   response=await adminAxiosInstance.get("/location/location/"+id)
    locationData=response.data.location
      console.log(locationData);
  } catch (error) {
   console.log(error);   
  }
  const response=await axios.get("https://restcountries.com/v3.1/all")
  const sortedCountryNames = response.data.map(country => country.name.common).sort();

  return (
    <main className="ps-4 pt-4 ">
    <div className="flex  justify-center mb-5">
      <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
        <div className="font-bold text-lg  ">
          <h1>Edit Location</h1>
        </div>
   <EditLocationForm countryNames={sortedCountryNames} locationData={locationData}  />

      </div>
    </div>
   
  </main>
  )
}
