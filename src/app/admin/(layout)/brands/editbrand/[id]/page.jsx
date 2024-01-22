import EditBrandForm from "@/components/admin/brands/EditBrandForm";
import { adminAxiosInstance } from "@/utils/axiosUtils";


export default async function page({ params: { id } }) {
  let brandData;
  try {
    const response = await adminAxiosInstance.get("/product/brand/" + id);
    brandData = response.data.brand;
    console.log(brandData);
  } catch (error) {
    console.log(error);
  }


  return (
    <main className="ps-4 pt-4 ">
      <div className="flex  justify-center mb-5">
        <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
          <div className="font-bold text-lg  ">
            <h1>Edit Brand</h1>
          </div>
          <EditBrandForm brandData={brandData} />
        </div>
      </div>
    </main>
  );
}
