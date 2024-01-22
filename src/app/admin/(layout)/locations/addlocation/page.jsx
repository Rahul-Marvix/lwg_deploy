import React from 'react'
import AddLocationForm from '@/components/admin/LocationsPage/AddLocationForm'
import axios from 'axios'




export default async function page() {
  const response=await axios.get("https://restcountries.com/v3.1/all")
  const sortedCountryNames = response.data.map(country => country.name.common).sort();
  

  return (
    <main className="ps-4 pt-4 ">
    <div className="flex  justify-center mb-5">
      <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
        <div className="font-bold text-lg  ">
          <h1>Add Location</h1>
        </div>
   <AddLocationForm countryNames={sortedCountryNames}/>

      </div>
    </div>
   
  </main>
  )
}
