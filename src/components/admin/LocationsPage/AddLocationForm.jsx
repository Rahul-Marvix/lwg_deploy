"use client";
import React from "react";
import { useFormik } from "formik";
import validationSchema from "@/schemas/locationSchema";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";




export default function AddLocationForm({ countryNames,callbackk }) {
  const router=useRouter()
  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      address: "",
      postalCode: "",
      number: "",
      description: "",
      image: null,
      imagePreview: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      try {
        console.log(values);
        const formData = new FormData();
      formData.append("name", values.name);
      formData.append("country", values.country);
      formData.append("address", values.address);
      formData.append("postalCode", values.postalCode);
      formData.append("number", values.number);
      formData.append("description", values.description);
      formData.append("imageUrl", values.image);
        const response=await adminAxiosInstance.post("/location/location",formData)
        if(response.data.success){
          console.log(response,"hello");
        toast.success("added successfully")
      
        router.push("/admin/locations")
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
              <div className="flex flex-col my-3 text-sm">
                <label htmlFor="country">Country/region</label>
                <select
                  id="country"
                  name="country"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  className="border mt-1 p-1 border-black rounded-md"
                >
                  {countryNames.map((item, index) => (
                    <option className="text-black" key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {formik.errors.country && formik.touched.country && (
                  <p className="text-xs text-red-600">
                    {formik.errors.country}
                  </p>
                )}
              </div>
              <div className="flex flex-col b">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="border border-black mt-1 rounded-md"
                  type="text"
                  placeholder="address"
                />
                {formik.errors.address && formik.touched.address && (
                  <p className="text-xs text-red-600">
                    {formik.errors.address}
                  </p>
                )}
              </div>
              <div className="flex mt-3 flex-col">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  onChange={formik.handleChange}
                  value={formik.values.postalCode}
                  className="border border-black mt-1 rounded-md"
                  type="number"
                  placeholder="postalCode"
                />
                {formik.errors.postalCode && formik.touched.postalCode && (
                  <p className="text-xs text-red-600">
                    {formik.errors.postalCode}
                  </p>
                )}
              </div>
              <div className="flex mt-3 flex-col">
                <label htmlFor="number">Phone</label>
                <input
                  id="number"
                  name="number"
                  onChange={formik.handleChange}
                  value={formik.values.number}
                  className="border border-black mt-1 rounded-md"
                  type="number"
                  placeholder="Phone..."
                />
                {formik.errors.number && formik.touched.number && (
                  <p className="text-xs text-red-600">{formik.errors.number}</p>
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
                    style={{ maxWidth: "100%", maxHeight: "150px" }}
                  />
                )}
                {formik.errors.image && formik.touched.image && (
                  <p className="text-xs text-red-600">{formik.errors.image}</p>
                )}
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
