import React from 'react'
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";



export default function BranchCards() {
  return (
    <>
    <div className="bg-[#fff4f4] p-7 rounded-md">
            <h1 className="text-lg font-semibold">SYDNEY</h1>
            <h3 className="text-lg font-semibold">046287145</h3>
            <span>sydney@luckywhitegoods.com</span>
            <span>Unit 4/16 bearing road seven hills NSW-2147</span>
            <div className="mt-5 flex flex-row text-3xl  gap-5">
                <ImFacebook2 className="text-light-blue-700   rounded" />
                <FaInstagram />
                <FaWhatsapp className="bg-green-600 rounded-full text-white" />
                
              </div>
          </div>
       
          </>
  )
}
