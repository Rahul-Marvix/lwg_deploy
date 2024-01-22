"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import { toast } from "react-toastify";
import addProductSchema from "@/schemas/addProductSchema";
import CreatableSelect from "react-select/creatable";
import TiptapTextEditor from "./TiptapTextEditor";
import dynamic from "next/dynamic";
const CustomEditor = dynamic( () => {
  return import( './CustomEditor' );
}, { ssr: false } );


const RichEditor=dynamic(()=>import ("@/components/admin/product/RichEditor"),{
  ssr:false
})

export default function AddProductFields({
  types,
  venders,
  brands,
  productTypes,
}) {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [description,setDescription]=useState("")

 

  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
    console.log(selectedTags);
  };
  const router = useRouter();
  // Formik initial values
  const initialValues = {
    name: "",
    // description: "",
    salePrice: "",
    price: "",
    stockItems: 0,
    productBoost: "",
    metaPrice: "",
    status: "active",
    productCategory: "active",
    category: "",
    location: "",
    brand: "",
    productType: "",
   

    // Add other initial values as needed
  };
  const options = [
    { value: "Appliance", label: "Appliance" },
    { value: "Fridge & washer combo", label: "Fridge & washer combo" },
    { value: "Front loader washer", label: "Front loader washer" },
  ];
  const tagOptions = [
    { value: "Appliance", label: "Appliance" },
    { value: "Fridge & washer combo", label: "Fridge & washer combo" },
    { value: "Front loader washer", label: "Front loader washer" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : "grey",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "black" : "grey",
      },
    }),
  };
  // Formik submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    // Create a FormData object to handle file uploads if needed
    const formData = new FormData();
    // Append files to formData
    files.forEach((file) => {
      formData.append("imageUrls", file);
    });
    const tags = selectedTags.map((item) => {
      return item.value;
    });
   
    formData.append("tags", JSON.stringify(tags));
    formData.append("description",description)
