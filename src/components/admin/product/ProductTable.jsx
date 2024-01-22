"use client"
import React, { useEffect, useRef, useState } from "react";
import { adminAxiosInstance } from '@/utils/axiosUtils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from "use-debounce";
import PaginationBar from '@/components/PaginationBar';
import Link from 'next/link';
import Image from "next/image";


export default function ProductTable({ products, reFetch, page,status,search }) {
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500); //debounceing

  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  let path="?"
  if(page){
    path=path+`page=${page}` 
      }
      if(status){
    path=path+`&status=${status}`
      }
    //   if(search){
    // path=path+`&search=${search}`
    //   }
      const initialRender =useRef(true)
    

      // useEffect(() => {
      //   console.log(initialRender.current);
      //   if (initialRender.current){
      //     setText("")
      //       initialRender.current=false
      //     return
      //   }
      //   if(query){ 

          // path=path+`search=${query}`
          //     router.push(`/admin/products${path}`);
          
      //   }
      // }, [query, router,path]);
      const handleSearch = (e) => {
        const searchText = e.target.value;
        setText(searchText);
      
        if (searchText) {
          // If there is a search query, update the path and push the new URL
          const updatedPath = path + `&search=${searchText}`;
          router.push(`/admin/products${updatedPath}`);
        } else {
          // If there is no search query, remove the search parameter from the path
          const updatedPath = path.replace(/search=[^&]*/g, "");
          router.push(`/admin/products${updatedPath}`);
        }
      };


  const handleSelectAll = () => {
    if (selectAll) {
      // If all products are selected, clear the selection
      setSelectedProducts([]);
    } else {
      // If not all products are selected, add all product IDs to the selection
      const allProductIds = products.map((product) => product._id);
      setSelectedProducts(allProductIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectProduct = (productId) => {
    // Check if the product ID is already in the array
    if (selectedProducts.includes(productId)) {
      // If it's already selected, remove it
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      // If it's not selected, add it
      console.log(selectedProducts);
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleBulkDelete = async () => {
    // Perform delete logic for selected product IDs
    try {
      const response=await adminAxiosInstance.delete("/product/delete-product",{ data: { id: selectedProducts } })
      if(response.data.success)  {

        toast.success("products deleted")
         reFetch();
         // Clear the selectedProducts array after deletion
         setSelectedProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
 
  };

  const bulkUpdate = async (newStatus) => {
    // Perform delete logic for selected product IDs
      const response = await adminAxiosInstance.post(`/product/updateProductStatus`,{id:selectedProducts,newStatus});
   if(response.data.success){
      toast.success("Selected products updated");
   }else{
    toast.error("Error updating products")
   }
    reFetch();
    setSelectedProducts([]);
  };


    if(products) 
  return (
    <div className="w-full relative  ">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="py-1 px-5 w-full bg-white">
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-3">
              <Link
               href={{
                pathname: "/admin/products",
                query: {
                  ...(search ? { search } : {}),
                  
                  page: 1
                }
              }} >
              <button>
                <span className="text-sm bg-neutral-200 hover:bg-neutral-400 rounded-md px-2 py-1">All</span>
              </button>
              </Link>
              <Link          
              href={{
                pathname: "/admin/products",
                query: {
                  ...(search ? { search } : {}),
                  ...( { status:"active" }),
                  page: 1
                }
              }}
               >
              <button>
                <span className="text-sm bg-neutral-200 hover:bg-neutral-400 rounded-md px-2 py-1">Active</span>
              </button>
              </Link>
              <Link 
              // href={"/admin/products?page=1&status=draft"}
              href={{
                pathname: "/admin/products",
                query: {
                  ...(search ? { search } : {}),
                  ...( { status:"draft" }),
                  page: 1
                }
              }}
               >
              <button>
                <span className="text-sm bg-neutral-200 hover:bg-neutral-400 rounded-md px-2 py-1">Draft</span>
              </button>
              </Link>
            </div>
            <div>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
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
                onChange={(e) => handleSearch(e)}
                  type="text"
                  id="table-search"
                  className="block pt-2 ps-10 text-sm w-full text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                Product
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                Inventory
              </th>
              <th scope="col" className="px-4 py-3">
                Category
              </th>
              <th scope="col" className="px-4 py-3">
                vendor
              </th>
              {/* <th scope="col" className="px-4 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody className="mb-10">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-2">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 ">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${index}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectProduct(product._id)}
                      />
                      <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th scope="row" className="px-4 max-w-xl py-2  font-medium text-gray-900 flex whitespace-nowrap">
                   <Link href={"/admin/products/editproduct/"+product.slug}>
                    <div className="flex flex-row items-center">

                   <Image src={product.imageUrls[0]} width={50} height={50} className="h-10 me-2"  alt="img"/> <span style={{ whiteSpace: 'pre-wrap' }}>{product.name}</span>
                    </div>
                    </Link>
                  </th>
                  <td className={`px-4 py-2 `}>
                    <span className={`text-white px-2 py-1 rounded-lg ${product.status=="active"? 'bg-green-500' : 'bg-yellow-500'}`}>
                     {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    <span className="">{product.stockItems}</span>
                  </td>
                  <td className="px-4 py-2">{product.category.name}</td>
                  <td className="px-4 py-4">{product.location?.name}</td>
                  {/* <td className="px-4 py-4 flex justify-center">
                    <span>
                      <details className="dropdown">
                        <summary className="bg-blue-800  rounded text-white ps-2 "></summary>
                        <ul className=" shadow menu dropdown-content z-[1] bg-base-100 rounded-sm w-32  right-6 -top-24">
                          <li className="text-center text-light-green-700 font-bold py-1 px-2 rounded-lg hover:bg-neutral-200 transition-all duration-200">
                            Active
                          </li>
                          <hr className="my-1 border-blue-gray-50" />
                          <li className="text-center font-bold text-orange-400 py-1 px-2 rounded-lg hover:bg-neutral-200 transition-all duration-200">
                            Draft
                          </li>
                          <hr className="my-1 border-blue-gray-50" />
                          <li
                            onClick={() => deleteProduct(product._id)}
                            className="text-center font-bold text-red-600 py-1 px-2 rounded-lg hover:bg-neutral-200 transition-all duration-200"
                          >
                            Remove
                          </li>
                        </ul>
                      </details>
                    </span>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedProducts.length > 0 && (
  <div id='bulk' className={`absolute flex top-[70vh] justify-center w-full ${!selectedProducts.length ? "hidden" : ""}`}>
    <div className="flex flex-row border bg-white gap-2 bg- p-2 text-sm shadow-2xl border-neutral-600  shadow-black rounded-md my-5">
      <div>
        <button onClick={()=>handleBulkDelete()} className="py-1 px-2 rounded-md bg-black hover:bg-neutral-400 text-white">
          Delete products
        </button>
      </div>
      <div>
        <button onClick={()=>bulkUpdate("active")} className="py-1 px-2 rounded-md bg-black hover:bg-neutral-400 text-white">
          Set as active
        </button>
      </div>
      <div>
        <button onClick={()=>bulkUpdate("draft")} className="py-1 px-2 rounded-md bg-black hover:bg-neutral-400 text-white">
          Set as draft
        </button>
      </div>
    </div>
  </div>
)}
      <PaginationBar currentPage={page} length={products.length} search={search} status={status} />
    </div>
  );
}
