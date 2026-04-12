// import { useState } from "react"
// import API from "../services/api"

// function AdminCreateExam() {

//   const [name, setName] = useState("")
//   const [examType, setExamType] = useState("")
//   const [year, setYear] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!name) {
//       alert("Exam name required")
//       return
//     }

//     try {
//       await API.post("/exams", {
//         name,
//         exam_type: examType || null,
//         academic_year: year
//       })

//       alert("Exam created successfully ✅")

//       setName("")
//       setExamType("")
//       setYear("")

//     } catch (err) {
//       console.error(err)
//       alert("Error creating exam ❌")
//     }
//   }

//   return (
//     <div className="p-6 max-w-xl">

//       <h1 className="text-2xl font-bold mb-6">Create Exam</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Name */}
//         <input
//           type="text"
//           placeholder="Exam Name (e.g. Mid Term)"
//           className="w-full p-2 border rounded-lg"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         {/* Type */}
//         <input
//           type="text"
//           placeholder="Exam Type (optional)"
//           className="w-full p-2 border rounded-lg"
//           value={examType}
//           onChange={(e) => setExamType(e.target.value)}
//         />

//         {/* Year */}
//         <input
//           type="text"
//           placeholder="Academic Year (e.g. 2025-26)"
//           className="w-full p-2 border rounded-lg"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         />

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
//         >
//           Create Exam
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AdminCreateExam




























//improved ui 1st
// import { useState } from "react"
// import API from "../services/api"
// import {
//   FileText,
//   BookOpen,
//   Calendar,
//   Layers,
//   Plus,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react"

// function AdminCreateExam() {

//   const [name, setName] = useState("")
//   const [examType, setExamType] = useState("")
//   const [year, setYear] = useState("")
//   const [saving, setSaving] = useState(false)
//   const [notification, setNotification] = useState(null)

//   const showNotification = (message, type = "success") => {
//     setNotification({ message, type })
//     setTimeout(() => setNotification(null), 3000)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!name.trim()) {
//       showNotification("Exam name is required", "error")
//       return
//     }

//     try {
//       setSaving(true)
//       await API.post("/exams", {
//         name,
//         exam_type: examType || null,
//         academic_year: year
//       })

//       showNotification("Exam created successfully!")
//       setName("")
//       setExamType("")
//       setYear("")

//     } catch (err) {
//       console.error(err)
//       showNotification("Error creating exam", "error")
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         .dm-sans { font-family: 'DM Sans', sans-serif; }

//         @keyframes slideIn {
//           from { opacity: 0; transform: translateX(100px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.4s ease-out;
//         }
//       `}</style>

//       <div className="p-4 md:p-6 dm-sans min-h-screen">

//         {/* Notification */}
//         {notification && (
//           <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3 
//             px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-2xl animate-slide-in max-w-[90vw]
//             ${notification.type === "error"
//               ? "bg-red-500 text-white"
//               : "bg-emerald-500 text-white"
//             }`}
//           >
//             {notification.type === "error"
//               ? <AlertCircle className="w-5 h-5 shrink-0" />
//               : <CheckCircle className="w-5 h-5 shrink-0" />
//             }
//             <span className="font-medium text-sm">{notification.message}</span>
//           </div>
//         )}

//         <div className="max-w-2xl mx-auto">

//           {/* Header */}
//           <div className="mb-6 md:mb-8">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
//               <FileText className="text-indigo-600" size={30} />
//               Create Exam
//             </h1>
//             <p className="text-gray-400 text-sm mt-1">
//               Set up a new examination for students
//             </p>
//           </div>

//           {/* Form Card */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">

//             <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
//               <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center">
//                 <BookOpen className="text-indigo-600" size={22} />
//               </div>
//               <div>
//                 <h2 className="text-base font-bold text-gray-800">Exam Details</h2>
//                 <p className="text-xs text-gray-400">Fill in the examination information</p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">

//               {/* Exam Name */}
//               <div>
//                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1.5">
//                   <BookOpen size={12} /> Exam Name <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Mid Term Examination"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 text-sm font-medium transition"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               {/* Exam Type */}
//               <div>
//                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1.5">
//                   <Layers size={12} /> Exam Type
//                   <span className="text-gray-300 font-normal normal-case ml-1">(optional)</span>
//                 </label>
//                 <select
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 text-sm font-medium transition bg-white"
//                   value={examType}
//                   onChange={(e) => setExamType(e.target.value)}
//                 >
//                   <option value="">Select Exam Type</option>
//                   <option value="unit_test">Unit Test</option>
//                   <option value="mid_term">Mid Term</option>
//                   <option value="final">Final Exam</option>
//                   <option value="quarterly">Quarterly</option>
//                   <option value="half_yearly">Half Yearly</option>
//                   <option value="annual">Annual</option>
//                   <option value="practice">Practice Test</option>
//                 </select>
//               </div>

//               {/* Academic Year */}
//               <div>
//                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1.5">
//                   <Calendar size={12} /> Academic Year
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. 2025-26"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 text-sm font-medium transition"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                 />
//               </div>

