"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import CusPaginationBar from "./CusPaginationBar";

export default function CustomerTable({ users, page, search }) {
  const router = useRouter();
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500); //debounceing

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!query) {
      router.push("/admin/customers");
    } else {
      router.push(`/admin/customers?search=${query}`);
    }
  }, [query, router]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="py-1 px-5 w-full bg-white dark:bg-gray-900">
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
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-2">
              Name
            </th>
            <th scope="col" className="px-6 py-2">
              Email Subcribed
            </th>
            <th scope="col" className="px-6 py-2">
              Location
            </th>
            <th scope="col" className="px-6 py-2">
              Ordres
            </th>
            <th scope="col" className="px-6 py-2">
              Amount spent
            </th>
          </tr>
        </thead>
        <tbody>
        {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
          users.map((user) => (
            <tr
              key={user._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.name}
              </th>
              <td className="px-6 py-2">{user.email}</td>
              <td className="px-6 py-2">Laptop</td>
              <td className="px-6 py-2">$2999</td>
              <td className="px-6 py-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))
          )}
        </tbody>
      </table>
      <CusPaginationBar
        currentPage={page}
        length={users.length}
        search={search}
      />
    </div>
  );
}
