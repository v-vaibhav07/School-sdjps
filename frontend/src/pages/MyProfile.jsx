// import { useEffect, useState } from "react"
// import API from "../services/api"

// function MyProfile() {
//   const [student, setStudent] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("/student/profile")
//         setStudent(res.data)
//       } catch (err) {
//         console.log(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProfile()
//   }, [])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
//         <div className="max-w-5xl mx-auto animate-pulse">
//           <div className="h-56 rounded-3xl bg-gray-200 mb-6" />
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//             <div className="h-28 rounded-2xl bg-gray-200" />
//             <div className="h-28 rounded-2xl bg-gray-200" />
//             <div className="h-28 rounded-2xl bg-gray-200" />
//             <div className="h-28 rounded-2xl bg-gray-200" />
//             <div className="h-28 rounded-2xl bg-gray-200" />
//             <div className="h-28 rounded-2xl bg-gray-200" />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!student) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-md px-6 py-10 text-center max-w-md w-full">
//           <div className="text-5xl mb-3">😕</div>
//           <h2 className="text-xl font-bold text-gray-800">Profile not found</h2>
//           <p className="text-gray-500 mt-2">Unable to load student profile.</p>
//         </div>
//       </div>
//     )
//   }

//   const initials = student.full_name
//     ? student.full_name
//         .split(" ")
//         .map((word) => word[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase()
//     : "S"

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-3 sm:p-5 md:p-6">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Page title */}
//         <div className="mb-5 sm:mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             My Profile
//           </h1>
//           <p className="text-sm sm:text-base text-gray-500 mt-1">
//             View your personal and academic information
//           </p>
//         </div>

//         {/* Hero Card */}
//         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-xl">
//           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />
          
//           <div className="relative p-5 sm:p-7 md:p-8">
//             <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              
//               {/* Avatar */}
//               <div className="shrink-0">
//                 <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/20 border-4 border-white/30 backdrop-blur flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
//                   {initials}
//                 </div>
//               </div>

//               {/* Main info */}
//               <div className="flex-1 text-center md:text-left text-white">
//                 <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
//                   Student Profile
//                 </p>

//                 <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold break-words">
//                   {student.full_name || "Student Name"}
//                 </h2>

//                 <p className="mt-2 text-white/85 text-sm sm:text-base break-all">
//                   {student.email || "-"}
//                 </p>

//                 <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
//                   <Badge text={`Class ${student.class_name || "-"}`} />
//                   <Badge text={`Section ${student.section || "-"}`} />
//                   <Badge text={`Roll No: ${student.roll_number || "-"}`} />
//                   <Badge text={(student.role || "student").toUpperCase()} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Info Grid */}
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
//           <ProfileCard label="Full Name" value={student.full_name} icon="👤" />
//           <ProfileCard label="Email Address" value={student.email} icon="📧" />
//           <ProfileCard label="Role" value={student.role} icon="🛡️" />
//           <ProfileCard label="Student ID" value={student.student_id} icon="🆔" />
//           <ProfileCard label="Roll Number" value={student.roll_number} icon="🎫" />
//           <ProfileCard label="Class ID" value={student.class_id} icon="🏫" />
//           <ProfileCard label="Class Name" value={student.class_name} icon="📘" />
//           <ProfileCard label="Section" value={student.section} icon="📚" />
//         </div>

//         {/* Bottom note */}
//         <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:p-5">
//           <h3 className="text-sm sm:text-base font-semibold text-indigo-800">
//             Read Only Profile
//           </h3>
//           <p className="text-sm text-indigo-700 mt-1 leading-6">
//             Your profile details are visible here for reference. If any information is incorrect,
//             please contact your school administration.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// function ProfileCard({ label, value, icon }) {
//   return (
//     <div className="group rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <p className="text-xs sm:text-sm font-medium text-gray-500">{label}</p>
//           <p className="mt-2 text-base sm:text-lg font-semibold text-gray-900 break-words leading-7">
//             {value || "-"}
//           </p>
//         </div>

//         <div className="text-xl shrink-0">
//           {icon}
//         </div>
//       </div>
//     </div>
//   )
// }

// function Badge({ text }) {
//   return (
//     <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur">
//       {text}
//     </span>
//   )
// }

// export default MyProfile










import { useEffect, useState } from "react"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import {
  User,
  Mail,
  ShieldCheck,
  BadgeInfo,
  Ticket,
  School,
  BookOpen,
  LibraryBig
} from "lucide-react"

function MyProfile() {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/student/profile")
        setStudent(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // ✅ LOADER
  if (loading) return <BookLoader />

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md px-6 py-10 text-center max-w-md w-full">
          <div className="text-5xl mb-3">😕</div>
          <h2 className="text-xl font-bold text-gray-800">Profile not found</h2>
          <p className="text-gray-500 mt-2">Unable to load student profile.</p>
        </div>
      </div>
    )
  }

  const initials = student.full_name
    ? student.full_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "S"

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-3 sm:p-5 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Page title */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <User className="text-indigo-600" size={30} />
            My Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            View your personal and academic information
          </p>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

          <div className="relative p-5 sm:p-7 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/20 border-4 border-white/30 backdrop-blur flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
                  {initials}
                </div>
              </div>

              {/* Main info */}
              <div className="flex-1 text-center md:text-left text-white">
                <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
                  Student Profile
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold break-words">
                  {student.full_name || "Student Name"}
                </h2>

                <p className="mt-2 text-white/85 text-sm sm:text-base break-all">
                  {student.email || "-"}
                </p>

                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge text={`Class ${student.class_name || "-"}`} />
                  <Badge text={`Section ${student.section || "-"}`} />
                  <Badge text={`Roll No: ${student.roll_number || "-"}`} />
                  <Badge text={(student.role || "student").toUpperCase()} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          <ProfileCard label="Full Name" value={student.full_name} icon={<User className="text-indigo-600" size={22} />} />
          <ProfileCard label="Email Address" value={student.email} icon={<Mail className="text-blue-600" size={22} />} />
          <ProfileCard label="Role" value={student.role} icon={<ShieldCheck className="text-emerald-600" size={22} />} />
          <ProfileCard label="Student ID" value={student.student_id} icon={<BadgeInfo className="text-violet-600" size={22} />} />
          <ProfileCard label="Roll Number" value={student.roll_number} icon={<Ticket className="text-amber-600" size={22} />} />
          <ProfileCard label="Class ID" value={student.class_id} icon={<School className="text-rose-600" size={22} />} />
          <ProfileCard label="Class Name" value={student.class_name} icon={<BookOpen className="text-cyan-600" size={22} />} />
          <ProfileCard label="Section" value={student.section} icon={<LibraryBig className="text-pink-600" size={22} />} />
        </div>

        {/* Bottom note */}
        <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold text-indigo-800">
            Read Only Profile
          </h3>
          <p className="text-sm text-indigo-700 mt-1 leading-6">
            Your profile details are visible here for reference. If any information is incorrect,
            please contact your school administration.
          </p>
        </div>
      </div>
    </div>
  )
}

function ProfileCard({ label, value, icon }) {
  return (
    <div className="group rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-base sm:text-lg font-semibold text-gray-900 break-words leading-7">
            {value || "-"}
          </p>
        </div>

        <div className="shrink-0">
          {icon}
        </div>
      </div>
    </div>
  )
}

function Badge({ text }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur">
      {text}
    </span>
  )
}

export default MyProfile