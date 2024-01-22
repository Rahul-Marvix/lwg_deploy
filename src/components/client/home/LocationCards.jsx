import Image from "next/image"
import adelaideLogo from "../../../assets/adelaideLogo.webp"
import brisbaneLogo from "../../../assets/brisbaneLogo.webp"
import sydneyLogo from "../../../assets/sydneyLogo.webp"
export default function LocationCards() {
  return (
    <div className='grid grid-cols-3 justify-center mx-8 gap-10 mt-8'>
    <div className='1 hover:scale-105 hover:rotate-[360deg] cursor-pointer  transition-all duration-500'>
     <Image src={adelaideLogo} height={450} alt=""/>
    </div>
    <div className=' hover:scale-105 hover:rotate-[360deg] cursor-pointer transition-all duration-500'>
    <Image src={brisbaneLogo} height={450} alt=""/>
    </div>
    <div className=' hover:scale-105 hover:rotate-[360deg] cursor-pointer transition-all duration-500'>
    <Image src={sydneyLogo} height={450} alt=""/>
    </div>
            </div>
  )
}
