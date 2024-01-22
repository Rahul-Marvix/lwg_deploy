"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../ProductCard";
import "./ProductWithFilter.css";
import ClientPaginationBar from "../ClientPaginationBar";

export default function ProductWithFilter({
  page,
  collections,
  products,
  pathName,
  priceTo,
  priceFrom,
  locationData,
  typesQurays,
  locationQurays,
  collectionQuerys,
  showCollectionFilter,
  showBrandFilter,
  showLocationFilter,
}) {
  console.log(priceFrom, "pricefrom");
  console.log(typesQurays, "type");
  const [isOpen, setIsOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState({
    from: priceFrom,
    to: priceTo,
  });
  const [selectedProductTypes, setSelectedProductTypes] = useState(typesQurays);
  const [prodctTypeOpen, setProductTypeOpen] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState(collectionQuerys);
  const [collectionOpen, setCollectionOpen] = useState();
  const [selectedLocations, setSelectedLocations] = useState(locationQurays);
  const [locationOpen, setLocationOpen] = useState(false);

  const router = useRouter();

  let totalItems = 50;
  const pageSize = 12;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPriceFilter({ ...priceFilter, [name]: value });
  };

  // ... (previous code)

  const handleCollectionCheckboxChange = (collection) => {
    // Check if the collection is already selected
    const isSelected = selectedCollections.includes(collection._id);

    if (isSelected) {
      // Remove the collection if already selected
      setSelectedCollections((prevCollections) =>
        prevCollections.filter(
          (prevCollection) => prevCollection !== collection._id
        )
      );
    } else {
      // Add the collection if not selected
      setSelectedCollections((prevCollections) => [
        ...prevCollections,
        collection._id,
      ]);
    }
  };

  const handleLocationCheckboxChange = (location) => {
    const isSelected = selectedLocations.includes(location._id);

    if (isSelected) {
      // Remove the collection if already selected
      setSelectedLocations((prevLocations) =>
        prevLocations.filter((prevLocation) => prevLocation !== location._id)
      );
    } else {
      // Add the collection if not selected
      setSelectedLocations((prevLocations) => [...prevLocations, location._id]);
    }
  };

  const handleCheckboxChange = (type) => {
    const isSelected = selectedProductTypes.includes(type);

    if (isSelected) {
      // Remove the type if already selected
      setSelectedProductTypes((prevTypes) =>
        prevTypes.filter((prevType) => prevType !== type)
      );
    } else {
      // Add the type if not selected
      setSelectedProductTypes((prevTypes) => [...prevTypes, type]);
    }
  };

  useEffect(() => {
    const queryParams = {};
    let querys = "";
    if (priceFilter.from) queryParams.priceFrom = priceFilter.from;
    if (priceFilter.to) queryParams.priceTo = priceFilter.to;
    if (selectedProductTypes.length) {
      queryParams.productType = selectedProductTypes.join(",");
    }
    if (selectedCollections.length > 0) {
      queryParams.collection = selectedCollections.join(",");
    }
    if (selectedLocations.length) {
      queryParams.location = selectedLocations.join(",");
    }

    const query = new URLSearchParams(queryParams).toString();

    router.push(`${pathName}?${query}${querys}`);
  }, [
    priceFilter,
    selectedProductTypes,
    selectedCollections,
    selectedLocations,
    pathName,
    router,
  ]);

  const productTypes = [
    "Appliance",
    "Fridge and washer combo",
    "Front loader washer",
  ];
  console.log(isOpen);
  return (
    <div>
      <div className="grid grid-cols-5   ">
        <section className="col-span-1 mt-10 hidden lg:block " id="filter">
          <div className="my-3 ">
            <h1>Filter:</h1>
          </div>
          <hr className="h-1 opacity-10  bg-black " />
          <div className="">
            <div className="flex flex-col w-full  ">
              <div className="my-3">
                <label htmlFor="price"> Price</label>
                <div className="flex gap-3 flex-row">
                  <input
                    className="flex w-1/2"
                    type="number"
                    name="from"
                    placeholder="From"
                    value={priceFilter.from}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="to"
                    className="flex w-1/2"
                    placeholder="To"
                    value={priceFilter.to}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <hr className="h-1 opacity-10  bg-black " />
              <div className="mt-2">
                <div>
                  <div
                    onClick={() => setProductTypeOpen(!prodctTypeOpen)}
                    className="py-3"
                  >
                    <label htmlFor="productType ">Product Type</label>
                  </div>
                  <div
                    className={`flex flex-col ${
                      prodctTypeOpen ? "" : "hidden"
                    }`}
                  >
                    {productTypes.map((type) => (
                      <label key={type} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          value={type}
                          checked={selectedProductTypes.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                          className=""
                        />
                        <span className="ml-2">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {showCollectionFilter && collections && (
                <>
                  <hr className="h-1 opacity-10  bg-black " />
                  <div className="mt-2 cat">
                    <div>
                      <div
                        onClick={() => setCollectionOpen(!collectionOpen)}
                        className="py-3"
                      >
                        <label htmlFor="productType ">Category</label>
                      </div>
                      <div
                        className={`flex flex-col ${
                          collectionOpen ? "" : "hidden"
                        }`}
                      >
                        {collections.map((collection) => (
                          <label
                            key={collection._id}
                            className="flex items-center mb-1"
                          >
                            <input
                              type="checkbox"
                              value={collection.name}
                              checked={selectedCollections.includes(
                                collection._id
                              )}
                              onChange={() =>
                                handleCollectionCheckboxChange(collection)
                              }
                              className=""
                            />
                            <span className="ml-2">{collection.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {showLocationFilter && locationData && (
                <>
                  <hr className="h-1 opacity-10  bg-black " />

                  <div className="mt-2 cat">
                    <div>
                      <div
                        onClick={() => setLocationOpen(!locationOpen)}
                        className="py-3"
                      >
                        <label htmlFor="productType ">Location</label>
                      </div>
                      <div
                        className={`flex flex-col ${
                          locationOpen ? "" : "hidden"
                        }`}
                      >
                        {locationData.map((location) => (
                          <label
                            key={location._id}
                            className="flex items-center mb-1"
                          >
                            <input
                              type="checkbox"
                              value={location.name}
                              checked={selectedLocations.includes(location._id)}
                              onChange={() =>
                                handleLocationCheckboxChange(location)
                              }
                              className=""
                            />
                            <span className="ml-2">{location.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <hr className="h-1 opacity-10  bg-black " />
            </div>
          </div>
        </section>
        <section
          id="product"
          className={`lg:col-span-4 col-span-5 lg:mx-5 mt-10 `}
        >
          <button onClick={() => setIsOpen(!isOpen)}>
            <span className="text-lg mb-5 md:hidden bg-gray-300 px-3 py-1 transition-all hover:bg-blue-gray-400 rounded-md">
              Filters:
            </span>
          </button>
          <div className="2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 justify-center md:grid-cols-3   lg:gap-3 grid">
            {products.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
        </section>
        <section className={`resFilter bg-white  ${isOpen ? "open" : ""}`}>
          <div className="col-span-1 mt-5 ms-5" id="filter">
            <div className="flex justify-end me-5">
              <button onClick={() => setIsOpen(!isOpen)}>
                <span className="text-black font-bold text-xl">X</span>
              </button>
            </div>
            <div className="my-3 ">
              <h1>Filter:</h1>
            </div>
            <hr className="h-1 opacity-10  bg-black " />
            <div className="">
              <div className="flex flex-col w-full  ">
                <div className="my-3">
                  <label htmlFor="price"> Price</label>
                  <div className="flex gap-3 flex-row">
                    <input
                      className="flex w-1/2"
                      type="number"
                      name="from"
                      placeholder="From"
                      value={priceFilter.from}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      name="to"
                      className="flex w-1/2"
                      placeholder="To"
                      value={priceFilter.to}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <hr className="h-1 opacity-10  bg-black " />
                <div className="mt-2">
                  <div>
                    <div
                      onClick={() => setProductTypeOpen(!prodctTypeOpen)}
                      className="py-3"
                    >
                      <label htmlFor="productType ">Product Type</label>
                    </div>
                    <div
                      className={`flex flex-col ${
                        prodctTypeOpen ? "" : "hidden"
                      }`}
                    >
                      {productTypes.map((type) => (
                        <label key={type} className="flex items-center mb-1">
                          <input
                            type="checkbox"
                            value={type}
                            checked={selectedProductTypes.includes(type)}
                            onChange={() => handleCheckboxChange(type)}
                            className=""
                          />
                          <span className="ml-2">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {showCollectionFilter && collections && (
                  <>
                    <hr className="h-1 opacity-10  bg-black " />
                    <div className="mt-2 cat">
                      <div>
                        <div
                          onClick={() => setCollectionOpen(!collectionOpen)}
                          className="py-3"
                        >
                          <label htmlFor="productType ">Category</label>
                        </div>
                        <div
                          className={`flex flex-col ${
                            collectionOpen ? "" : "hidden"
                          }`}
                        >
                          {collections.map((collection) => (
                            <label
                              key={collection._id}
                              className="flex items-center mb-1"
                            >
                              <input
                                type="checkbox"
                                value={collection.name}
                                checked={selectedCollections.includes(
                                  collection._id
                                )}
                                onChange={() =>
                                  handleCollectionCheckboxChange(collection)
                                }
                                className=""
                              />
                              <span className="ml-2">{collection.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {showLocationFilter && locationData && (
                  <>
                    <hr className="h-1 opacity-10  bg-black " />

                    <div className="mt-2 cat">
                      <div>
                        <div
                          onClick={() => setLocationOpen(!locationOpen)}
                          className="py-3"
                        >
                          <label htmlFor="productType ">Location</label>
                        </div>
                        <div
                          className={`flex flex-col ${
                            locationOpen ? "" : "hidden"
                          }`}
                        >
                          {locationData.map((location) => (
                            <label
                              key={location._id}
                              className="flex items-center mb-1"
                            >
                              <input
                                type="checkbox"
                                value={location.name}
                                checked={selectedLocations.includes(
                                  location._id
                                )}
                                onChange={() =>
                                  handleLocationCheckboxChange(location)
                                }
                                className=""
                              />
                              <span className="ml-2">{location.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <hr className="h-1 opacity-10  bg-black " />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex justify-center mt-5">
        <ClientPaginationBar
          currentPage={page}
          totalPages={totalPages}
          collections={collections}
          pathName={pathName}
          priceFrom={priceFrom}
          priceTo={priceTo ? priceTo : 0}
          locationData={locationData}
          typesQurays={typesQurays}
          locationQurays={locationQurays}
        />
      </div>
    </div>
  );
}
