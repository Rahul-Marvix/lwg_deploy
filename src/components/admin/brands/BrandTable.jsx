"use client";
import React from "react";
import { toast } from "react-toastify";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import { TrashIcon,PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
export default function BrandTable({ brands, reFetch }) {
  const deleteBrand = async (id) => {
    try {
      const response = await adminAxiosInstance.delete("/product/brand/" + id);
      if (response.data.success) {
        toast.success("brand deleted");
        reFetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("internal server error try later");
    }
  };
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
                Brand
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="mb-10">
            {brands.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No products found
                </td>
              </tr>
            ) : (
              brands.map((brand, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 "
                >
                  <td className={`px-4 py-2  `}>
                    <span className="font-bold text-black">{index + 1}</span>
                  </td>

                  <th
                    scope="row"
                    className="px-4 max-w-xl py-2 font-medium text-gray-900 flex whitespace-nowrap"
                  >
                    <Link href={"/admin/brands/editbrand/"+brand._id}>
                    <span style={{ whiteSpace: "pre-wrap" }}>{brand.name}</span>
                    </Link>
                  </th>
                  <td className={`px-4    `}>
                    <div className="flex ">
                    <button onClick={() => deleteBrand(brand._id)} className="">
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                    </div>
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
