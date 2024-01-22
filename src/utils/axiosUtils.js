import axios from "axios";
import cookieHandler from "./serverCookie";

// Updated getCookie function to handle SSR and client
const getCookie = async(name, req = null) => {

  if (req) { // If 'req' is provided, we are on the server

    const token=await cookieHandler(name)
   return token
  }
  // Otherwise, we are on the client
  // if (typeof document !== "undefined") {
  //   console.log("client anop");
  //   const nameEQ = name + "=";
  //   const ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  //   }
  // }
  
  return null;
};

// Set cookie function for server-side responses
const setCookie = (res, name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  const cookie = `${name}=${value || ""}${expires}; path=/`;
  res.setHeader("Set-Cookie", [cookie]);
};

const userBaseUrl = `${process.env.BASE_URL}/api`;
const adminBaseUrl = `${process.env.BASE_URL}/api`;

const createAxiosClient = (baseURL, tokenType) => {
  const client = axios.create({
    baseURL,
    timeout: 6000,
    timeoutErrorMessage: "Request timeout Please Try Again!!!",
  });

  client.interceptors.request.use(req => attachToken(req, tokenType));

  return client;
};

const attachToken = async(req, tokenType) => {
  let authToken = await getCookie(`${tokenType}JWT`,req);

  if (authToken) {
    req.headers.Authorization = `${authToken}`;
  }
  return req;
};

const userAxiosInstance = createAxiosClient(userBaseUrl, 'user');
const adminAxiosInstance = createAxiosClient(adminBaseUrl, 'admin');

export { userAxiosInstance, adminAxiosInstance };
