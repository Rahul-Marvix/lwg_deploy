"use client";
import Image from "next/image";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import searchIcon from "../../../assets/search-icon.png";
import lwg_logo from "../../../assets/lwg_logo.png";
import profileIcon from "../../../assets/profile_logo.png";
import "@/app/(client)/Navbar/Navbar.css";
import { userAxiosInstance } from "@/utils/axiosUtils";
import { usePathname } from "next/navigation"


export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isfetching, setfetching] = useState(false);
  const pathname=usePathname()


  useEffect(() => {

    const controlNavbarVisibility = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
  

    window.addEventListener("scroll", controlNavbarVisibility);

    return () => {
      window.removeEventListener("scroll", controlNavbarVisibility);
    };
  }, [lastScrollY]);


  const [isLogin, setIsLogin] = useState(false);

  const checkLogin = async () => {
    try {
      let response = await userAxiosInstance.get("/auth/islogin");
      if (response.data.success) 
      console.log(response);

      setIsLogin(true);
    } catch (error) {
      console.log(error);
    }finally{
      setfetching(false);
    }
  };
  useEffect(() => {
    try {
      setfetching(true)
      checkLogin();
    } catch (error) {
      console.log(error);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    document.cookie = "userJWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userRefreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  }
  

  return (
    <header
      //  className="bg-[#72090D]"
      className={`head  ${showNavbar ? "" : "hide"} `}
    >
      <nav>
        <div className="flex justify-center top_text sm:text-sm pt-4 lg:text-lg tracking-wide ">
          <h2 className="text-white    text-center mx-10 font-medium">
            Adelaide - 0477012389, Brisbane - 0499999846, Sydney - 0406287145.
          </h2>
        </div>
      </nav>
      {/* <div className="h-[3px] bg-[#72090D]">

      </div> */}
      <nav className="flex items-center justify-between  gap-5  flex-row   py-5 px-4">
        <div className="block lg:hidden ">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-slate-200 hover:border-text-slate-200"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <Link href={"/"}>
          <div className="flex items-center  text-white mr-6">
            <Image src={lwg_logo} alt="lwg_logo" />
          </div>
        </Link>

        <div
          className={`w-full list block  lg:flex lg:items-center sm:top-[148px] lg:w-auto md:top-[140px] top-[133px] lg:top-0 ${
            isMenuOpen ? "isActive" : ""
          }`}
        >
          <div className="text-sm lg:flex-grow">
            <ul className="text-white lg:flex lg:gap-5  xl:text-[18px]">
              <li className="flex lg:hidden ">
                <input
                  type="text "
                  placeholder="Search.."
                  className="w-full p-2 me-3 rounded-md"
                />
                <div className="indicator h-8 w-auto">
                  <Image src={searchIcon} alt="search" height={24} width={24} />
                </div>
              </li>
              <li className="max-lg:hover:bg-slate-900 lg:hover:underline lg:hover:scale-105 ">
                <Link href="/">Home</Link>
              </li>
              <li className="max-lg:hover:bg-slate-900 lg:hover:underline lg:hover:scale-105">
                <Link href="/collections">All Categories</Link>
              </li>
              <li className="max-lg:hover:bg-slate-900 lg:hover:underline lg:hover:scale-105 block">
                <Link href="/repairing-services">Repairing Services</Link>
              </li>
              <li className="max-lg:hover:bg-slate-900 lg:hover:underline lg:hover:scale-105">
                <Link href="/contact">Contact Us</Link>
              </li>
          
              <li className="max-lg:hover:bg-slate-900 lg:hover:underline lg:hover:scale-105">
                <Link href="/pages/seller-profile">Choose Your Location</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row lg:ms-auto  gap-5 items-center">
          <div className="indicator hidden lg:block">
            <Image src={searchIcon} alt="search" height={24} width={24} />
          </div>
          <div className="indicator">
            {" "}
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <Image src={profileIcon} alt="profile" height={24} width={24} />
              </label>
              {!isfetching&&<ul
                tabIndex={0}
                className="dropdown-content z-[100] menu p-2 shadow font-semibold bg-white rounded-lg  w-52"
              >

                {
                  
                isLogin ? (
                  <>
                    <li className="mb-2  ">
                      <Link href={"/login"}>profile</Link>
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="mb-2  ">
                      <Link href={"/login"}>Login</Link>
                    </li>
                    <li>
                      <Link href={"/signup"}>Register</Link>
                    </li>
                  </>
                )}
              </ul>}
            </div>
          </div>
          <div className="indicator text-white ">
          <Link href={"/cart"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm bg-amber-400 h-5 w-5 indicator-item">
              {0}
            </span>
          </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
