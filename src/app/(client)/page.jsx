import Image from "next/image";
import CarouselCustomArrows from "../../components/client/home/CarouselCustomArrows";
import ZoomImage from "../../components/client/home/ZoomImage";
import LocationCards from "@/components/client/home/LocationCards";
import zoom1 from "../../assets/zoom1.jpg";
import zoom2 from "../../assets/zoom2.jpg";
import productImage from "../../assets/productImage.webp";
import ProductCard from "@/components/client/ProductCard";
import washingMachine from "../../assets/washingMachine.webp";
import Microwave from "../../assets/Microwave.webp";
import Fisher from "../../assets/Fisher.webp";
import BrandCard from "@/components/client/BrandCard";
    import CatogoryCard from "@/components/client/CatogoryCard";
import BranchCards from "@/components/client/home/BranchCards";
import { userAxiosInstance } from "@/utils/axiosUtils";
import Link from "next/link";


export const metadata = {
  title: "Shop Factory Seconds & Second Hand Home Appliances in Australia | Lucky White Goods",
  description: "Discover unbeatable deals on factory seconds, second hand and refurbished home appliances in Australia. Save big on top-quality items, with warranty included!",
};

export const revalidate=0

export default async function Home() {

  const fetchBestSeller=async()=>{
    try {
      const response=await userAxiosInstance.get("/bestseller")
    if(response.data.success){
      return response.data.products;
    }else{
      return []
    }
    } catch (error) {
      console.log(error);
    }
    
  }
  const fetchBrands=async()=>{
    try {
      const response= await userAxiosInstance.get('/gethomebrands')
      if(response.data.success){
        return response.data.brands;
      }else{
        return []
      }
    } catch (error) {
      console.log(error);
    }

  }
  const fetchCat=async()=>{
    try {
      const response=await userAxiosInstance.get('/gethomecategory');
      if(response.data.success){
        return response.data.categories;
      }else{
        return []
      }
    } catch (error) {
      console.log(error);
    }
   
  }
  const fetchFrideAnFreezer=async()=>{
    try {
      const response=await userAxiosInstance.get('/gethomecategory');
    } catch (error) {
      
    }
  }
  const bestseller=await fetchBestSeller()
  const brands=await fetchBrands()
  const categories=await fetchCat()
 
  return (
    <main className="">
      <section className="mt-4 lg:mx-20 mx-2">
        <div className="grid lg:grid-cols-2">
          <div className="z-20">
            <CarouselCustomArrows />
          </div>
          <div>
            <div className="mt-2 lg:mt-0">
              <ZoomImage img={zoom1} />
            </div>
            <div className="lg:mt-10 mt-2">
              <ZoomImage img={zoom2} />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 lg:mx-[10%]">
        <div>
          <h1 className="lg:text-3xl md:text-2xl  font-semibold">
            CHOOSE YOUR LOCATION
          </h1>
          <LocationCards />
        </div>
      </section>
      <section className="mt-10 lg:mx-[10%]">
        <div>
          <h1 className="lg:text-3xl md:text-2xl mb-8 font-semibold">
            FRIDGES & FREEZERS
          </h1>
          <div className="lg:grid-cols-4 grid-cols-2 justify-center md:grid-cols-3  gap-3 grid">
            {[1, 2, 3, 5].map((item) => (
              <ProductCard productImage={productImage} key={item} />
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <button className="flex justify-center bg-black px-8 hover:scale-95 transition-all duration-500  rounded-lg py-3">
              <span className="uppercase font-bold  text-white">view more</span>
            </button>
          </div>
        </div>
      </section>
      {categories&&      <section className="mt-10 lg:mx-[10%]">
        <div>
          <h1 className="lg:text-3xl md:text-2xl mb-8 font-semibold">
            BROWSE OUR CATEGORIES
          </h1>
          <div className="lg:grid-cols-3 grid-cols-2 justify-center md:grid-cols-3  lg:gap-5 gap-3 grid">
            {categories.map((category) => (
              <Link key={category._id} href={"/collections/"+category.slug}>
              <CatogoryCard  washingMachine={washingMachine} collection={category} />
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Link href={"/collections"}>
            <button className="flex justify-center bg-black px-8 hover:scale-95 transition-all duration-500  rounded-lg py-3">
              <span className="uppercase font-bold  text-white">view all</span>
            </button>
            </Link>
          </div>
        </div>
      </section>}

{bestseller&&    <section className="mt-10 lg:mx-[10%]">
        <div>
          <h1 className="lg:text-3xl md:text-2xl mb-8 font-semibold">
            BEST SELLERS
          </h1>
          <div className="lg:grid-cols-4 grid-cols-2 justify-center md:grid-cols-3  gap-3 grid">
            {bestseller.map((item) => (
              <ProductCard productImage={productImage} product={item} key={item} />
            ))}
          </div>
          <div className="flex justify-center mt-5">
          
            <button className="flex justify-center bg-black px-8 hover:scale-95 transition-all duration-500  rounded-lg py-3">
              <span className="uppercase font-bold  text-white">view more</span>
            </button>
           
          </div>
        </div>
      </section>}
  {brands&& <section className="mt-10 lg:mx-[10%]">
        <div>
          <h1 className="lg:text-3xl md:text-2xl mb-8 font-semibold">
            SHOP BY BRANDS
          </h1>
          <div className="lg:grid-cols-4 grid-cols-2 justify-center md:grid-cols-3  lg:gap-5 gap-3 grid">
            {brands.map((brand) => (
              <Link key={brand._id} href={"/brands/"+brand.slug}>
              <BrandCard key={brand._id} image={Fisher} brand={brand }/>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-5">
          <Link href={"/brands"}>
            <button className="flex justify-center bg-black px-8 hover:scale-95 transition-all duration-500  rounded-lg py-3">
              <span className="uppercase font-bold  text-white">view all</span>
            </button>
            </Link>
          </div>
        </div>
      </section>}
   
     

      <section className="mt-10 mb-10 lg:mx-[5%]">
        <div className="grid lg:grid-cols-3 gap-3 grid-cols-1">
        <BranchCards/>
        <BranchCards/>
        <BranchCards/>
        </div>
      </section>
    </main>
  );
}
