import React from "react";
import ProductWithFilter from "@/components/client/allProducts/ProductWithFilter";
import { userAxiosInstance } from "@/utils/axiosUtils";

export const revalidate=0
export default async function Page({ searchParams, params: { slug } }) {
  const pathName = "/collections/" + slug;
  
  const page =
    typeof searchParams.page === "string"
      ? Number(searchParams.page)
      : undefined;
  const priceFrom =
    typeof searchParams.priceFrom === "string"
      ? Number(searchParams.priceFrom)
      : undefined;
  const priceTo =
    typeof searchParams.priceTo === "string"
      ? Number(searchParams.priceTo)
      : undefined;
  const productType =
    typeof searchParams.productType === "string" || Array
      ? searchParams.productType
      : undefined;
  const locations =
    typeof searchParams.location === "string" || Array
      ? searchParams.location
      : undefined;
  const collection =
    typeof searchParams.collection === "string" || Array
      ? searchParams.collection
      : undefined;
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;
  console.log("priceFrom", priceFrom);
  console.log("priceTo", priceTo);
 const typesQurays=productType?productType.split(","):[]
  const locationQurays=locations?locations.split(","):[]
  const collectionQuerys=collection?collection.split(","):[]
  console.log("prodctType", typesQurays);
  console.log("location", locationQurays);

  let path="?"
  if(page){
    path=path+`page=${page}`
      }
  if(priceFrom){
    path=`${path}&priceFrom=${priceFrom}`
  }
  if(priceTo){
    path=`${path}&priceTo=${priceTo}`
  }
if(collection){
  path=`${path}&collections=${collection}`
} 
if(productType){
  path=`${path}&productTypes=${productType}`
} 
if(locations){
  path=`${path}&locations=${locations}`
} 

  const getLocations = async () => {
    try {
      const response = await userAxiosInstance.get("/location/location");
      if (response.data.success) {
        return response.data.location;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  const locationData = await  getLocations();

  let collectionData = [];
  try {
    const response = await userAxiosInstance.get("/category/category");
    if (response.data.success) {
      collectionData = response.data.category;
    }
  } catch (error) {
    console.log(error);
  }
  let products = [];
  try {
    const response = await userAxiosInstance.get("/getcategoryproduct/"+slug+path);
    
    if (response.data.success) {
      products = response.data.products;
    }
  } catch (error) {
    console.log(error);
  }

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPriceFilter({ ...priceFilter, [name]: value });
  };
  return (
    <main className="2xl:mx-[6%] xl:mx-[4%] lg:mx-[4%] ">
      <ProductWithFilter
      page={page?page:1}
        collections={collectionData}
        products={products}
        pathName={pathName}
        priceFrom={priceFrom}
        priceTo={priceTo}
        locationData={locationData}
        typesQurays={typesQurays}
        locationQurays={locationQurays}
        collectionQuerys={collectionQuerys}
        showCollectionFilter={false}
        showBrandFilter={false}
        showLocationFilter={true}
      />
    </main>
  );
}
