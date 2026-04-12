// import { useEffect, useState } from "react"
// import API from "../services/api"

// function StudentFees() {
//   const [fees, setFees] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedFee, setSelectedFee] = useState(null)
//   const [payAmount, setPayAmount] = useState("")
//   const [paymentMethod, setPaymentMethod] = useState("UPI")
//   const [paying, setPaying] = useState(false)

//   useEffect(() => {
//     fetchFees()
//   }, [])

//   const fetchFees = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/fees/student/my-fees")
//       console.log("my fees =>", res.data)
//       setFees(res.data || [])
//     } catch (err) {
//       console.error(err)
//       setFees([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const openPayModal = (fee) => {
//     setSelectedFee(fee)
//     setPayAmount(fee.remaining_amount)
//     setPaymentMethod("UPI")
//   }

//   const closePayModal = () => {
//     setSelectedFee(null)
//     setPayAmount("")
//     setPaymentMethod("UPI")
//   }

// const handlePay = async () => {
//   try {
//     setPaying(true)

//     // 1. create order from backend
//     const orderRes = await API.post("/fees/student/create-order", {
//       fee_id: selectedFee.fee_id,
//       amount: Number(payAmount)
//     })

//     const { order, key, student_name, month, amount } = orderRes.data

//     const options = {
//       key,
//       amount: order.amount,
//       currency: order.currency,
//       name: "SDJPS School",
//       description: `${month} Fee Payment`,
//       order_id: order.id,
//       handler: async function (response) {
//         try {
//           // 2. verify payment on backend
//           await API.post("/fees/student/verify-payment", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             fee_id: selectedFee.fee_id,
//             amount: Number(payAmount),
//             payment_method: "online"
//           })

//           alert(`Payment successful for ${month}`)
//           closePayModal()
//           fetchFees()
//         } catch (err) {
//           alert(err?.response?.data?.message || "Payment verification failed")
//         }
//       },
//       prefill: {
//         name: student_name
//       },
//       theme: {
//         color: "#4F46E5"
//       },
//       modal: {
//         ondismiss: function () {
//           setPaying(false)
//         }
//       }
//     }

//     const rzp = new window.Razorpay(options)
//     rzp.open()

//   } catch (err) {
//     alert(err?.response?.data?.message || "Unable to start payment")
//   } finally {
//     setPaying(false)
//   }
// }

//   const totalFee = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0)
//   const totalPaid = fees.reduce((sum, fee) => sum + Number(fee.paid_amount || 0), 0)
//   const totalPending = fees.reduce((sum, fee) => sum + Number(fee.remaining_amount || 0), 0)

//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="flex justify-center items-center min-h-[60vh]">
//           <p className="text-lg text-gray-500">Loading fees...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 md:p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//           💳 My Fees
//         </h1>
//         <p className="text-gray-500 mt-1">
//           View and pay your monthly school fees
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//           <p className="text-sm text-gray-500">Total Fee</p>
//           <h2 className="text-2xl font-bold text-indigo-600">₹{totalFee}</h2>
//         </div>
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//           <p className="text-sm text-gray-500">Paid</p>
//           <h2 className="text-2xl font-bold text-green-600">₹{totalPaid}</h2>
//         </div>
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//           <p className="text-sm text-gray-500">Pending</p>
//           <h2 className="text-2xl font-bold text-red-500">₹{totalPending}</h2>
//         </div>
//       </div>

//       {/* Month Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//         {fees.map((fee, index) => (
//           <div
//             key={index}
//             className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
//               fee.status === "paid"
//                 ? "bg-green-50 border-green-200"
//                 : fee.status === "partial"
//                 ? "bg-yellow-50 border-yellow-200"
//                 : fee.status === "pending"
//                 ? "bg-white border-gray-200"
//                 : "bg-gray-50 border-gray-200"
//             }`}
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h2 className="text-xl font-bold text-indigo-700">{fee.month}</h2>
//                 <p className="text-sm text-gray-500">
//                   Due: {fee.due_date || "Not assigned"}
//                 </p>
//               </div>

