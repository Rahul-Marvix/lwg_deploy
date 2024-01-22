import BranchCards from "@/components/client/home/BranchCards";
export default function page() {
  return (
    <div className="mt-10 w-full">
      <section className="lg:w-4/6 w-full mx-auto">
        <div className="bg-white flex flex-col mx-2 p-5  rounded-xl ">
          <div className="flex mb-4 ms-5 ">
            <h1 className="lg:text-5xl  md:text-3xl text-xl mx-auto uppercase font-sans ">
              Contact us
            </h1>
          </div>
          <form action="">
            <div className="grid grid-cols-1 gap-3 justify-center">
              <div className=" mx-5 ">
                <label className=" font-serif text-lg" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full  p-2 py-3 rounded-sm"
                  placeholder="Please enter your name"
                  type="text"
                />
              </div>

              <div className=" mx-5 ">
                <label className=" font-serif text-lg" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full  p-2 rounded-sm"
                  placeholder="Please enter your email"
                  type="text"
                />
              </div>

              <div className=" mx-5 ">
                <label className=" font-serif text-lg" htmlFor="Phone">
                  Phone
                </label>
                <input
                  className="w-full  p-2 rounded-sm"
                  placeholder=" Please enter your Phone number"
                  type="text"
                />
              </div>

              <div className="mx-5">
                <label className="font-serif text-lg" htmlFor="comment">
                  Comment
                </label>
                <textarea
                  className="w-full p-2 rounded-sm"
                  placeholder="Please share your thoughts with us."
                  rows="5"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button className="bg-black text-white px-6 py-2 font-semibold rounded-lg text-lg ">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <div className="flex gap-3 mx-5  lg:flex-row flex-col">
        <BranchCards />
        <BranchCards />
        <BranchCards />
      </div>
      <div className="mt-5">
      <iframe
   src="https://www.google.com/maps/d/embed?mid=1VKnLpKDb_39g6J7W78pd2wnf4yC3IcU&ehbc=2E312F&noprof=1" 
    width="100%"
    height="450"
    style={{ border: "0" }}
    allowFullScreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
      </div>
    </div>
  );
}
