import React from "react";
import Link from "next/link";

export default function ClientPaginationBar({ 
    currentPage,
    totalPages,
    pathName,
    priceTo,
    priceFrom,
    typesQurays,
    locationQurays }) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
console.log(typesQurays,"tttttttttttttttttttt");
  const numbersPageItems = [];
  for (let page = minPage; page < maxPage; page++) {
    const queryParams = { page };
    if (priceFrom) queryParams.priceFrom = priceFrom;
    if (priceTo) queryParams.priceTo = priceTo;
    if(typesQurays.length)queryParams.productType=typesQurays.join(",")
    // if(collections)queryParams.collection=collections
    if(locationQurays.length)  queryParams.location=locationQurays.join(",")
    const query = new URLSearchParams(queryParams).toString();
    numbersPageItems.push(
      <Link
      href={{ pathname: pathName, query }}
        key={page}
      
      >
        <button
          className={`${
            currentPage === page ? " opacity-80" : ""
          }
          relative h-10 max-h-[40px] w-10 max-w-[40px] select-none 
          rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium 
         text-white shadow-md shadow-gray-900/10 transition-all hover:scale-105  `}
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {page}
          </span>
        </button>
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">{numbersPageItems}</div>
    </div>
  );
}
