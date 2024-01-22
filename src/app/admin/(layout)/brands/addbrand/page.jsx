import AddBrandForm from "@/components/admin/brands/AddBrandForm";

export default async function page() {
  return (
    <main className="ps-4 pt-4 ">
      <div className="flex  justify-center mb-5">
        <div className=" w-full  mx-5 lg:mx-0 lg:w-11/12">
          <div className="font-bold text-lg  ">
            <h1>Add Brand</h1>
          </div>
          <AddBrandForm />
        </div>
      </div>
    </main>
  );
}
