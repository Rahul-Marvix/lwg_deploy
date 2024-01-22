"use client"
import React from "react";
import { toast } from "react-toastify";
import { adminAxiosInstance } from "@/utils/axiosUtils";


export default function ProductTypeTable({ productTypes, reFetch }) {
    
    const deleteType=async(id)=>{
        try {
            
            const response=await adminAxiosInstance.delete("/delete-product-type/"+id)
            if(response.data.success){
    
                toast.success("brand deleted")
                reFetch()
            }
        } catch (error) {
            console.log(error);
            toast.error("internal server error try later")
        }
        }
  return (
    <div className="w-full">
      <div className="  overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-4  py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3">
               Product type
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="mb-10">
            {productTypes.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products found
                </td>
              </tr>
            ) : (
              productTypes.map((type, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 "
                >
                  <td className={`px-4 py-4  `}>
                    <span className="font-bold text-black">{index + 1}</span>
                  </td>

                  <th
                    scope="row"
                    className="px-4 max-w-xl py-4 font-medium text-gray-900 flex whitespace-nowrap"
                  >
                    <span style={{ whiteSpace: "pre-wrap" }}>{type.name}</span>
                  </th>
                  <td className={`px-4  `}>
                    <button
                      onClick={() => deleteType(type._id)}
                      className="px-2 py-2 rounded-lg bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
