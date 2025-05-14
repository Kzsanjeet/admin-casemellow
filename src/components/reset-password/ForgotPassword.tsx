"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"



const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      return setError("Please enter your email address")
    }
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_PORT}/client/forgot-password`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
      )
      const data = await response.json()

      if (data.success) {
        setSuccess(
          data.message || "Email sent successfully, please check your inbox"
        )
      } else if (data.success === false) {
        setError(data.message || "Something went wrong, Try again !")
      }
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "An error occurred. Please try again later."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        setError("")
        setSuccess("")
      }, 4000)
    }
  }, [error, success])
  return (
    <>
      {/* <Nav /> */}
      <div className="fixed h-screen w-full z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-4/5 sm:3/12 md:3/12 xl:w-3/12 p-8 bg-white shadow-xl rounded-lg space-y-6 ">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Forgot Password
          </h1>
          <p className="mt-2 text-center text-gray-600 text-sm">
            Enter your email address and we'll send you a email to reset your
            password.
          </p>
          {error && (
            <p className="text-sm text-red-600 mt-2 bg-red-50 p-4">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 mt-2 bg-green-50 p-4">
              {success}
            </p>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:red-blue-500"
            >
              {loading ? <p>Verifying...</p> : <p>Verify Email</p>}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={(e)=> router.push("/login")} className="text-red-600 hover:text-red-700 hover:underline">Login</button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default ForgotPassword