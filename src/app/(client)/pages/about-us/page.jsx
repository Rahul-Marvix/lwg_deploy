import React from "react";
import BranchCards from "@/components/client/home/BranchCards";
export default function page() {
  return (
    <div className="lg:mx-5">
        <div className="mt-10 mb-8   flex justify-center">
            <h1 className="lg:text-5xl md:text-3xl text-2xl">ABOUT US</h1>
        </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div>
          <iframe
            width="100%"
            height="385"
            src="https://www.youtube.com/embed/CCHB0s8nstE"
            title="Lucky White Goods Intro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen=""
          ></iframe>
        </div>
        <div className="flex justify-center">
          <p className="text center text-xl mx-5">
            Founded in 2012, Lucky White Goods has come a long way from its
            beginnings in Sydney, we wanted to bridge the gap between the
            consumers who have a tight budget and our reliable used appliances.
            Considering the “Green Washing” done by commercial and consumerist
            Market, we sell white goods which are Indefinitely cheaper,
            Recycled, less-resourced, less pollutant and supports the local
            economy. we sold more than 10,000 white goods which includes Fridge
            Freezers, Washing Machines, Dryers, Freezers, TVs & Microwaves of
            Best brands on various market places. All our used appliances are
            maintained well and in good working condition, so you can purchase
            with complete peace of mind with 30 days warranty on Used Appliances
            and 1 Year on Brand New.
          </p>
        </div>
      </div>
      <div className="flex gap-3 mx-5  my-10 lg:flex-row flex-col">
        <BranchCards />
        <BranchCards />
        <BranchCards />
      </div>
    </div>
  );
}