//               {fee.status === "paid" && (
//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
//                   Paid
//                 </span>
//               )}
//               {fee.status === "partial" && (
//                 <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
//                   Partial
//                 </span>
//               )}
//               {fee.status === "pending" && (
//                 <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
//                   Pending
//                 </span>
//               )}
//               {fee.status === "no_fee" && (
//                 <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
//                   No Fee
//                 </span>
//               )}
//             </div>

//             <div className="space-y-2 text-sm mb-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Amount</span>
//                 <span className="font-semibold">₹{fee.amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Paid</span>
//                 <span className="font-semibold text-green-600">₹{fee.paid_amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Remaining</span>
//                 <span className="font-semibold text-red-500">₹{fee.remaining_amount}</span>
//               </div>
//             </div>

//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//               <div
//                 className={`h-2.5 rounded-full ${
//                   fee.status === "paid"
//                     ? "bg-green-500"
//                     : fee.status === "partial"
//                     ? "bg-yellow-500"
//                     : fee.status === "pending"
//                     ? "bg-red-400"
//                     : "bg-gray-300"
//                 }`}
//                 style={{
//                   width: `${fee.amount > 0 ? (fee.paid_amount / fee.amount) * 100 : 0}%`
//                 }}
//               ></div>
//             </div>

//             {fee.status === "pending" || fee.status === "partial" ? (
//               <button
//                 onClick={() => openPayModal(fee)}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition"
//               >
//                 Pay Now
//               </button>
//             ) : fee.status === "paid" ? (
//               <button
//                 disabled
//                 className="w-full bg-green-100 text-green-700 py-2.5 rounded-xl font-medium"
//               >
//                 Already Paid
//               </button>
//             ) : (
//               <button
//                 disabled
//                 className="w-full bg-gray-200 text-gray-500 py-2.5 rounded-xl font-medium"
//               >
//                 Not Available
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Payment Modal */}
//       {selectedFee && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-1">
//               Pay {selectedFee.month} Fee
//             </h2>
//             <p className="text-sm text-gray-500 mb-5">
//               Remaining amount: ₹{selectedFee.remaining_amount}
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">
//                   Amount
//                 </label>
//                 <input
//                   type="number"
//                   value={payAmount}
//                   onChange={(e) => setPayAmount(e.target.value)}
//                   max={selectedFee.remaining_amount}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">
//                   Payment Method
//                 </label>
//                 <select
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none"
//                 >
//                   <option value="UPI">UPI</option>
//                   <option value="Card">Card</option>
//                   <option value="Net Banking">Net Banking</option>
//                   <option value="Cash">Cash</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button
//                   onClick={closePayModal}
//                   className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handlePay}
//                   disabled={paying}
//                   className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium"
//                 >
//                   {paying ? "Processing..." : "Confirm Pay"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default StudentFees





















// import { useEffect, useState } from "react"
// import API from "../services/api"
// import BookLoader from "../components/BookLoader"
// import {
//   CreditCard,
//   IndianRupee,
//   CheckCircle2,
//   AlertCircle,
//   Wallet,
//   X
// } from "lucide-react"

// function StudentFees() {
//   const [fees, setFees] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedFee, setSelectedFee] = useState(null)
//   const [payAmount, setPayAmount] = useState("")
//   const [paymentMethod, setPaymentMethod] = useState("UPI")
//   const [paying, setPaying] = useState(false)

//   useEffect(() => {
//     fetchFees()
//   }, [])

//   const fetchFees = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/fees/student/my-fees")
//       setFees(res.data || [])
//     } catch (err) {
//       console.error(err)
//       setFees([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const openPayModal = (fee) => {
//     setSelectedFee(fee)
//     setPayAmount(fee.remaining_amount)
//     setPaymentMethod("UPI")
//   }

