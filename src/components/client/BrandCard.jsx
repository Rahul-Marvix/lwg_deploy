import Image from "next/image"

export default function BrandCard({brand}) {
  return (
    <div
   
    className="card  hover:scale-105 hover:shadow-xl  transition-all duration-300 bg-base-100 shadow-md"
  >
    <figure className=" pt-3">
      <Image src={brand?.imageUrl} alt="Shoes" className="rounded-t-xl h-52 object-cover  " height={200} width={300} />
    </figure>
    <div className="card-body px-2 py-5 text-center">
  <h2 className="card-title text-sm mx-auto">
    {/* Factory Seconds & Refurbished Fisher & Paykel Appliances{" "} */}
    {brand.name}
    {"\u2192"}
  </h2>
</div>

  </div>
  )
}
