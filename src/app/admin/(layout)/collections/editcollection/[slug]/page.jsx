import EditCollectionForm from "@/components/admin/collections/EditCollectionForm";
import { adminAxiosInstance } from "@/utils/axiosUtils";

export const revalidate=0
export default async function page({ params: { slug } }) {
  let CollectionData;
  try {
    const response = await adminAxiosInstance.get("/category/category/" + slug);
    CollectionData = response.data.category;
    console.log(CollectionData);
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="ps-4 pt-4 ">
      <div className="flex  justify-center mb-5">
        <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
          <div className="font-bold text-lg  ">
            <h1>Edit collection</h1>
          </div>
          <EditCollectionForm CollectionData={CollectionData}  />
        </div>
      </div>
    </main>
  );
}