//               {/* Preview */}
//               {name && (
//                 <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
//                   <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">Preview</p>
//                   <div className="space-y-1.5">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-500">Name</span>
//                       <span className="font-semibold text-gray-800">{name}</span>
//                     </div>
//                     {examType && (
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-500">Type</span>
//                         <span className="font-semibold text-gray-800 capitalize">{examType.replace("_", " ")}</span>
//                       </div>
//                     )}
//                     {year && (
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-500">Year</span>
//                         <span className="font-semibold text-gray-800">{year}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={saving || !name.trim()}
//                 className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
//                   saving || !name.trim()
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
//                 }`}
//               >
//                 {saving ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Creating...
//                   </>
//                 ) : (
//                   <>
//                     <Plus size={18} /> Create Exam
//                   </>
//                 )}
//               </button>

//             </form>
//           </div>

//           {/* Bottom Tip */}
//           <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
//             <h3 className="text-sm font-semibold text-indigo-800 flex items-center gap-2">
//               <FileText size={14} /> Quick Tip
//             </h3>
//             <p className="text-sm text-indigo-700 mt-1 leading-6">
//               After creating an exam, you can assign it to specific classes and
//               teachers can start entering marks for their students.
//             </p>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default AdminCreateExam













// 2nd ui 
// import { useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import { FileText, Calendar, Layers, CheckCircle2, AlertCircle, BookOpen, ChevronDown } from "lucide-react"

// const EXAM_TYPES = [
//   "Unit Test", "PT 1", "Half Yearly", 
//   "PT 2", "Annual", "Pre-board 1", "Pre-board 2"
// ]

// function AdminCreateExam() {
//   const [name, setName] = useState("")
//   const [examType, setExamType] = useState("")
//   const [year, setYear] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [status, setStatus] = useState(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!name || !examType || !year) {
//       return setStatus({ type: 'error', msg: "Please fill all required fields!" })
//     }

//     setLoading(true)
//     try {
//       await API.post("/exams", { name, exam_type: examType, academic_year: year })
//       setStatus({ type: 'success', msg: "Exam schedule created successfully!" })
//       setName(""); setExamType(""); setYear("")
//     } catch (err) {
//       setStatus({ type: 'error', msg: "Failed to create exam. Try again." })
//     } finally {
//       setLoading(false)
//       setTimeout(() => setStatus(null), 3000)
//     }
//   }

//   return (
//     <AdminLayout>
//       <div className="max-w-4xl mx-auto p-4 md:p-8">
        
//         {/* Title Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
//             <FileText size={28} />
//           </div>
//           <div>
//             <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Create Exam</h1>
//             <p className="text-gray-500 font-medium">Configure new examination parameters for the school</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
//           {status && (
//             <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
//               {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
//               <span className="font-semibold text-sm">{status.msg}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             {/* Exam Name */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-bold text-gray-700 mb-2">Exam Title</label>
//               <div className="relative">
//                 <BookOpen className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="e.g. Science Mid-Term Assessment"
//                   className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Exam Type Dropdown */}
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-2">Exam Type</label>
//               <div className="relative">
//                 <Layers className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                 <select
//                   className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition appearance-none bg-white"
//                   value={examType}
//                   onChange={(e) => setExamType(e.target.value)}
//                 >
//                   <option value="">Select Category</option>
//                   {EXAM_TYPES.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
//               </div>
//             </div>

//             {/* Academic Year */}
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-2">Academic Year</label>
//               <div className="relative">
//                 <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="e.g. 2025-26"
//                   className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 active:scale-[0.98]"
//             >
//               {loading ? "Publishing Exam..." : "Publish Exam Schedule"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </AdminLayout>
//   )
// }

// export default AdminCreateExam






















// 3rd ui
import { useState } from "react"
import API from "../services/api"
import {
  FileText,
  BookOpen,
  Calendar,
  Layers,
  Plus,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Sparkles,
  X
} from "lucide-react"

const examTypes = [
  { value: "unit_test", label: "Unit Test", icon: "📝", desc: "Chapter wise test" },
  { value: "pt_1", label: "PT 1", icon: "📋", desc: "Periodic Test 1" },
  { value: "half_yearly", label: "Half Yearly", icon: "📖", desc: "Mid session exam" },
  { value: "pt_2", label: "PT 2", icon: "📋", desc: "Periodic Test 2" },
  { value: "annual", label: "Annual", icon: "🏆", desc: "Final year exam" },
  { value: "pre_board_1", label: "Pre-Board 1", icon: "🎯", desc: "Practice board exam 1" },
  { value: "pre_board_2", label: "Pre-Board 2", icon: "🎯", desc: "Practice board exam 2" },
]

