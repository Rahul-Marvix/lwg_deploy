import React from "react";
import Image from "next/image";


export default function ZoomImage({img}) {
  return (
    <div className="text-center  lg:mx-3 border-2 rounded-md">
      <div className="h-min overflow-hidden rounded-md">
        <Image
          className="hover:scale-110 transition-all duration-500 cursor-pointer"
          src={img}
          alt=""
        />
      </div>

    </div>
  );
}
