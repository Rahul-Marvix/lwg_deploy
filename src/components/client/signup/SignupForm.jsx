"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { userAxiosInstance } from "@/utils/axiosUtils";
import { toast } from "react-toastify";
import signupSchema from "@/schemas/signupSchema";

export const revalidate=0 
export default function SignupForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await userAxiosInstance.post("/auth/register", values);
        console.log("signup success", response.data);
        if (response.data.success) {
          toast.success("Signup successfull");
          router.push("/login");
        }
      } catch (error) {
        console.log("signup failed", error);
        toast.error("Signup failed");
      }
    },
  });
  

  return (
    <div className="bg-white mt-5">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 border rounded-md md:w-3/4 lg:w-2/6 shadow-xl">
          <h1 className="text-4xl text-black font-serif font-bold mb-10 text-center">
            SIGN UP
          </h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full border border-gray-300 shadow-md px-3 py-2 rounded-md mb-2 "
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-xs text-red-600">{formik.errors.name}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full border border-gray-300 shadow-md px-3 py-2 rounded-md mb-3 "
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-xs text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                className="w-full border border-gray-300 shadow-md px-3 py-2 rounded-md mb-3 "
                placeholder="Phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-xs text-red-600">{formik.errors.phone}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full border border-gray-300 shadow-md px-3 py-2 rounded-md mb-3 "
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-xs text-red-600">{formik.errors.password}</p>
              )}
            </div>

            <div className="w-full mb-3">
              <button
                type="submit"
                className="w-full bg-blue-950 bg-[#a70e13] hover:scale-95 hover:bg-[#710a0d] text-white font-bold py-2 px-4 text-xl mb-1"
              >
                SIGN UP
              </button>
            </div>

            <div className="w-full">
              <div className="w-full justify-center text-center mb-1 font-bold ">
                OR
              </div>
              <div className="w-full">
                <button
                  type="button"
                  className="w-full border-2 bg-white hover:bg-gray-200 text-black border-gray-300 shadow-md font-bold py-2 px-4 flex items-center justify-center"
                >
                  <div className="text-3xl">
                    <FcGoogle />
                  </div>
                  <span className="ml-2 text-xl">Google</span>
                </button>
              </div>
              <div className="text-end">
                <span>Already a member? </span>
                <Link
                  href={"/login"}
                  className="text-sm text-blue-700 hover:text-blue-700"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
