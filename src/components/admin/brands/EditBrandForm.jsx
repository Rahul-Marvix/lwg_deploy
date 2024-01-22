"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const TipTap=dynamic(()=>import("../product/TiptapTextEditor"),{
  ssr: false, // Prevent SSR
})

const RichEditor = dynamic(() => import("../product/RichEditor"), {
  ssr: false, // Prevent SSR
});

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});
export default function EditBrandForm({brandData}) {
  const router=useRouter()
if(!brandData){
  router.back()
}
  const formik = useFormik({
    initialValues: {
      name: brandData?.name||"",
      description:brandData?.description||"",
      image: null,
      imagePreview: brandData?.imageUrl,
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {
        
        console.log(values);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        if(values.image){
         formData.append("imageUrl", values.image);    
        }
        const response=await adminAxiosInstance.put("/product/brand/"+brandData._id,formData)
        if(response.data.success){
          console.log(response,"hello");
        toast.success("updated successfully")
       router.push("/admin/brands")
     
        }
      } catch (error) {
        
      }
      // You can perform further actions such as API calls or state updates
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-1 gap-10">
          <div className="lg:col-span-1 w-full">
            <div className="flex bg-white flex-col py-3 px-4 mt-5 rounded-md shadow-sm">
            <div className="flex flex-col b">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="border border-black mt-1 rounded-md"
                  type="text"
                  placeholder="name"
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="text-xs text-red-600">
                    {formik.errors.name}
                  </p>
                )}
              </div>
           
              <div className="flex flex-col mt-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  className="border border-black mt-1 rounded-md h-20" // Adjust the height as needed
                  placeholder="Description"
                />
                {formik.errors.description && formik.touched.description && (
                  <p className="text-xs text-red-600">
                    {formik.errors.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="image">Image</label>
                <input
                  id="image"
                  name="image"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                    if (file) {
                      formik.setFieldValue(
                        "imagePreview",
                        URL.createObjectURL(file)
                      );
                    } else {
                      formik.setFieldValue("imagePreview", "");
                    }
                  }}
                  className="border border-black mt-1 rounded-md"
                  type="file"
                />
                {formik.values.imagePreview && (
                  <Image
                    src={formik.values.imagePreview}
                    width={150}
                    height={100}
                    alt="Image Preview"
                    className="mt-2 rounded-md"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
                {formik.errors.image && formik.touched.image && (
                  <p className="text-xs text-red-600">{formik.errors.image}</p>
                )}
              </div>
              <div className="flex flex-col mt-3">
{/* <RichEditor/> */}
<TipTap/>
              </div>
       
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <button
            type="submit"
            className="py-1 px-4 rounded-md bg-green-700 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
