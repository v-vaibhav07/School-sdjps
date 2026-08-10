// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../services/api"

// function Login() {

//   const navigate = useNavigate()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const login = async () => {

//     try {

//       const res = await API.post("/auth/login", {
//         email,
//         password
//       })

//       const token = res.data.token
//       const user = res.data.user

//       // store token
//       localStorage.setItem("token", token)

//       // store role
//       localStorage.setItem("role", user.role)
//       localStorage.setItem("user", JSON.stringify(user))

//       // role based redirect
//       // if (user.role === "admin") {

//       //   navigate("/dashboard")

//       // }

//       // else if (user.role === "teacher") {

//       //   navigate("/teachers")

//       // }

//       // else if (user.role === "student") {

//       //   navigate("/student/dashboard")

//       // }

//       // else if (user.role === "parent") {

//       //   navigate("/parent/dashboard")

//       // }


//       // role based redirect
//       if (user.role === "admin") {
//         navigate("/admin/dashboard")
//       }
//       else if (user.role === "teacher") {
//         navigate("/teacher/dashboard")   
//       }
//       else if (user.role === "student") {
//         navigate("/student/dashboard")
//       }
//       else if (user.role === "parent") {
//         navigate("/parent/dashboard")
//       }

//     } catch (error) {

//       console.log("Login error", error)

//       alert("Invalid login")

//     }

//   }

//   return (

//     <div className="flex items-center justify-center h-screen">

//       <div className="bg-white p-6 shadow rounded w-[400px]">

//         <h1 className="text-2xl font-bold mb-4">
//           Login
//         </h1>

//         <input
//           className="border p-2 w-full mb-4"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-4"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={login}
//           className="bg-blue-600 text-white w-full py-2 rounded"
//         >
//           Login
//         </button>

//         {/* // added this */}
//         {/* <p className="text-sm text-center mt-3">
//           Don't have an account?{" "}
//           <span
//             className="text-blue-500 cursor-pointer"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </span>
//         </p> */}
//         <p className="text-sm text-center mt-3">
//   <span
//     className="text-blue-500 cursor-pointer"
//     onClick={() => navigate("/forgot-password")}
//   >
//     Forgot Password?
//   </span>
// </p>

//       </div>

//     </div>

//   )

// }

// export default Login




























