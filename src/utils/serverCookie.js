"use server"
import { cookies } from 'next/headers'
export default async function cookieHandler(name) {
    
    const cookieStore = cookies()
  
    // Now you can use the cookies object
    const token=  cookieStore.get(name)
    
  return token?.value
    // Rest of your server-side code
  }
