"use client";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import "./adminNavbar.css"
export default function AdminNavbar({ isopen, setIsOpen }) {
const router=useRouter()



  const logout = () => {
    document.cookie = "adminJWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "adminRefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   router.push("/admin/login")
  }
  return (
    <header className=" admin-nav w-full fixed z-10 top-0">
      <nav className="flex flex-row   ">
        <div className=" flex flex-row justify-between items-center p-1 w-full bg-[#e0e0e0]">
          <div>
             
            <button
              onClick={() => setIsOpen(isopen ? false : true)}
              className="p-3  bg-gray-200 rounded-lg md:hidden"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            
          </div>
          <div className="me-2">
            <details className="dropdown">
              <summary className="m-1 btn">Admin name</summary>
              <ul className=" shadow menu dropdown-content z-[1] bg-[#fff]  rounded-lg w-52 right-3">
                <li>
                  <div className="flex flex-col bg-[#f3eeeb] hover:bg-[#fcf0e6]  ps-2 w-full">
                    <h2 className="me-auto font-bold">Test Name</h2>
                    <span className="me-auto opacity-70 ">test@gmail.com</span>
                  </div>
                </li>
                <hr className="my-2 border-blue-gray-50" />
                <li>
                  <div className="ps-2 font-semibold">Profile</div>
                </li>
                <hr className="my-2 border-blue-gray-50" />

                <li>
                  <div onClick={()=>logout()} className="ps-2 font-semibold">Logout</div>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </nav>
    </header>
  );
}
