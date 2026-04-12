// import { useEffect, useState } from "react"
// import API from "../services/api"
// import jsPDF from "jspdf"
// import html2canvas from "html2canvas"

// function StudentMarks() {

//   const [results, setResults] = useState([])
//   const [finalResult, setFinalResult] = useState(null)

//   const fetchData = async () => {
//     const res1 = await API.get("/student/result")
//     const res2 = await API.get("/student/final-result")

//     setResults(res1.data)
//     setFinalResult(res2.data)
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   // 🔥 PDF DOWNLOAD
//   const downloadPDF = async () => {
//     const element = document.getElementById("result-card")

//     const canvas = await html2canvas(element)
//     const imgData = canvas.toDataURL("image/png")

//     const pdf = new jsPDF()
//     pdf.addImage(imgData, "PNG", 0, 0)
//     pdf.save("result.pdf")
//   }

//   return (

//     <div className="p-4 md:p-6">

//       <h1 className="text-2xl md:text-3xl font-bold mb-6">
//         📊 My Results
//       </h1>

//       {/* 🔥 FINAL RESULT CARD */}
//       {finalResult && (
//         <div
//           id="result-card"
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-8 shadow-lg"
//         >
//           <h2 className="text-xl font-bold mb-3">
//             🎓 Final Result
//           </h2>

//           <div className="grid md:grid-cols-3 gap-4">

//             <div>
//               <p className="text-sm">Average %</p>
//               <p className="text-2xl font-bold">
//                 {finalResult.avg_percentage}%
//               </p>
//             </div>

//             <div>
//               <p className="text-sm">Attendance</p>
//               <p className="text-2xl font-bold">
//                 {finalResult.attendance_percentage}%
//               </p>
//             </div>

//             <div>
//               <p className="text-sm">Final Score</p>
//               <p className="text-2xl font-bold">
//                 {finalResult.final_score}
//               </p>
//             </div>

//           </div>

//           {/* DOWNLOAD BUTTON */}
//           <button
//             onClick={downloadPDF}
//             className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
//           >
//             ⬇️ Download Result
//           </button>

//         </div>
//       )}

//       {/* 🔥 EXAM CARDS */}
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

//         {results.map((exam, index) => (

//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
//           >

//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold text-lg">
//                 {exam.exam_name}
//               </h2>

//               <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
//                 {exam.percentage}%
//               </span>
//             </div>

//             {/* SUBJECTS */}
//             <div className="space-y-2">

//               {exam.subjects.map((s, i) => (

//                 <div
//                   key={i}
//                   className="flex justify-between border-b pb-1"
//                 >
//                   <span className="text-gray-700">
//                     {s.subject}
//                   </span>

//                   <span className="font-semibold">
//                     {s.marks}/{s.max}
//                   </span>
//                 </div>

//               ))}

//             </div>

//             {/* TOTAL */}
//             <div className="mt-4 pt-3 border-t font-bold flex justify-between">
//               <span>Total</span>
//               <span>{exam.total}/{exam.max_total}</span>
//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   )
// }

// export default StudentMarks











import { useEffect, useState } from "react"
import API from "../services/api"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import BookLoader from "../components/BookLoader"

function StudentMarks() {

  const [results, setResults] = useState([])
  const [finalResult, setFinalResult] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res1 = await API.get("/student/result")
      const res2 = await API.get("/student/final-result")

      setResults(res1.data || [])
      setFinalResult(res2.data || null)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 🎨 percentage color
  const getColor = (p) => {
    if (p >= 75) return "bg-green-100 text-green-700"
    if (p >= 50) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  // 📄 PDF
  const downloadPDF = async () => {
    const element = document.getElementById("result-card")
    if (!element) return

    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF()
    pdf.addImage(imgData, "PNG", 0, 0)
    pdf.save("result.pdf")
  }

  // ⏳ Loading
  // if (loading) {
  //   return (
  //     <div className="p-6 text-center text-gray-500">
  //       Loading results...
  //     </div>
  //   )
  // }
  if (loading) return <BookLoader />

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        📊 My Results
      </h1>

      {/* 🎓 FINAL RESULT */}
      {finalResult && (
        <div
          id="result-card"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-8 shadow-lg"
        >

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Final Result</h2>

            <button
              onClick={downloadPDF}
              className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100"
            >
              ⬇️ Download
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-sm opacity-80">Average</p>
              <p className="text-2xl font-bold">
                {finalResult.avg_percentage}%
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-sm opacity-80">Attendance</p>
              <p className="text-2xl font-bold">
                {finalResult.attendance_percentage}%
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-sm opacity-80">Final Score</p>
              <p className="text-2xl font-bold">
                {finalResult.final_score}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 📊 EXAMS */}
      {results.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No results available
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {results.map((exam, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="font-semibold text-lg">
                  {exam.exam_name}
                </h2>

                <span className={`px-3 py-1 rounded-full text-sm ${getColor(exam.percentage)}`}>
                  {exam.percentage}%
                </span>

              </div>

              {/* SUBJECTS */}
              <div className="space-y-2">

                {exam.subjects?.map((s, i) => (

                  <div
                    key={i}
                    className="flex justify-between items-center border-b pb-1"
                  >

                    <span className="text-gray-700 text-sm md:text-base">
                      {s.subject}
                    </span>

                    <span className="font-semibold text-sm md:text-base">
                      {s.marks}/{s.max}
                    </span>

                  </div>

                ))}

              </div>

              {/* TOTAL */}
              <div className="mt-4 pt-3 border-t flex justify-between font-bold">

                <span>Total</span>
                <span>{exam.total}/{exam.max_total}</span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  )
}

export default StudentMarks