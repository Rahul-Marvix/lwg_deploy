import AddBrandForm from '@/components/admin/brands/AddBrandForm'
import AddCollectionForm from '@/components/admin/collections/AddCollectionForm'

import { redirect } from 'next/navigation'


export default async function page() {
  const callbackk=async()=>{
    "use server"
    redirect("/admin/brands")
  }
  

  return (
    <main className="ps-4 pt-4 ">
    <div className="flex  justify-center mb-5">
      <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
        <div className="font-bold text-lg  ">
          <h1>Add Collection</h1>
        </div>
   <AddCollectionForm callbackk={callbackk}/>

      </div>
    </div>
   
  </main>
  )
}