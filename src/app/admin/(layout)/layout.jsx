"use client"
import "@/app/globals.css";
// import { Roboto_Mono } from 'next/font/google'
import ToastContainer from "@/components/toastify";
import "react-toastify/dist/ReactToastify.css"
import SideBar from "../../../components/admin/SideBar"
import AdminNavbar from "../../../components/admin/AdminNavbar"
import NextTopLoader from "nextjs-toploader"
import "./admin.css"


import { useState } from "react";

// const roboto = Roboto_Mono({
//   weight: '400',
//   subsets:["latin"]
// })
export default function RootLayout({ children }) {
  const [isopen,setIsOpen]=useState(true)
  return (
    <html lang="en">
      <body className={`flex admin-side flex-row 
      `} >
        <NextTopLoader/>
        

        {/* Sidebar */}
        <SideBar isopen={isopen} setIsOpen={setIsOpen} />

        {/* Main content including navbar and page content */}
        <div className="flex md:ms-[256px] admin-main flex-col transition-all ease-in-out w-full">
          {/* Navbar */}
          <AdminNavbar isopen={isopen} setIsOpen={setIsOpen} />

          {/* Page Content */}
          <main style={{ minHeight: 'calc(100vh - 64px)' }} className="overflow-auto mt-[64px]   bg-blue-gray-50">
            {children}
          </main>
        </div> 
        <ToastContainer />
      </body>
    </html>
  );
}




