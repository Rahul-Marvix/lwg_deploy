"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import { adminAxiosInstance } from "@/utils/axiosUtils";
import { TrashIcon,PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CollectionTable({ collections,reFetch }) {
  const deleteCollection = async (id) => {
    try {
      const response = await adminAxiosInstance.delete("/category/category/"+id);
      if (response.data.success) {
        toast.success("collection deleted");
        reFetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("internal server error try later");
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* <div className="py-1 px-5 w-full bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm w-full text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div> */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-2">
              Name
            </th>
            <th scope="col" className="px-6 py-2">
              Products
            </th>
            <th scope="col" className="px-6 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {collections.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link href={"/admin/collections/editcollection/" + item.slug}>
                  {item.name}
                </Link>
              </th>
              <td className="px-6 py-2">0</td>

              <td className="px-6 py-2">
              <div className="flex ">
                    <button onClick={() => deleteCollection(item._id)} className="">
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  
                    </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>  
  );
}