function AdminCreateExam() {

  const [name, setName] = useState("")
  const [examType, setExamType] = useState("")
  const [year, setYear] = useState("")
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState(null)
  const [showTypeSelector, setShowTypeSelector] = useState(false)

  const showNotif = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const selectedType = examTypes.find(t => t.value === examType)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      showNotif("Exam name is required", "error")
      return
    }

    try {
      setSaving(true)
      await API.post("/exams", {
        name,
        exam_type: examType || null,
        academic_year: year
      })

      showNotif("Exam created successfully!")
      setName("")
      setExamType("")
      setYear("")
    } catch (err) {
      console.error(err)
      showNotif("Error creating exam", "error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-in { animation: slideIn 0.4s ease-out; }
        .animate-fade-up { animation: fadeUp 0.4s ease both; }
        .animate-scale-in { animation: scaleIn 0.2s ease both; }

        .type-card {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .type-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.12);
        }
        .type-card:active {
          transform: scale(0.97);
        }
        .type-card.selected {
          border-color: #6366f1;
          background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(99,102,241,0.1));
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
      `}</style>

      <div className="p-4 md:p-6 dm-sans min-h-screen">

        {/* Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3 
            px-4 py-3 rounded-xl shadow-2xl animate-slide-in max-w-[90vw]
            ${notification.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}
          >
            {notification.type === "error"
              ? <AlertCircle className="w-5 h-5 shrink-0" />
              : <CheckCircle className="w-5 h-5 shrink-0" />
            }
            <span className="font-medium text-sm">{notification.message}</span>
          </div>
        )}

        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-6 md:mb-8 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <GraduationCap className="text-white" size={22} />
                  </div>
                  Create Exam
                </h1>
                <p className="text-gray-400 text-sm mt-1 ml-14">
                  Set up a new examination for your school
                </p>
              </div>

              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full ml-14 sm:ml-0 w-fit">
                <Sparkles size={14} className="text-indigo-500" />
                <span className="text-xs font-semibold text-indigo-600">Quick Setup</span>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-fade-up" style={{ animationDelay: "0.1s" }}>

            {/* Card Header Gradient */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

            <div className="p-5 sm:p-7 md:p-8">

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* ✅ Exam Name */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                    <BookOpen size={13} className="text-indigo-500" />
                    Exam Name
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Mid Term Examination 2025"
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 pl-12 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-sm font-medium transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* ✅ Exam Type - Visual Selector */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                    <Layers size={13} className="text-violet-500" />
                    Exam Type
                  </label>

                  {/* Selected Type Display or Select Button */}
                  {selectedType ? (
                    <div className="flex items-center justify-between bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{selectedType.icon}</span>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{selectedType.label}</p>
                          <p className="text-xs text-gray-500">{selectedType.desc}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setExamType(""); setShowTypeSelector(true) }}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-red-50 transition"
                      >
                        <X size={14} className="text-gray-400" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowTypeSelector(!showTypeSelector)}
                      className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-3.5 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Plus size={16} /> Select Exam Type
                    </button>
                  )}

                  {/* Type Grid */}
                  {showTypeSelector && !selectedType && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 animate-scale-in">
                      {examTypes.map((type) => (
                        <div
                          key={type.value}
                          onClick={() => {
                            setExamType(type.value)
                            setShowTypeSelector(false)
                            if (!name) setName(type.label)
                          }}
                          className={`type-card border-2 rounded-2xl p-3 text-center
                            ${examType === type.value
                              ? "selected"
                              : "border-gray-100 bg-white hover:border-indigo-200"
                            }`}
                        >
                          <span className="text-2xl block mb-1.5">{type.icon}</span>
                          <p className="text-xs font-bold text-gray-800 leading-tight">{type.label}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{type.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ✅ Academic Year */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                    <Calendar size={13} className="text-amber-500" />
                    Academic Year
                  </label>
                  <div className="relative">
                    <select
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 pl-12 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-sm font-medium transition-all bg-white appearance-none"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Select Academic Year</option>
                      <option value="2024-25">2024 - 25</option>
                      <option value="2025-26">2025 - 26</option>
                      <option value="2026-27">2026 - 27</option>
                      <option value="2027-28">2027 - 28</option>
                    </select>
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* ✅ Live Preview */}
                {name && (
                  <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-5 border border-indigo-100 animate-scale-in">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-indigo-500" />
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Live Preview</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">Exam Name</span>
                        <span className="text-sm font-bold text-gray-800">{name}</span>
                      </div>

                      {selectedType && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">Type</span>
                          <span className="text-sm font-semibold text-indigo-600 flex items-center gap-1.5">
                            {selectedType.icon} {selectedType.label}
                          </span>
                        </div>
                      )}

                      {year && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">Academic Year</span>
                          <span className="text-sm font-semibold text-gray-700">{year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ✅ Submit Button */}
                <button
                  type="submit"
                  disabled={saving || !name.trim()}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-300 ${
                    saving || !name.trim()
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Exam...
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> Create Exam
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* ✅ Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
                <FileText size={14} /> After Creating
              </h3>
              <p className="text-xs text-indigo-700 mt-1.5 leading-5">
                Assign the exam to classes. Teachers can then enter marks for each student in their class.
              </p>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-sm font-bold text-violet-800 flex items-center gap-2">
                <GraduationCap size={14} /> Exam Types
              </h3>
              <p className="text-xs text-violet-700 mt-1.5 leading-5">
                Choose the right exam type to organize results properly. Students & parents can view marks by exam type.
              </p>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default AdminCreateExam