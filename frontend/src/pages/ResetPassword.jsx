import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

function ResetPassword() {

  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")

  const resetPassword = async () => {
    try {
      await API.post("/auth/reset-password", {
        token,
        newPassword: password
      })

      alert("Password reset successful")
      navigate("/login")

    } catch (err) {
      alert("Invalid or expired token")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">

      <div className="bg-white p-6 shadow rounded w-[400px]">

        <h1 className="text-2xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={resetPassword}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Update Password
        </button>

      </div>

    </div>
  )
}

export default ResetPassword