import React from "react";
import CartCard from "@/components/client/cart/CartCard";
import { userAxiosInstance } from "@/utils/axiosUtils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import emptyCart from "@/assets/emptyCart.png"
import Link from "next/link";

export const revalidate = 0;
export default async function page() {
  const guestId = cookies().get("guestId");
console.log("guestid : ",guestId);
  const getCartData = async () => {
    try {
      const response = await userAxiosInstance.get("/cart/get", {
        withCredentials: true,
        headers: {
          Cookie: `guestId=${guestId?.value}`,
        },
      });
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  let cartItems 
  cartItems = await getCartData();
  console.log(cartItems,"looooooooooooo");

  const reFetch = async () => {
    "use server";
    revalidatePath("/cart");
  };

  return (
    <main className=" ">
      <div className="md:pt-5 lg:mx-[10%]">
        <h1 className="mb-7 text-center text-3xl font-semibold">Your Cart </h1>
        <div className="mx-auto  justify-center  flex flex-col  xl:px-0">
          {cartItems?.items.length ? (
            <>
        {    cartItems.items.map((item) => (
              <CartCard key={item._id} item={item} reFetch={reFetch} guestId={guestId} />
            ))}
              <div className="lg:flex lg:justify-end">
            <div className="mt-6 h-full rounded-lg border   bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              {/* <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$129.99</p>
            </div>
          
            <hr className="my-4" /> */}

              <div className="flex justify-between">
                <p className="text-lg font-bold">Total:</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${cartItems.total}AUD</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-red-700-500 py-1.5 font-medium text-blue-50 bg-[#7e0004] active:bg-[#ff3131]">
                Check out
              </button>
            </div>
          </div>
            </>
          ) 
          : (
            
            <div className="flex justify-center border p-10 mb-10">
              <div className="flex flex-col">
                <Image src={emptyCart} alt="" height={300} width={300} className="h-48 w-auto"/>

              <h3  className="text-xl font-semibold mt-3 tracking-wide">Oops your Cart is empty</h3>
              <Link className="text-center" href="/" >

              <button className="bg-[#72090D] active:bg-[#ff3131] py-2 px-2 rounded-md text-white font-semibold mt-5">Continue Shopping</button>
              </Link>
              </div>

            </div>
          )}
        
        </div>
      </div>
    </main>
  );
}
