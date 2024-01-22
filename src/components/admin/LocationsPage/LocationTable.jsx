"use client";
import React from "react";
import { toast } from "react-toastify";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import Link from "next/link";
import { TrashIcon,PencilIcon } from "@heroicons/react/24/solid";
export default function LocationTable({ locations, reFetch }) {
  const deleteLocation = async (id) => {
    try {
      const response = await adminAxiosInstance.delete(
        "/location/location/" + id
      );
      if (response.data.success) {
        toast.success("location deleted");
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
              <th scope="col" className="px-4  py-2">
                No
              </th>
              <th scope="col" className="px-4 py-2">
                location
              </th>
              <th scope="col" className="px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="mb-10">
            {locations.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-2">
                  No locations found
                </td>
              </tr>
            ) : (
              locations.map((location, index) => (
                
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
                    <Link href={"/admin/locations/editlocation/"+location._id}>
                    <span style={{ whiteSpace: "pre-wrap" }}>
                      {location.name}
                    </span>
                    </Link>
                  </th>
                  <td className={`px-4  `}>
                    
                    <button
                      onClick={() => deleteLocation(location._id)}
                      className=""
                    >
                     <TrashIcon className="h-5 w-5 text-red-600" />
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