//   const closePayModal = () => {
//     setSelectedFee(null)
//     setPayAmount("")
//     setPaymentMethod("UPI")
//   }

//   const handlePay = async () => {
//     try {
//       setPaying(true)

//       const orderRes = await API.post("/fees/student/create-order", {
//         fee_id: selectedFee.fee_id,
//         amount: Number(payAmount)
//       })

//       const { order, key, student_name, month } = orderRes.data

//       const options = {
//         key,
//         amount: order.amount,
//         currency: order.currency,
//         name: "SDJPS School",
//         description: `${month} Fee Payment`,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await API.post("/fees/student/verify-payment", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               fee_id: selectedFee.fee_id,
//               amount: Number(payAmount),
//               payment_method: "online"
//             })

//             alert(`Payment successful for ${month}`)
//             closePayModal()
//             fetchFees()
//           } catch (err) {
//             alert(err?.response?.data?.message || "Payment verification failed")
//           }
//         },
//         prefill: {
//           name: student_name
//         },
//         theme: {
//           color: "#4F46E5"
//         },
//         modal: {
//           ondismiss: function () {
//             setPaying(false)
//           }
//         }
//       }

//       const rzp = new window.Razorpay(options)
//       rzp.open()

//     } catch (err) {
//       alert(err?.response?.data?.message || "Unable to start payment")
//     } finally {
//       setPaying(false)
//     }
//   }

//   const totalFee = fees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0)
//   const totalPaid = fees.reduce((sum, fee) => sum + Number(fee.paid_amount || 0), 0)
//   const totalPending = fees.reduce((sum, fee) => sum + Number(fee.remaining_amount || 0), 0)

//   // ✅ LOADER
//   if (loading) return <BookLoader />

//   return (
//     <div className="p-4 md:p-6">

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
//           <CreditCard className="text-indigo-600" size={30} />
//           My Fees
//         </h1>
//         <p className="text-gray-500 mt-1">
//           View and pay your monthly school fees
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
//           <div className="bg-indigo-100 p-3 rounded-xl">
//             <IndianRupee className="text-indigo-600" size={24} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Fee</p>
//             <h2 className="text-2xl font-bold text-indigo-600">₹{totalFee}</h2>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
//           <div className="bg-green-100 p-3 rounded-xl">
//             <CheckCircle2 className="text-green-600" size={24} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Paid</p>
//             <h2 className="text-2xl font-bold text-green-600">₹{totalPaid}</h2>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
//           <div className="bg-red-100 p-3 rounded-xl">
//             <AlertCircle className="text-red-500" size={24} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Pending</p>
//             <h2 className="text-2xl font-bold text-red-500">₹{totalPending}</h2>
//           </div>
//         </div>

//       </div>

//       {/* Month Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//         {fees.map((fee, index) => (
//           <div
//             key={index}
//             className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
//               fee.status === "paid"
//                 ? "bg-green-50 border-green-200"
//                 : fee.status === "partial"
//                 ? "bg-yellow-50 border-yellow-200"
//                 : fee.status === "pending"
//                 ? "bg-white border-gray-200"
//                 : "bg-gray-50 border-gray-200"
//             }`}
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h2 className="text-xl font-bold text-indigo-700">{fee.month}</h2>
//                 <p className="text-sm text-gray-500">
//                   Due: {fee.due_date || "Not assigned"}
//                 </p>
//               </div>

//               {fee.status === "paid" && (
//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                   <CheckCircle2 size={12} /> Paid
//                 </span>
//               )}
//               {fee.status === "partial" && (
//                 <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                   <AlertCircle size={12} /> Partial
//                 </span>
//               )}
//               {fee.status === "pending" && (
//                 <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                   <AlertCircle size={12} /> Pending
//                 </span>
//               )}
//               {fee.status === "no_fee" && (
//                 <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
//                   No Fee
//                 </span>
//               )}
//             </div>