// formData.append("description",des)
    // Append other form fields to formData
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        // For tagsArray, convert array to a string or format as needed

        formData.append(key, values[key]);
      }
    }
    try {
      const response = await adminAxiosInstance.post(
        "/product/product",
        formData
      );
      if (response.data.success) {
        toast.success("added successfully");
        router.push("/admin/products");
      }
    } catch (error) {
      toast.error("internal server error try later");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle file change
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeImage = (index) => {
    // Filter out the file and preview URL at the specified index
    const newFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(newFiles);
  };
  const handleDescriptionChange = (newValue) => {
    // Update the 'description' field in Formik with the new value
    formik.setFieldValue('description', newValue);
  };

  // Generate preview URLs
  useEffect(() => {
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));

    // Cleanup
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [files]);
console.log(description);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={addProductSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="grid lg:grid-cols-5 gap-10 ">
              <div className="lg:col-span-3  w-full">
                {/* ...other sections */}

                <div className="flex flex-col bg-white py-3 px-4 mt-5 rounded-md shadow-sm">
                  <div className="flex flex-col">
                    <label htmlFor="name">Title</label>
                    <Field name="name" type="text" className="input-class" />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-xs mt-1 text-red-600"
                    />
                  </div>
                  <div className="flex flex-col mb-3 mt-2">
                    <label htmlFor="description">Description</label>
                    {/* <Field
                      name="description"
                      as="textarea"
                      className="textarea-class"
                      rows="5"
                    /> */}
                    {/* <ErrorMessage
                      name="description"
                      component="p"
                      className="text-xs mt-1 text-red-600"
                    /> */}
     {/* <RichEditor/> */}
     {/* <TiptapTextEditor /> */}
     <CustomEditor   initialData={description} setDescription={setDescription}/>
                  </div>
                  {/* <span>{editorState}</span> */}
                </div>

                {/* ...other sections */}
                <div className=" flex bg-white flex-col py-3 mt-5 px-4 rounded-md shadow-sm">
                  <div className="grid lg:grid-cols-2 gap-3 grid-cols-1 mb-5">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="salePrice">Sale Price</label>
                      <Field
                        name="salePrice"
                        className="border focus:ring-gray-500 focus:border-gray-500 text-sm p-1 border-black rounded-md"
                        type="number"
                        step="0.01"
                      />
                    </div>
                    <div className="flex flex-col gap-1 mt">
                      <label htmlFor="price">Original Price</label>
                      <Field
                        name="price"
                        className="border focus:ring-gray-500 focus:border-gray-500 text-sm p-1 border-black rounded-md"
                        type="number"
                        step="0.01"
                      />
                      <ErrorMessage
                        name="price"
                        component="p"
                        className="text-xs mt-1 text-red-600"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex bg-white  flex-col py-3 mt-5 px-4 rounded-md shadow-sm">
                  <div className="font-medium  ">
                    <h2>Media</h2>
                  </div>
                  <div className="m-5">
                    <div className="flex items-center flex-col  justify-center w-full">
                      <div className="flex w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-360 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 ay-700 hover:bg-gray-100 "
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF{" "}
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>

                      <div id="preview" className="flex flex-wrap mt-3 gap-3">
                        {previewUrls.map((url, index) => (
                          <div
                            className="border relative border-red-900"
                            key={index}
                          >
                            <Image
                              src={url}
                              alt={`Preview ${index + 1}`}
                              width={200}
                              height={200}
                              className="h-28 w-28 object-contain pb-8"
                            />
                            <span
                              className="absolute bottom-2 right-3 text-red-800 cursor-pointer"
                              onClick={() => removeImage(index)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ...other sections */}

                <div className="flex bg-white flex-col py-3 mt-5 px-4 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <label htmlFor="stockItems">stock</label>
                    <Field
                      name="stockItems"
                      type="number"
                      className="input-class"
                    />
                    <ErrorMessage
                      name="stockItems"
                      component="p"
                      className="text-xs mt-1 text-red-600"
                    />
                  </div>
                </div>

                <div className=" flex bg-white flex-col py-3 mt-5 px-4 rounded-md shadow-sm">
                  <div className="font-medium">
                    <h2>Meta Fields</h2>
                  </div>

                  <div>
                    <hr />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between my-2">
                      <label htmlFor="productBoost">Search product boost</label>
                      <Field
                        name="productBoost"
                        className="border text-sm ms-2 w-2/4 p-1 focus:ring-gray-500 focus:border-gray-500 border-black rounded-md"
                        type="text"
                      />
                    </div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="metaPrice">Meta Price</label>
                      <Field
                        name="metaPrice"
                        className="border ms-2 w-2/4 text-sm p-1 focus:ring-gray-500 focus:border-gray-500 border-black rounded-md"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="lg:col-span-2">
                {/* ...other sections */}

                {/* Status dropdown */}
                <div className="flex bg-white flex-col py-3 px-4 mt-5 pb-5 rounded-md shadow-sm">
                  <label htmlFor="status">Status</label>
                  <Field as="select" name="status" className="select-class">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </Field>
                </div>

                {/* ...other sections */}
                <div className="flex bg-white flex-col py-3 px-4 mt-5 pb-5 rounded-md shadow-sm">
                  <div>
                    <h2>Product Organization</h2>
                  </div>
                  <hr className="my-2" />
                  <div className="flex flex-col">
                    <div className="flex flex-col text-sm">
                      <label htmlFor="productCategory">Product Category</label>
                      <Field
                        as="select"
                        id="productCategory"
                        name="productCategory"
                        className="border mt-1 p-1 focus:ring-gray-500 focus:border-gray-500 border-black rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                      </Field>
                      <ErrorMessage
                        name="productCategory"
                        component="p"
                        className="text-xs text-red-600"
                      />
                    </div>
                    <div className="flex flex-col mt-3 text-sm">
                      <label htmlFor="productType">Product Type</label>
                      <CreatableSelect
                        styles={customStyles}
                        isClearable
                        id="productType"
                        name="productType"
                        onChange={(selectedOption) => {
                          setFieldValue("productType", selectedOption?.value);
                        }}
                        options={options}
                      />

                      <ErrorMessage
                        name="productType"
                        component="p"
                        className="text-xs text-red-600"
                      />
                    </div>
                    <div className="flex flex-col mt-3 text-sm">
                      <label htmlFor="category">collection</label>
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className="border mt-1 p-1 focus:ring-gray-500 focus:border-gray-500 border-black rounded-md"
                      >
                        <option value=""></option>
                        {types &&
                          types.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="p"
                        className="text-xs text-red-600"
                      />
                    </div>

                    <div className="flex flex-col mt-3 text-sm">
                      <label htmlFor="location">Vender</label>
                      <Field
                        as="select"
                        id="location"
                        name="location"
                        className="border mt-1 p-1 focus:ring-gray-500 focus:border-gray-500 border-black rounded-md"
                      >
                        <option value=""></option>
                        {venders.map((vender) => (
                          <option key={vender._id} value={vender._id}>
                            {vender.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="location"
                        component="p"
                        className="text-xs text-red-600"
                      />
                    </div>

                    <div className="flex flex-col mt-3 text-sm">
                      <label htmlFor="brand">Brand</label>
                      <Field
                        as="select"
                        id="brand"
                        name="brand"
                        className="border mt-1 p-1 focus:ring-gray-500 focus:border-gray-500 border-black rounded-md"
                      >
                        <option value=""></option>
                        {brands.map((brand) => (
                          <option key={brand._id} value={brand._id}>
                            {brand.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="brand"
                        component="p"
                        className="text-xs text-red-600"
                      />
                    </div>

                    <div className="flex flex-col my-3 text-sm">
                      <label htmlFor="tagsArray">Tags</label>
                      <CreatableSelect
                        isMulti
                        onChange={handleTagChange}
                        options={tagOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center  my-5">
              <button
                type="submit"
                className="py-1 px-4 rounded-md bg-light-green-700 text-white"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
