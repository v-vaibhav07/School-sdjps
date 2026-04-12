import { useState } from "react"
import API from "../services/api"

function ForgotPassword() {

  const [email, setEmail] = useState("")

  const sendResetLink = async () => {
    try {
      await API.post("/auth/forgot-password", { email })
      alert("Reset link sent to your email")
    } catch (err) {
      alert("Error sending reset link")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 shadow rounded w-[400px]">

        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendResetLink}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  )
}

export default ForgotPassword