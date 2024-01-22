import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl">
        <div className="flex justify-center my-6 ">
          <h1 className="font-mediam text-4xl">Refund policy</h1>
        </div>
        <div>
          <p className="opacity-95 tracking-wide leading-6 ">
            {
              "We're always here to help you if you have any issue with a product. That's why we're here 24/7 via phone, email, and chat. "
            }{" "}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-6">
            About Refund, Return and Repair Policy
          </h2>
          <p className="opacity-95 tracking-wide leading-6 ">
            This is the Refund, Repair and Return Policy of Lucky White Goods,
            and applies where you make a purchase online from
            luckywhitegoods.com.{" "}
          </p>
          <br />
          <p className="opacity-95 tracking-wide leading-6 ">
            1.1 Customer should check their goods at the time of delivery or
            when they are picking up from from our locations-
          </p>
          <ol className="ms-5 mt-3">
            <li className="mt-2">
              1. If any fault occurs within the warranty period, customers can 
              <Link className="link-hover font-medium link" href={"pages/contact"}> Contact Us</Link> over the phone.
            </li>
            <li className="mt-2">
              2. In most of the cases, we intend to attend the job on the same
              day but allow us 24-72 hours of time to resolve the issue.
            </li>
          </ol>

          <p className="opacity-9 tracking-wide leading-6 mt-6 ">
            1.2 When Returning Goods-
          </p>
          <ol className="ms-5 mt-3 opacity-9 tracking-wide leading-6  opacity-9">
            <li>
              1. The service we provide for repair, replacement or full refund,
              will be free of cost in a 40 kms radius from Lucky White Goods
              Store locations.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-6">Goods Damaged in Transit</h2>

          <ol className="ms-5 ">
            <li>
              1. Customers may not be entitled to any refund or exchange if they
              damage in transit.
            </li>
            <li className="mt-2">
              2. Customers are entitled for replacement or full refund for major
              failure in appliances.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-6">Refunds</h2>

          <ol className="ms-5 ">
            <li>
              1. Lucky White Goods aims to initiate your refund to your original
              payment method within 3-5 business days (depending upon your
              payment method).
            </li>
            <li className="mt-2">
              2. Customers are entitled for replacement or full refund for major
              failure in appliances.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-6">Returns & Repairs</h2>

          <ol className="ms-5 ">
            <li>
              1. If any goods cannot be easily returned to us , due to their
              size, the fault or because they have been affixed or installed in
              your premises, please contact our{" "}
              <Link className="link-hover link" href={"pages/contact"}>Customer Support</Link> and we will
              arrange an inspection to assess the goods.
            </li>
            <li className="mt-2">
              2. Goods returned for repair will be assessed and/or repaired
              within a reasonable time. You may be provided with an indicative
              repair time, which time may vary due to reasons beyond ours or the
              {"repairer’s"} reasonable control, such as part availability and
              incorrect fault description.
            </li>
            <li className="mt-2">
              3. Goods returned for repair will be assessed and/or repaired
              within a reasonable time. You may be provided with an indicative
              repair time, which time may vary due to reasons beyond ours or the
              {"repairer’s"} reasonable control, such as part availability and
              incorrect fault description.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-6">Change of Mind/Cancellation</h2>
          <p className="opacity-95 tracking-wide leading-6 ">
            We recommend you carefully preview any orders before adding them to
            your shopping cart and proceeding with your order.
          </p>
          <br />
          <p className="opacity-95 tracking-wide leading-6 ">
            Lucky White Goods reserves the right to cancel, at any time before
            delivery and for whatever reason, an Order that it has previously
            accepted. We may do this for example, but without limitation, where:
          </p>
          <ol className="ms-5 ">
            <li className="mt-2">
              1. Lucky White Goods’ suppliers are unable to supply Goods that
              they have previously promised to supply;
            </li>
            <li className="mt-2">
              2. an event beyond our control, such as storm, fire, flood,
              earthquake, terrorism, power failure, war, strike or failure of
              computer systems, means that Lucky White Goods is unable to supply
              the Goods within a reasonable time;
            </li>
            <li className="mt-2">
              3. Goods ordered were subject to an error on the Website, for
              example, in relation to a description, price or image, which was
              not discovered prior to the Order being accepted;
            </li>
            <li className="mt-2">
              4.In the event of Lucky White Goods or you cancelling your Order
              after payment has been processed, we will refund any money paid in
              respect of that Order.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-6">
            Product Shipping/ Delivery Charges
          </h2>

          <ol className="ms-5 ">
            <li>1. Prices for Goods are as shown on the Website.</li>
            <li className="mt-2">
              2. Lucky White Goods reserves the right to change the prices of
              Goods at any time without notice to you.The price displayed at the
              time that you place your Order will continue to apply to you even
              if the price changes before your Order is accepted by Lucky White
              Goods.
            </li>
            <li className="mt-2">
              3. In addition to the price for the Goods, you will also need to
              pay the listed delivery charge (if any) (“Delivery Charge”) for
              your Selected Delivery Option. Any Delivery Charge will appear in
              your shopping cart.
            </li>
            <li className="mt-2">
              4.By placing an Order, you agree to pay the price for the Goods
              and any Delivery Charge.
            </li>
            <li className="mt-2">
              5. All prices and Delivery Charges quoted are in Australian
              dollars and are inclusive of GST.{" "}
            </li>
          </ol>
        </div>
   <div className="mt-6">
  <h2 className="font-semibold mb-6">Location & Delivery Charges</h2>
  <ul className="ms-5" style={{ listStyleType: 'disc' }}>
    <li>{"Sydney (city area) – Free"}</li>
    <li>{"Adelaide – $1.5 per km"}</li>
    <li>{"Canberra – $1 per km"}</li>
    <li>{"Goulburn – $100"}</li>
    <li>{"Yass - $100"}</li>
    <li>{"Batemans Bay - $150-180"}</li>
    <li>{"Cooma - $120"}</li>
  </ul>
</div>

      </div>
    </div>
  );
}
