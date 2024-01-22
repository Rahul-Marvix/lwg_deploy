import React from "react";
import Image from "next/image";
import sydneyLogo from "@/assets/sydneyLogo.webp";
import adelaideLogo from "@/assets/adelaideLogo.webp"
import brisbaneLogo from "@/assets/brisbaneLogo.webp"
import { userAxiosInstance } from "@/utils/axiosUtils";
import Link from "next/link";

export const revalidate=0
export default async function page() {
    const getLocations=async()=>{
        try {
            const response=await userAxiosInstance.get("/location/location")
            if(response.data.success){
              return response.data.location
            }
          } catch (error) {
           console.log(error); 
          }
    }
    const locations= await getLocations()
    console.log(locations,"huhuhuh");
  return (
    <main className="2xl:mx-[15%] xl:mx-[10%]">
{locations.map((location, index) => (
  <div className={`flex ${index%2==0?"lg:flex-row-reverse":"lg:flex-row"} flex-col items-center justify-center`} key={index}>
    <div className="hover:scale-105 transition-all duration-500">
      <Image
        className="min-h-[300px] w-auto"
        src={sydneyLogo}
        height={500}
        width={500}
        alt=""
      />
    </div>
    <div className="mx-12">
      <h1 className="text-3xl font-light leading-10">
        Factory Seconds & Second Hand Appliances in {location.name}
      </h1>
      <p className="mt-5 opacity-80 leading-7">
        Explore the best in condition 200+ refurbished home appliances
        available in Sydney with buy now pay later options and delivered to
        your home same day.
      </p>
      <Link href={`/locations/${location.slug}`}>
      <button className="mt-5 bg-black text-white px-9 py-3">
        EXPLORE MORE
      </button>
      </Link>
    </div>
  </div>
))}

  
      {/* <div className="flex lg:flex-row-reverse flex-col items-center justify-center">
        <div className="hover:scale-105 transition-all duration-500">
          <Image
            className="min-h-[300px] w-auto"
            src={adelaideLogo}
            height={500}
            width={500}
            alt=""
          />
        </div>
        <div className="mx-12">
          <h1 className="text-3xl font-light leading-10">
            Factory Seconds & Second Hand Appliances in Sydney
          </h1>
          <p className="mt-5 opacity-80 leading-7">
            Explore the best in condition 200+ refurbished home appliances
            available in sydney with buy now pay later options and delivered to
            your home same day.
          </p>
          <button className="mt-5 bg-black  text-white px-9 py-3">
            EXPLORE MORE
          </button>
        </div>
      </div> */}
      {/* <div className="flex lg:flex-row flex-col items-center justify-center">
        <div className="hover:scale-105 transition-all duration-500">
          <Image
            className="min-h-[300px] w-auto"
            src={brisbaneLogo}
            height={500}
            width={500}
            alt="soemthing"
          />
        </div>
        <div className="mx-12">
          <h1 className="text-3xl font-light leading-10">
            Factory Seconds & Second Hand Appliances in Sydney
          </h1>
          <p className="mt-5 opacity-80 leading-7">
            Explore the best in condition 200+ refurbished home appliances
            available in sydney with buy now pay later options and delivered to
            your home same day.
          </p>
          <button className="mt-5 bg-black hover:scale-105 transition-all text-white px-9 py-3">
            EXPLORE MORE
          </button>
        </div>
      </div> */}
    </main>
  );
}
