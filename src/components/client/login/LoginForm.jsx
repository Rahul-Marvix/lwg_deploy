"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import loginSchema from "@/schemas/loginSchema";
import { userAxiosInstance } from "@/utils/axiosUtils";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export default function LoginForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        console.log("Form submitted with values:", values);
        const response = await userAxiosInstance.post("/auth/login", values, {
          withCredentials: true
        });
        
        console.log("signup success", response.data);
        if (response.data.success) {
          setCookie("userJWT", response.data.accessToken, 7); // Expires in 7 days
          setCookie("userRefreshToken", response.data.refreshToken, 7);
          // localStorage.setItem("userJWT", response.data.accessToken);
          // localStorage.setItem("userRefreshToken", response.data.refreshToken);
          toast.success("login successfull");
          router.back();
        }
      } catch (error) {
        console.log("login failed", error);
        toast.error("login failed");
      }
    },
  });

  return (
    <div className="bg-white  mt-10">
      <div className="flex justify-center  items-center h-full  ">
        <div className="bg-white p-8 border rounded-md  md:w-3/4 lg:w-2/6 shadow-xl  ">
       
          <h1 className="text-4xl text-black font-serif font-bold mb-10 text-center">
            LOGIN
          </h1>
          <h3 className="font-bold text-xl  text-black mb-4">Login To</h3>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-">
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
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2 ">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-md mb-3 "
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-xs text-red-600">{formik.errors.password}</p>
              )}
            </div>
            <div className="w-full mb-3">
              <div className="w-full">
                <button
                  type="submit"
                  className=" w-full bg-blue-950 bg-[#a70e13] hover:scale-95 hover:bg-[#710a0d] text-white font-bold py-2 px-4  text-xl mb-1"
                >
                  LOGIN
                </button>
              </div>
            
            </div>
            <div className="w-full">
              <div className="w-full justify-center text-center  mb-1 font-bold ">
                OR
              </div>
              <div className="w-full">
                <button
                  type="button"
                  className="w-full border-2 bg-white hover:bg-gray-200 text-black border-gray-300 shadow-md font-bold py-2 px-4 flex items-center justify-center backdrop-filter backdrop-blur-md backdrop-opacity-70"
                >
                  <div className="text-3xl">
                    <FcGoogle />
                  </div>
                  <span className="ml-2 text-xl">Google</span>
                </button>
              </div>
              <div className="text-end">
                <span>not a member? </span>
                <Link
                  href={"/signup"}
                  className="text-sm text-blue-700 hover:text-blue-700"
                >
                  signup
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
