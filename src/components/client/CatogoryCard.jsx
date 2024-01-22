import Image from "next/image"

export default function CatogoryCard({washingMachine,collection}) {
  return (
    <div
    
    className="card  hover:scale-105 hover:shadow-xl  transition-all duration-500 bg-base-100 shadow-md"
  >
    <figure className="px-5 pt-8">
      <Image
        src={collection?.imageUrl}
        width={300}
        height={300}
        alt="Shoes"
        className="rounded-xl object-contain h-44"
      />
    </figure>
    <div className="card-body items-center  text-center">
      <h2 className="card-title text-sm  ">
      {collection?collection?.name:"Fridges & Freezers"}  
        {"\u2192"}
      </h2>
    </div>
  </div>
  )
}
