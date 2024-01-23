"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import washingMachine from "../../../assets/washingMachine.webp";
import Microwave from "../../../assets/Microwave.webp";
import paymentsLogo from "../../../assets/pay.webp";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  TruckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
export default function ProductView({ product }) {
  const [heroSticky, setHeroSticky] = useState(false);
  const [open, setOpen] = React.useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const productDescription = product ? product.description : "";
  const router = useRouter();
  if (!product?.name) {
    router.back();
  }
  let imagess = [washingMachine, Microwave, washingMachine, Microwave];
  const [images, setImages] = useState(product ? product.imageUrls : imagess);
  const [activeImg, setActiveImg] = useState(images[0]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document !== "undefined") {
        const heroBottom = document.getElementById("hero").getBoundingClientRect().bottom;
        const detailBottom = document.getElementById("detail").getBoundingClientRect().bottom;
  console.log(heroBottom,"herooo");
  console.log(detailBottom,"detaillll");
        setHeroSticky(heroBottom > detailBottom);
      }
    };
  
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleZoomChange = useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);
  const handleImageClick = (image) => {
    setActiveImg(image);
    setIsZoomed(false); // Reset zoom when switching images
  };

  return (
    <div className="flex flex-col  md:flex-row justify-between gap-14 p-4 ">
      <div
        id="hero"
        className={`flex flex-col mb-5 mx-auto md:w-2/4 ${
          heroSticky ? "sticky top: 0" : ""
        }`}
      >
        <div className="w-full  ">
          <ControlledZoom
            isZoomed={isZoomed}
            key={activeImg}
            onZoomChange={handleZoomChange}
          >
            <Image
              key={activeImg}
              src={activeImg}
              alt="img"
              width={600}
              height={700}
              className=" max-h-[600px] min-h-[500px] w-auto border object-cover rounded-md shadow-sm "
            />
          </ControlledZoom>
        </div>
        <div className="flex flex-wrap   gap-2 mt-5  ">
          {images.map((item) => (
            <Image
              key={item}
              onClick={() => handleImageClick(item)}
              src={item}
              alt="img"
              width={100}
              height={100}
              className={`w-24 ${
                item == activeImg ? "border border-black" : ""
              } h-24 p-2 object-cover rounded-md shadow-lg border transition-all duration-300`}
            />
          ))}
        </div>
      </div>
      <div id="detail" className="flex flex-col gap-4 md:w-2/4">
        <div>
          <span className="font-medium text-[#72090D] 2xl:text-2xl opacity-80">
            {product?.location?.name}
          </span>
          <h1 className="2xl:text-5xl xl:text-5xl text-3xl mt-2 font-sans break-words">
  {product?.name}
</h1>

        </div>
        {/* <p className="text-xl">
          {product.description}

        </p> */}
        <h5 className="text-xl ">$ 199.00 AUD</h5>
        <Image src={paymentsLogo} height={350} alt="" className="" />
        <div className="flex flex-col  ">
          <h5 className="text-xl font-light">Quantity:</h5>
          <div className="flex flex-row items-center mt-2 ">
            <button className="bg-gray-200 py-2 px-5 rounded-lg text-deep-purple-800 2xl:text-3xl ">
              -
            </button>
            <span className=" py-4 px-6 rounded-lg">1</span>
            <button className="bg-gray-200 py-2 px-4 rounded-lg text-deep-purple-800 2xl:text-3xl">
              +
            </button>
          </div>
        </div>
        <button className="bg-[#72090D] font-semibold text-white py-3 px-6 mt-3 rounded">
          ADD TO CART
        </button>

        <div>
          <Accordion open={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              <ListItemPrefix>
                <DocumentTextIcon className="h-6 w-6 flex" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto text-sm  font-semibold"
              >
                Description
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div
                className=" overflow-hidden mb-3 "
                dangerouslySetInnerHTML={{ __html: productDescription }}
              />
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2}>
            <AccordionHeader className=" flex" onClick={() => handleOpen(2)}>
              <ListItemPrefix>
                <TruckIcon className="h-6 w-6 flex" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto text-sm  font-semibold"
              >
                Shipping & Returns
              </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div>
                <p>
                  Thank you for visiting and shopping at Luckywhitegoods.com
                  Following are the terms and conditions that constitute our
                  Shipping Policy.
                </p>
                <br />
                <p>
                  All orders are processed within 24 hrs. Orders will be also
                  shipped or delivered on weekends or holidays. If we are
                  experiencing a high volume of orders, shipments may be delayed
                  by a few days. Please allow additional days in transit for
                  delivery. If there will be a significant delay in shipment of
                  your order, we will contact you via email or telephone.
                </p>
                <br />
                <p>
                  Luckywhitegoods.com ships to addresses within the Sydney City,
                  Canberra City & Adelaide City area. The Shipping charges for
                  the order will be calculated on the check out page and you
                  will be emailed to you.
                </p>
                <br />
                <p>
                  For more information on our shipping policies please visit
                </p>
                <Link className="underline font-semibold" href={""}>
                  Shipping & Refund Policy
                </Link>
                <br />
                <br />
                <div>
                  <p>
                    Please allow between 24 hours for your order to arrive. If
                    more than 48 hours have passed, please email us at{" "}
                    <a
                      className="underline font-semibold"
                      href="mailto:Support@luckywhitegoods.com"
                    >
                      Support@luckywhitegoods.com
                    </a>{" "}
                    to review the status of your order. Refunds will be handled
                    through email if necessary.
                  </p>
                  <br />
                  <p>
                    Processing time: Order verification, tailoring, quality
                    check and packaging. All orders received will be dispatched
                    within 24 hours after the order is placed. Orders received
                    outside Sydney will takes an additional 2-4 days.
                  </p>
                  <br />
                  <p>
                    Damages : Luckywhitegoods.com is liable for the appliances
                    damaged or lost during shipping. If you received your order
                    damaged, please contact the shipment carrier to file a
                    claim. Please save all packaging materials and damaged goods
                    before filing a claim or Customer can reject the delivery.
                  </p>
                  <br />
                  <p>This shipping policy is applicable for both used and Brand-New item.</p>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