//             <div className="space-y-2 text-sm mb-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Amount</span>
//                 <span className="font-semibold">₹{fee.amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Paid</span>
//                 <span className="font-semibold text-green-600">₹{fee.paid_amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Remaining</span>
//                 <span className="font-semibold text-red-500">₹{fee.remaining_amount}</span>
//               </div>
//             </div>

//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//               <div
//                 className={`h-2.5 rounded-full transition-all duration-500 ${
//                   fee.status === "paid"
//                     ? "bg-green-500"
//                     : fee.status === "partial"
//                     ? "bg-yellow-500"
//                     : fee.status === "pending"
//                     ? "bg-red-400"
//                     : "bg-gray-300"
//                 }`}
//                 style={{
//                   width: `${fee.amount > 0 ? (fee.paid_amount / fee.amount) * 100 : 0}%`
//                 }}
//               />
//             </div>

//             {fee.status === "pending" || fee.status === "partial" ? (
//               <button
//                 onClick={() => openPayModal(fee)}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
//               >
//                 <Wallet size={16} /> Pay Now
//               </button>
//             ) : fee.status === "paid" ? (
//               <button
//                 disabled
//                 className="w-full bg-green-100 text-green-700 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2"
//               >
//                 <CheckCircle2 size={16} /> Already Paid
//               </button>
//             ) : (
//               <button
//                 disabled
//                 className="w-full bg-gray-200 text-gray-500 py-2.5 rounded-xl font-medium"
//               >
//                 Not Available
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Payment Modal */}
//       {selectedFee && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

//             {/* Close Button */}
//             <button
//               onClick={closePayModal}
//               className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <X size={16} className="text-gray-500" />
//             </button>

//             <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
//               <CreditCard size={20} className="text-indigo-600" />
//               Pay {selectedFee.month} Fee
//             </h2>
//             <p className="text-sm text-gray-500 mb-5">
//               Remaining amount: ₹{selectedFee.remaining_amount}
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">
//                   Amount
//                 </label>
//                 <input
//                   type="number"
//                   value={payAmount}
//                   onChange={(e) => setPayAmount(e.target.value)}
//                   max={selectedFee.remaining_amount}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">
//                   Payment Method
//                 </label>
//                 <select
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
//                 >
//                   <option value="UPI">UPI</option>
//                   <option value="Card">Card</option>
//                   <option value="Net Banking">Net Banking</option>
//                   <option value="Cash">Cash</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button
//                   onClick={closePayModal}
//                   className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handlePay}
//                   disabled={paying}
//                   className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
//                 >
//                   {paying ? (
//                     "Processing..."
//                   ) : (
//                     <>
//                       <Wallet size={16} /> Confirm Pay
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default StudentFees



// import { useEffect, useState } from "react"
// import API from "../services/api"
// import BookLoader from "../components/BookLoader"
// import {
//   CreditCard,
//   IndianRupee,
//   CheckCircle2,
//   AlertCircle,
//   Wallet,
//   X,
//   Download,
//   FileText
// } from "lucide-react"

// function StudentFees() {
//   const [fees, setFees]               = useState([])
//   const [loading, setLoading]         = useState(true)
//   const [selectedFee, setSelectedFee] = useState(null)
//   const [payAmount, setPayAmount]     = useState("")
//   const [paymentMethod, setPaymentMethod] = useState("UPI")
//   const [paying, setPaying]           = useState(false)
//   const [downloading, setDownloading] = useState(null) // stores payment_id being downloaded

//   useEffect(() => {
//     fetchFees()
//   }, [])

//   const fetchFees = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/fees/student/my-fees")
//       setFees(res.data || [])
//     } catch (err) {
//       console.error(err)
//       setFees([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const openPayModal = (fee) => {
//     setSelectedFee(fee)
//     setPayAmount(fee.remaining_amount)
//     setPaymentMethod("UPI")
//   }

