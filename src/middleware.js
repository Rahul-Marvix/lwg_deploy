import { NextResponse } from "next/server";
import cookieHandler from "./utils/serverCookie";

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const cookieString = req.headers.get("cookie");
  let adminJwtCookie;
  let userJwtCookie;
  if (cookieString) {
    // Split the cookie string into individual cookies
    const cookies = cookieString.split(";");

    // Find the cookie with the name "adminJWT"
    adminJwtCookie =
      cookies?.find((cookie) => cookie.trim().startsWith("adminJWT=")) ||
      undefined;
    userJwtCookie =
      cookies.find((cookie) => cookie.trim().startsWith("userJWT=")) ||
      undefined;
  }

  // Extract the value of "adminJWT"
  const adminJwtValue = adminJwtCookie
    ? adminJwtCookie.split("=")[1]
    : undefined;
  const userJwtValue = userJwtCookie ? userJwtCookie.split("=")[1] : undefined;
  // console.log(adminJwtValue);

  // Check for excluded path
  if (path === "/admin/login") {
    if (adminJwtValue) {
      const response = await fetch(`${process.env.BASE_URL}/api/auth/islogin`, {
        method: "GET",
        headers: {
          Authorization: `${adminJwtValue}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const responseData = await response.json();

        if (responseData.success) {
          return NextResponse.redirect(new URL("/admin", req.url));
        } else {
          return NextResponse.next();
        }
      } else {
        return NextResponse.next();
      }
    }

    return NextResponse.next(); // Allow access to login page
  }

  // Check for token presence
  if (!adminJwtValue) {
    return NextResponse.redirect(new URL("/admin/login", req.url)); // Redirect to login if no token
  }

  const response = await fetch(`${process.env.BASE_URL}/api/auth/islogin`, {
    method: "GET",
    headers: {
      Authorization: `${adminJwtValue}`,
      "Content-Type": "application/json",
    },
  });
  if (response) {
    const responseData = await response.json();

    if (responseData.success) {
      // If token is valid, allow access
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // If token is invalid, handle error and redirect
}

export const config = {
  matcher: "/admin/:path*", // Match all routes under /admin except /admin/login
};
