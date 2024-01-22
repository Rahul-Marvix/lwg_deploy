"use client";
import React from "react";
import { toast } from "react-toastify";

// function getCookie(name) {
//   const cookies = document.cookie.split(";");
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     if (cookie.startsWith(name + "=")) {
//       return cookie.substring(name.length + 1, cookie.length);
//     }
//   }
//   return null;
// }

import { userAxiosInstance } from "@/utils/axiosUtils";
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export default function AddToCartButton({ productId, quantity }) {
  let guestId;

  const handleAddToCart = async () => {
    // if (typeof document !== "undefined") {
    //   // Fetch the cookie by name
    //   guestId = getCookie("guestId");
    // } else {
    //   console.log("Code is not running on the client side");
    // }
    // console.log(guestId);

    const res = await userAxiosInstance.post(
        "/cart/add",
        { productId, quantity },
        { 
          withCredentials: true,
        //   headers: {
        //     Cookie: `guestId=${guestId}`,
        //   },
        }
      );
      
    
    console.log(res);
    if (res.data.success) {
      toast.success("Added to Cart");
    }
  };

  return (
    <div
      onClick={() => handleAddToCart()}
      className="w-[97%]  text-center  rounded-md absolute bottom-1  bg-[#af0f14] hover:bg-[#8b0b0f] hover:scale-105 transition-all duration-500  text-white"
    >
      <button className=" font-bold   p-2 ">ADD TO CART</button>
    </div>
  );
}