//   const closePayModal = () => {
//     setSelectedFee(null)
//     setPayAmount("")
//     setPaymentMethod("UPI")
//   }

//   // ✅ Receipt Download Handler
//   const handleDownloadReceipt = async (paymentId, month) => {
//     try {
//       setDownloading(paymentId)

//       const res = await API.get(`/fees/receipt/${paymentId}`, {
//         responseType: "blob"
//       })

//       const url  = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }))
//       const link = document.createElement("a")
//       link.href     = url
//       link.download = `Fee_Receipt_${month}.pdf`
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//       URL.revokeObjectURL(url)

//     } catch (err) {
//       console.error("Receipt download failed:", err)
//       alert("Could not download receipt. Please try again.")
//     } finally {
//       setDownloading(null)
//     }
//   }

//   const handlePay = async () => {
//     try {
//       setPaying(true)

//       const orderRes = await API.post("/fees/student/create-order", {
//         fee_id: selectedFee.fee_id,
//         amount: Number(payAmount)
//       })

//       const { order, key, student_name, month } = orderRes.data

//       const options = {
//         key,
//         amount:      order.amount,
//         currency:    order.currency,
//         name:        "SDJPS School",
//         description: `${month} Fee Payment`,
//         order_id:    order.id,
//         handler: async function (response) {
//           try {
//             await API.post("/fees/student/verify-payment", {
//               razorpay_order_id:   response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature:  response.razorpay_signature,
//               fee_id:              selectedFee.fee_id,
//               amount:              Number(payAmount),
//               payment_method:      "online"
//             })

//             alert(`Payment successful for ${month}`)
//             closePayModal()
//             fetchFees()
//           } catch (err) {
//             alert(err?.response?.data?.message || "Payment verification failed")
//           }
//         },
//         prefill: { name: student_name },
//         theme:   { color: "#4F46E5" },
//         modal: {
//           ondismiss: function () {
//             setPaying(false)
//           }
//         }
//       }

//       const rzp = new window.Razorpay(options)
//       rzp.open()

//     } catch (err) {
//       alert(err?.response?.data?.message || "Unable to start payment")
//     } finally {
//       setPaying(false)
//     }
//   }

//   const totalFee     = fees.reduce((sum, fee) => sum + Number(fee.amount           || 0), 0)
//   const totalPaid    = fees.reduce((sum, fee) => sum + Number(fee.paid_amount      || 0), 0)
//   const totalPending = fees.reduce((sum, fee) => sum + Number(fee.remaining_amount || 0), 0)

//   if (loading) return <BookLoader />

//   return (
//     <div className="p-4 md:p-6">

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
//           <CreditCard className="text-indigo-600" size={30} />
//           My Fees
//         </h1>
//         <p className="text-gray-500 mt-1">
//           View and pay your monthly school fees
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
//           <div className="bg-indigo-100 p-3 rounded-xl">
//             <IndianRupee className="text-indigo-600" size={24} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Fee</p>
//             <h2 className="text-2xl font-bold text-indigo-600">₹{totalFee}</h2>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
//           <div className="bg-green-100 p-3 rounded-xl">
//             <CheckCircle2 className="text-green-600" size={24} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Paid</p>
//             <h2 className="text-2xl font-bold text-green-600">₹{totalPaid}</h2>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
//           <div className="bg-red-100 p-3 rounded-xl">
//             <AlertCircle className="text-red-500" size={24} />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Pending</p>
//             <h2 className="text-2xl font-bold text-red-500">₹{totalPending}</h2>
//           </div>
//         </div>

//       </div>

