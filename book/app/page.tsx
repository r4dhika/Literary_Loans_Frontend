"use client"
import axiosInstance from "@/axiosInstance"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useAuthStore from "./store/authStore"

export default function Home() {
  const auth_url = process.env.GOOGLE_AUTH_URL || ""
  const authStore = useAuthStore()
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    console.log(loading)
    axiosInstance.get('/auth/data')
      .then(response => {
        console.log("Response",response.data)
        if (response.status === 200) {
          const newUser = {
            isAuthenticated: true,
            userId: response.data.id,
            emailAdd: response.data.email,
            picture: response.data.picture,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            token: response.data.token
          }
          if(response.data.isOnboarded)
          console.log("New User",newUser)
          authStore.setUser(newUser)
          if(response.data.isOnboarded){
            router.push("/dashboard")
          }else{
            router.push("/onboarding")
          }
        } else {
          setLoading(false)
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error)
        setLoading(false)
      })
  }, [])
  console.log(authStore.user.token)
  return loading ? (
    <div className="text-white">
      Loading...
    </div>
  ) : (
    <main className="flex flex-col items-center justify-center w-100 h-100">
      <Button><Link href={auth_url}>Sign in</Link></Button>
    </main>
  );
}
