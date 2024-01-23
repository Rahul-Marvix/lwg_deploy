import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
// import { cookies } from 'next/headers';

export default function ProductCard({ productImage, product }) {

  return (
    <div className=" h-[450px] p-1 rounded-md max-w-xs  lg:h-[480px] mt-3  shadow-lg relative ">
      <Link href={"/productview/"+product?.slug}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={product ? product?.imageUrls[0] : productImage}
          width={250}
          height={450}
          alt="car!"
          className=" lg:h-72 h-64  w-full hover:scale-105 transition-all duration-500  "
        />
      </div>
      <div className="max-h-40   overflow-hidden  ">
        <h2 className="font-medium lg:text-md mt-2 break-words line-clamp-3">
          {product ? product.name : "Hisense 8 KGS Heat Pump Dryer"}
        </h2>
      </div>
      <p className="mt-2 opacity-60 font-bold">
        {product ? product?.location?.name : "SYDNEY"}
      </p>
      <div className="flex items-center">
        {product?.price && (
          <span className="mt-1 line-through me-2 text-sm opacity-70">
            ${product?.price}AUD
          </span>
        )}
        <h2 className="mt-1  font-semibold md:text-md">
          ${product ? product?.salePrice : "900"} AUD
        </h2>
      </div>
    </Link>
    <AddToCartButton productId={product ?._id} quantity={1} 
    // guestId={guestId}
    />
    </div>
  );
}