//       {/* Month Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//         {fees.map((fee, index) => (
//           <div
//             key={index}
//             className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
//               fee.status === "paid"
//                 ? "bg-green-50 border-green-200"
//                 : fee.status === "partial"
//                 ? "bg-yellow-50 border-yellow-200"
//                 : fee.status === "pending"
//                 ? "bg-white border-gray-200"
//                 : "bg-gray-50 border-gray-200"
//             }`}
//           >
//             {/* Card Header */}
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h2 className="text-xl font-bold text-indigo-700">{fee.month}</h2>
//                 <p className="text-sm text-gray-500">
//                   Due: {fee.due_date || "Not assigned"}
//                 </p>
//               </div>

//               {fee.status === "paid" && (
//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                   <CheckCircle2 size={12} /> Paid
//                 </span>
//               )}
//               {fee.status === "partial" && (
//                 <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                   <AlertCircle size={12} /> Partial
//                 </span>
//               )}
//               {fee.status === "pending" && (
//                 <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                   <AlertCircle size={12} /> Pending
//                 </span>
//               )}
//               {fee.status === "no_fee" && (
//                 <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
//                   No Fee
//                 </span>
//               )}
//             </div>

//             {/* Amount Details */}
//             <div className="space-y-2 text-sm mb-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Amount</span>
//                 <span className="font-semibold">₹{fee.amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Paid</span>
//                 <span className="font-semibold text-green-600">₹{fee.paid_amount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Remaining</span>
//                 <span className="font-semibold text-red-500">₹{fee.remaining_amount}</span>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//               <div
//                 className={`h-2.5 rounded-full transition-all duration-500 ${
//                   fee.status === "paid"
//                     ? "bg-green-500"
//                     : fee.status === "partial"
//                     ? "bg-yellow-500"
//                     : fee.status === "pending"
//                     ? "bg-red-400"
//                     : "bg-gray-300"
//                 }`}
//                 style={{
//                   width: `${fee.amount > 0 ? (fee.paid_amount / fee.amount) * 100 : 0}%`
//                 }}
//               />
//             </div>

//             {/* ── Action Buttons ── */}

//             {/* PENDING or PARTIAL → Pay Now */}
//             {(fee.status === "pending" || fee.status === "partial") && (
//               <button
//                 onClick={() => openPayModal(fee)}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
//               >
//                 <Wallet size={16} /> Pay Now
//               </button>
//             )}

//             {/* ✅ PAID → Download Receipt */}
//             {fee.status === "paid" && fee.payment_id && (
//               <button
//                 onClick={() => handleDownloadReceipt(fee.payment_id, fee.month)}
//                 disabled={downloading === fee.payment_id}
//                 className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
//               >
//                 {downloading === fee.payment_id ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Downloading...
//                   </>
//                 ) : (
//                   <>
//                     <Download size={16} /> Download Receipt
//                   </>
//                 )}
//               </button>
//             )}

//             {/* PAID but payment_id missing (old records) → show disabled */}
//             {fee.status === "paid" && !fee.payment_id && (
//               <button
//                 disabled
//                 className="w-full bg-green-100 text-green-700 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 cursor-not-allowed"
//               >
//                 <CheckCircle2 size={16} /> Already Paid
//               </button>
//             )}

//             {/* NO FEE → disabled */}
//             {fee.status === "no_fee" && (
//               <button
//                 disabled
//                 className="w-full bg-gray-200 text-gray-500 py-2.5 rounded-xl font-medium"
//               >
//                 Not Available
//               </button>
//             )}

//           </div>
//         ))}
//       </div>

//       {/* ── Payment Modal ── */}
//       {selectedFee && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

//             <button
//               onClick={closePayModal}
//               className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <X size={16} className="text-gray-500" />
//             </button>

