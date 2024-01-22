import CatogoryCard from "@/components/client/CatogoryCard";
import washingMachine from "../../../assets/washingMachine.webp";
import { userAxiosInstance } from "@/utils/axiosUtils";
import Link from "next/link";

export const revalidate=0
export default async function page() {
  let collections = [];
  try {
    const response = await userAxiosInstance.get("/category/category");
    if (response.data.success) {
      collections = response.data.category;
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="lg:mx-[10%]">
      <section className="mt-10 ">
        <div>
          <h1 className="lg:text-3xl md:text-2xl mb-8 font-semibold">
            COLLECTIONS
          </h1>
          <div className="lg:grid-cols-4 grid-cols-2 justify-center md:grid-cols-3  lg:gap-5 gap-3 grid">
            {collections.map((item) => (
              <Link key={item._id} href={"/collections/"+item.slug}>
              <CatogoryCard  washingMachine={washingMachine} collection={item}  />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
