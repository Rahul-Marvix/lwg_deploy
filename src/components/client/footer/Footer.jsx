import Link from "next/link";
import lwg_logo from "../../../assets/lwg_logo.png";
import Image from "next/image";
import { FaArrowRight, FaInstagram, FaTiktok } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import cardlogo from "../../../assets/cardlogos.png";
import { userAxiosInstance } from "@/utils/axiosUtils";



export default async function Footer() {
  const fetchCat = async () => {
    try {
      const response = await userAxiosInstance.get("/gethomecategory");
      if (response.data.success) {
        return response.data.categories;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const categories = await fetchCat();
  console.log(locations );
  return (
    <footer className="bg-[#72090D] p-10  mt-5 text-white">
      <div className="flex  justify-center">
        <div className="footer   max-w-7xl">
          <div className=" flex ">
            <div className="flex  flex-col">
              <Image src={lwg_logo} alt="" />
              <span className="footer-title opacity-100 text-2xl mt-5   text-center">
                Subscribe to our emails
              </span>
              <div className="mx-8 mt-2 relative">
                <input
                  type="text"
                  className=" w-full p-3 rounded-md "
                  placeholder="Email.."
                />
                <FaArrowRight className="absolute top-[15px] right-2 text-black " />
              </div>
              <div className="mt-5 flex flex-row justify-center text-xl  gap-5">
                <ImFacebook2 className="text-white   rounded" />
                <FaInstagram />
                <FaXTwitter />
                <FaTiktok />
              </div>
            </div>
          </div>
          <div>
            <span className="footer-title opacity-100 text-lg">
              Quick Links
            </span>

            <Link href={"/pages/seller-profile"} className="link-hover link">
              View Locations
            </Link>
            <Link href={"/pages/about-us"} className="link-hover link">
              About Us
            </Link>
            <Link
              href={"/pages/repairing-services"}
              className="link-hover link"
            >
              Repairing Services
            </Link>
            <Link href={"/blogs/news"} className="link-hover link">
              Blog
            </Link>
            <Link
              href={"/policies/terms-of-service"}
              className="link-hover link"
            >
              Terms of Service
            </Link>
            <Link href={"/policies/refund-policy"} className="link-hover link">
              Refund Policy
            </Link>
            <Link href={"/pages/faqs"} className="link-hover link">
              {"FAQ's"}
            </Link>
          </div>
          <div>
            <span className="footer-title opacity-100 text-lg">
              Our Categories
            </span>
            {categories &&categories.map((category) => (
              <Link key={category._id} href={"/collections/"+category.slug} className="link-hover link">
                Factory Seconds {category?.name}
              </Link>
            ))}
          </div>
          <div>
            <span className="footer-title opacity-100 text-lg">
              Location & more
            </span>
            {locations && locations.map((location) => (
            <Link key={location._id} href={"/locations/"+location.slug} className="link-hover link">
              Factory Seconds Appliances in {location.name}
            </Link>
               ))}
  
            <a className="link-hover link">Find Your Kind</a>
            <a className="link-hover link">Sitemap</a>
          </div>
        </div>
      </div>
      <div className=" mt-7 flex justify-end">
        <Image src={cardlogo} alt="" />
      </div>
      <div className="flex justify-center mt-4">
        <span className="opacity-70 text-center">
          © 2023 luckywhitegoods.com. All rights reserved
        </span>
      </div>
    </footer>
  );
}
