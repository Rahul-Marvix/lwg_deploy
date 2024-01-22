import BrandCard from "@/components/client/BrandCard";
import { userAxiosInstance } from "@/utils/axiosUtils";
import Link from "next/link";

export const revalidate=0
export default async function page() {
  let brands = [];
  try {
    const response = await userAxiosInstance.get("/product/brand");
    if (response.data.success) {
      brands = response.data.brands;
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="lg:mx-[10%]">
      <section className="mt-10 ">
        <div>
          <h1 className="lg:text-3xl md:text-2xl mb-8 font-semibold">
            Brands
          </h1>
          <div className="lg:grid-cols-4 grid-cols-2 justify-center md:grid-cols-3  lg:gap-5 gap-3 grid">
            {brands.map((item) => (
              <Link key={item._id} href={"/brands/"+item.slug}>
              <BrandCard  brand={item}  />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