//             <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
//               <CreditCard size={20} className="text-indigo-600" />
//               Pay {selectedFee.month} Fee
//             </h2>
//             <p className="text-sm text-gray-500 mb-5">
//               Remaining amount: ₹{selectedFee.remaining_amount}
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">
//                   Amount
//                 </label>
//                 <input
//                   type="number"
//                   value={payAmount}
//                   onChange={(e) => setPayAmount(e.target.value)}
//                   max={selectedFee.remaining_amount}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700 block mb-1">
//                   Payment Method
//                 </label>
//                 <select
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
//                 >
//                   <option value="UPI">UPI</option>
//                   <option value="Card">Card</option>
//                   <option value="Net Banking">Net Banking</option>
//                   <option value="Cash">Cash</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button
//                   onClick={closePayModal}
//                   className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handlePay}
//                   disabled={paying}
//                   className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
//                 >
//                   {paying ? (
//                     "Processing..."
//                   ) : (
//                     <>
//                       <Wallet size={16} /> Confirm Pay
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

// export default StudentFees










import { useEffect, useState } from "react"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import {
  CreditCard,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Wallet,
  X,
  Download,
  FileText
} from "lucide-react"

function StudentFees() {
  const [fees, setFees]               = useState([])
  const [loading, setLoading]         = useState(true)
  const [selectedFee, setSelectedFee] = useState(null)
  const [payAmount, setPayAmount]     = useState("")
  const [paymentMethod, setPaymentMethod] = useState("UPI")
  const [paying, setPaying]           = useState(false)
  const [downloading, setDownloading] = useState(null) // stores fee_id being downloaded

  useEffect(() => {
    fetchFees()
  }, [])

  const fetchFees = async () => {
    try {
      setLoading(true)
      const res = await API.get("/fees/student/my-fees")
      setFees(res.data || [])
    } catch (err) {
      console.error(err)
      setFees([])
    } finally {
      setLoading(false)
    }
  }

  const openPayModal = (fee) => {
    setSelectedFee(fee)
    setPayAmount(fee.remaining_amount)
    setPaymentMethod("UPI")
  }

  const closePayModal = () => {
    setSelectedFee(null)
    setPayAmount("")
    setPaymentMethod("UPI")
  }

  // ✅ Receipt Download Handler (FIXED)
  const handleDownloadReceipt = async (feeId, month) => {
    try {
      setDownloading(feeId)

      // ✅ Backend ko fee_id bhejo (route param as payment_id but actually fee_id)
      const res = await API.get(`/fees/receipt/${feeId}`, {
        responseType: "blob"
      })

      const url  = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }))
      const link = document.createElement("a")
      link.href     = url
      link.download = `Fee_Receipt_${month}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

    } catch (err) {
      console.error("Receipt download failed:", err)
      alert("Could not download receipt. Please try again.")
    } finally {
      setDownloading(null)
    }
  }

  const handlePay = async () => {
    try {
      setPaying(true)

      const orderRes = await API.post("/fees/student/create-order", {
        fee_id: selectedFee.fee_id,
        amount: Number(payAmount)
      })

      const { order, key, student_name, month } = orderRes.data

      const options = {
        key,
        amount:      order.amount,
        currency:    order.currency,
        name:        "SDJPS School",
        description: `${month} Fee Payment`,
        order_id:    order.id,
        handler: async function (response) {
          try {
            await API.post("/fees/student/verify-payment", {
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              fee_id:              selectedFee.fee_id,
              amount:              Number(payAmount),
              payment_method:      "online"
            })

            alert(`Payment successful for ${month}`)
            closePayModal()
            fetchFees()
          } catch (err) {
            alert(err?.response?.data?.message || "Payment verification failed")
          }
        },
        prefill: { name: student_name },
        theme:   { color: "#4F46E5" },
        modal: {
          ondismiss: function () {
            setPaying(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (err) {
      alert(err?.response?.data?.message || "Unable to start payment")
    } finally {
      setPaying(false)
    }
  }

  const totalFee     = fees.reduce((sum, fee) => sum + Number(fee.amount           || 0), 0)
  const totalPaid    = fees.reduce((sum, fee) => sum + Number(fee.paid_amount      || 0), 0)
  const totalPending = fees.reduce((sum, fee) => sum + Number(fee.remaining_amount || 0), 0)

  if (loading) return <BookLoader />

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <CreditCard className="text-indigo-600" size={30} />
          My Fees
        </h1>
        <p className="text-gray-500 mt-1">
          View and pay your monthly school fees
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl">
            <IndianRupee className="text-indigo-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Fee</p>
            <h2 className="text-2xl font-bold text-indigo-600">₹{totalFee}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <CheckCircle2 className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Paid</p>
            <h2 className="text-2xl font-bold text-green-600">₹{totalPaid}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-xl">
            <AlertCircle className="text-red-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-2xl font-bold text-red-500">₹{totalPending}</h2>
          </div>
        </div>

      </div>

      {/* Month Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {fees.map((fee, index) => (
          <div
            key={index}
            className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
              fee.status === "paid"
                ? "bg-green-50 border-green-200"
                : fee.status === "partial"
                ? "bg-yellow-50 border-yellow-200"
                : fee.status === "pending"
                ? "bg-white border-gray-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-indigo-700">{fee.month}</h2>
                <p className="text-sm text-gray-500">
                  Due: {fee.due_date || "Not assigned"}
                </p>
              </div>

              {fee.status === "paid" && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Paid
                </span>
              )}
              {fee.status === "partial" && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <AlertCircle size={12} /> Partial
                </span>
              )}
              {fee.status === "pending" && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <AlertCircle size={12} /> Pending
                </span>
              )}
              {fee.status === "no_fee" && (
                <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                  No Fee
                </span>
              )}
            </div>

            {/* Amount Details */}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold">₹{fee.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Paid</span>
                <span className="font-semibold text-green-600">₹{fee.paid_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Remaining</span>
                <span className="font-semibold text-red-500">₹{fee.remaining_amount}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  fee.status === "paid"
                    ? "bg-green-500"
                    : fee.status === "partial"
                    ? "bg-yellow-500"
                    : fee.status === "pending"
                    ? "bg-red-400"
                    : "bg-gray-300"
                }`}
                style={{
                  width: `${fee.amount > 0 ? (fee.paid_amount / fee.amount) * 100 : 0}%`
                }}
              />
            </div>

            {/* ── Action Buttons ── */}

            {/* PENDING or PARTIAL → Pay Now */}
            {(fee.status === "pending" || fee.status === "partial") && (
              <button
                onClick={() => openPayModal(fee)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
              >
                <Wallet size={16} /> Pay Now
              </button>
            )}

            {/* ✅ PAID → Download Receipt (FIXED) */}
            {fee.status === "paid" && fee.fee_id && (
              <button
                onClick={() => handleDownloadReceipt(fee.fee_id, fee.month)}
                disabled={downloading === fee.fee_id}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
              >
                {downloading === fee.fee_id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} /> Download Receipt
                  </>
                )}
              </button>
            )}

            {/* PAID but fee_id missing (old records) → show disabled */}
            {fee.status === "paid" && !fee.fee_id && (
              <button
                disabled
                className="w-full bg-green-100 text-green-700 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <CheckCircle2 size={16} /> Already Paid
              </button>
            )}

            {/* NO FEE → disabled */}
            {fee.status === "no_fee" && (
              <button
                disabled
                className="w-full bg-gray-200 text-gray-500 py-2.5 rounded-xl font-medium"
              >
                Not Available
              </button>
            )}

          </div>
        ))}
      </div>

      {/* ── Payment Modal ── */}
      {selectedFee && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

            <button
              onClick={closePayModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <X size={16} className="text-gray-500" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
              <CreditCard size={20} className="text-indigo-600" />
              Pay {selectedFee.month} Fee
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Remaining amount: ₹{selectedFee.remaining_amount}
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  max={selectedFee.remaining_amount}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={closePayModal}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
                >
                  {paying ? (
                    "Processing..."
                  ) : (
                    <>
                      <Wallet size={16} /> Confirm Pay
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default StudentFees