import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // ---- UI-only state (no auth/backend impact) ----
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const login = async () => {

    setIsSubmitting(true)

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      const token = res.data.token
      const user = res.data.user

      // store token
      localStorage.setItem("token", token)

      // store role
      localStorage.setItem("role", user.role)
      localStorage.setItem("user", JSON.stringify(user))

      // role based redirect
      // if (user.role === "admin") {

      //   navigate("/dashboard")

      // }

      // else if (user.role === "teacher") {

      //   navigate("/teachers")

      // }

      // else if (user.role === "student") {

      //   navigate("/student/dashboard")

      // }

      // else if (user.role === "parent") {

      //   navigate("/parent/dashboard")

      // }


      // role based redirect
      if (user.role === "admin") {
        navigate("/admin/dashboard")
      }
      else if (user.role === "teacher") {
        navigate("/teacher/dashboard")
      }
      else if (user.role === "student") {
        navigate("/student/dashboard")
      }
      else if (user.role === "parent") {
        navigate("/parent/dashboard")
      }

    } catch (error) {

      console.log("Login error", error)

      alert("Invalid login")

    } finally {
      setIsSubmitting(false)
    }

  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login()
  }

  return (

    <div className="sdjps-login relative flex min-h-screen w-full overflow-hidden bg-slate-50 font-sans">

      {/* ================= LEFT — CINEMATIC BRAND PANEL ================= */}
      <div className="relative hidden w-[58%] flex-col justify-between overflow-hidden bg-[#070B1A] px-16 py-14 lg:flex">

        {/* layered gradient wash */}
        <div className="sdjps-gradient pointer-events-none absolute inset-0" />

        {/* mesh / grid pattern */}
        <svg className="sdjps-grid pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sdjps-mesh" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#7C8FFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sdjps-mesh)" />
        </svg>

        {/* ambient glow orbs */}
        <div className="sdjps-orb sdjps-orb-a pointer-events-none absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-indigo-600/30 blur-[110px]" />
        <div className="sdjps-orb sdjps-orb-b pointer-events-none absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-blue-500/25 blur-[110px]" />
        <div className="sdjps-orb sdjps-orb-c pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />

        {/* floating constellation nodes — "connecting every classroom" */}
        <svg className="sdjps-nodes pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 800" fill="none">
          <g stroke="#8AA0FF" strokeOpacity="0.25" strokeWidth="1">
            <line x1="120" y1="160" x2="300" y2="240" />
            <line x1="300" y1="240" x2="260" y2="420" />
            <line x1="300" y1="240" x2="500" y2="180" />
            <line x1="500" y1="180" x2="640" y2="320" />
            <line x1="260" y1="420" x2="470" y2="500" />
            <line x1="470" y1="500" x2="640" y2="320" />
          </g>
          <g fill="#A6B6FF">
            <circle className="sdjps-node" cx="120" cy="160" r="4" />
            <circle className="sdjps-node" cx="300" cy="240" r="5" style={{ animationDelay: "0.6s" }} />
            <circle className="sdjps-node" cx="260" cy="420" r="4" style={{ animationDelay: "1.2s" }} />
            <circle className="sdjps-node" cx="500" cy="180" r="4" style={{ animationDelay: "0.3s" }} />
            <circle className="sdjps-node" cx="640" cy="320" r="5" style={{ animationDelay: "1.5s" }} />
            <circle className="sdjps-node" cx="470" cy="500" r="4" style={{ animationDelay: "0.9s" }} />
          </g>
        </svg>

        {/* brand mark */}
        <div className="sdjps-fade-in relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 shadow-lg shadow-indigo-900/40">
            <span className="text-base font-bold text-white">S</span>
          </div>
          <span className="text-lg font-semibold tracking-wide text-white">SDJPS</span>
        </div>

        {/* headline */}
        <div className="sdjps-fade-in relative z-10 max-w-lg" style={{ animationDelay: "0.15s" }}>
          <h1 className="text-[2.6rem] font-semibold leading-[1.15] tracking-tight text-white">
            Empowering Every Student.
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-blue-200 to-white bg-clip-text text-transparent">
              Connecting Every Classroom.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-400">
            A smarter digital experience for students, teachers, parents and administrators.
          </p>
        </div>

        {/* footer line */}
        <div className="sdjps-fade-in relative z-10 flex items-center gap-2 text-xs text-slate-500" style={{ animationDelay: "0.3s" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Trusted by school communities everywhere
        </div>
      </div>

      {/* ================= RIGHT — LOGIN PANEL ================= */}
      <div className="relative flex w-full flex-1 items-center justify-center bg-slate-50 px-6 py-12">

        {/* faint background accent for the light panel */}
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl" />

        <div className="sdjps-card relative z-10 w-full max-w-[400px] rounded-2xl border border-slate-200/70 bg-white/90 p-8 shadow-[0_20px_60px_-15px_rgba(30,41,120,0.18)] backdrop-blur-sm sm:p-10">

          {/* mobile-only brand mark */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-base font-semibold tracking-wide text-slate-900">SDJPS</span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Sign in to continue to your SDJPS account.
          </p>

          {/* Email field */}
          <div className="mt-8">
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Email
            </label>
            <div
              className={`flex items-center rounded-xl border bg-white px-3.5 transition-all duration-200 ${
                emailFocused
                  ? "border-indigo-500 ring-4 ring-indigo-500/10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <svg className="h-4.5 w-4.5 shrink-0 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="m4 6.5 8 6.2 8-6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="email"
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Password
            </label>
            <div
              className={`flex items-center rounded-xl border bg-white px-3.5 transition-all duration-200 ${
                passwordFocused
                  ? "border-indigo-500 ring-4 ring-indigo-500/10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <svg className="h-4.5 w-4.5 shrink-0 text-slate-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="shrink-0 text-slate-400 transition-colors hover:text-slate-600"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18M10.6 10.7a2.6 2.6 0 0 0 3.7 3.6M6.6 6.7C4.5 8.1 3 10 2 12c1.9 3.9 6 7 10 7 1.7 0 3.3-.5 4.7-1.3M9.9 4.4A10.6 10.6 0 0 1 12 4c4 0 8.1 3.1 10 7-.6 1.2-1.4 2.4-2.4 3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12c1.9-3.9 6-7 10-7s8.1 3.1 10 7c-1.9 3.9-6 7-10 7s-8.1-3.1-10-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="mt-3 flex justify-end">
            <span
              className="cursor-pointer text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          {/* Sign in button */}
          <button
            onClick={login}
            disabled={isSubmitting}
            className="sdjps-btn group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-600/35 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </>
            )}
          </button>

          <p className="mt-8 text-center text-[11px] text-slate-400">
            Protected by SDJPS secure login
          </p>
        </div>
      </div>

      <style>{`
        .sdjps-gradient {
          background: linear-gradient(120deg, #0B1120 0%, #131A3A 35%, #1B255C 65%, #101636 100%);
          background-size: 200% 200%;
          animation: sdjps-gradient-move 18s ease-in-out infinite;
        }
        .sdjps-grid { animation: sdjps-grid-pan 40s linear infinite; }
        .sdjps-orb-a { animation: sdjps-pulse 9s ease-in-out infinite; }
        .sdjps-orb-b { animation: sdjps-pulse 11s ease-in-out infinite 1.5s; }
        .sdjps-orb-c { animation: sdjps-pulse 13s ease-in-out infinite 0.5s; }
        .sdjps-node { animation: sdjps-node-pulse 3.2s ease-in-out infinite; }
        .sdjps-fade-in { animation: sdjps-fade-slide 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .sdjps-card { animation: sdjps-fade-slide 0.7s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes sdjps-gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes sdjps-grid-pan {
          0% { transform: translate(0, 0); }
          100% { transform: translate(56px, 56px); }
        }
        @keyframes sdjps-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes sdjps-node-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes sdjps-fade-slide {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sdjps-gradient, .sdjps-grid, .sdjps-orb-a, .sdjps-orb-b, .sdjps-orb-c,
          .sdjps-node, .sdjps-fade-in, .sdjps-card {
            animation: none !important;
          }
        }
      `}</style>
    </div>

  )

}

export default Login