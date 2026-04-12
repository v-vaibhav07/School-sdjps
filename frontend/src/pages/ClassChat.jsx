// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassChat() {

//   const { id } = useParams()

//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")

//   const fetchMessages = async () => {

//     try {

//       const res = await API.get(`/chat/class/${id}`)
//       setMessages(res.data)

//     } catch (error) {

//       console.log("Error fetching chat", error)

//     }

//   }

//   useEffect(() => {

//     fetchMessages()

//     const interval = setInterval(() => {
//       fetchMessages()
//     }, 3000)

//     return () => clearInterval(interval)

//   }, [])

//   const sendMessage = async () => {

//     if (!message) return

//     try {

//       await API.post("/chat/send", {
//         class_id: id,
//         message: message
//       })

//       setMessage("")
//       fetchMessages()

//     } catch (error) {

//       console.log("Error sending message", error)

//     }

//   }

//   return (

//     <div>

//       <h1 className="text-3xl font-bold mb-6">
//         Class Chat
//       </h1>

//       {/* CHAT BOX */}

//       <div className="bg-white rounded shadow p-4 h-[400px] overflow-y-auto mb-4">

//         {messages.map((msg, index) => (

//           <div key={index} className="mb-3">

//             <p className="font-semibold">
//               {msg.users?.full_name} ({msg.sender_role})
//             </p>

//             <p>
//               {msg.message}
//             </p>

//             <p className="text-xs text-gray-500">
//               {new Date(msg.created_at).toLocaleTimeString()}
//             </p>

//           </div>

//         ))}

//       </div>


//       {/* SEND MESSAGE */}

//       <div className="flex gap-2">

//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Type message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>

//       </div>

//     </div>

//   )

// }

// export default ClassChat


//ye pure niche wale se replace ho raha h

// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassChat() {

//   const { id } = useParams()

//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")

//   const fetchMessages = async () => {

//     const res = await API.get(`/chat/class/${id}`)
//     setMessages(res.data)

//   }

//   useEffect(() => {

//     fetchMessages()

//     const interval = setInterval(() => {
//       fetchMessages()
//     }, 2000)

//     return () => clearInterval(interval)

//   }, [])

//   const sendMessage = async () => {

//     if (!message) return

//     await API.post("/chat/send", {
//       class_id: id,
//       message
//     })

//     setMessage("")
//     fetchMessages()

//   }

//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Class Chat
//       </h1>

//       <div className="bg-gray-100 rounded p-4 h-[450px] overflow-y-auto mb-4">

//         {messages.map((msg, index) => (

//           <div
//             key={index}
//             className="mb-3 bg-white p-3 rounded shadow"
//           >

//             <p className="font-semibold text-blue-600">
//               {msg.users?.full_name}
//             </p>

//             <p>{msg.message}</p>

//             <p className="text-xs text-gray-500">
//               {new Date(msg.created_at).toLocaleTimeString()}
//             </p>

//           </div>

//         ))}

//       </div>

//       <div className="flex gap-2">

//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Type message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>

//       </div>

//     </div>

//   )

// }

// export default ClassChat






















// import { useEffect, useState, useRef } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"
// import supabase from "../services/supabase"

// function ClassChat() {

//   const { id } = useParams()

//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")
//   const bottomRef = useRef(null)

//   // 🔥 FETCH
//   const fetchMessages = async () => {
//     try {
//       const res = await API.get(`/chat/class/${id}`)
//       setMessages(res.data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // 🔥 REALTIME
//   useEffect(() => {

//     fetchMessages()

//     const channel = supabase
//       .channel("class-chat")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "class_messages",
//           filter: `class_id=eq.${id}`
//         },
//         (payload) => {
//           setMessages(prev => [...prev, payload.new])
//         }
//       )
//       .subscribe()

//     return () => {
//       supabase.removeChannel(channel)
//     }

//   }, [id])

//   // 🔥 AUTO SCROLL
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   // 🔥 SEND
//   const sendMessage = async () => {

//     if (!message.trim()) return

//     await API.post("/chat/send", {
//       class_id: id,
//       message
//     })

//     setMessage("")
//   }

//   return (

//     <div className="p-6 max-w-3xl mx-auto">

//       <h1 className="text-3xl font-bold mb-6">
//         💬 Class Chat
//       </h1>

//       {/* CHAT BOX */}
//       <div className="bg-gray-100 rounded-xl p-4 h-[500px] overflow-y-auto mb-4 space-y-3">

//         {messages.map((msg) => (

//           <div key={msg.id} className="bg-white p-3 rounded-xl shadow-sm">

//             <p className={`font-semibold text-sm
//               ${msg.sender_role === "admin" ? "text-red-600" :
//                 msg.sender_role === "teacher" ? "text-green-600" :
//                 "text-blue-600"}
//             `}>
//               {msg.users?.full_name || "User"} ({msg.sender_role})
//             </p>

//             <p className="text-gray-800 mt-1">
//               {msg.message}
//             </p>

//             <p className="text-xs text-gray-400 mt-1 text-right">
//               {new Date(msg.created_at).toLocaleTimeString()}
//             </p>

//           </div>

//         ))}

//         <div ref={bottomRef}></div>

//       </div>

//       {/* INPUT */}
//       <div className="flex gap-2">

//         <input
//           className="border p-3 w-full rounded-lg"
//           placeholder="Type message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />

//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
//         >
//           Send
//         </button>

//       </div>

//     </div>
//   )
// }

// export default ClassChat 

// ye uper working code h 












import { useEffect, useState, useRef } from "react"
import API from "../services/api"
import supabase from "../services/supabase"

function ClassChat() {

  // ✅ GET USER + CLASS ID
  const user = JSON.parse(localStorage.getItem("user"))
  const class_id = user?.class_id

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const bottomRef = useRef(null)

  // 🔥 FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await API.get(`/chat/class/${class_id}`)
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 REALTIME SUBSCRIBE
  useEffect(() => {

    if (!class_id) return

    fetchMessages()

    const channel = supabase
      .channel("class-chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "class_messages",
          filter: `class_id=eq.${class_id}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [class_id])

  // 🔥 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 🔥 SEND MESSAGE
  const sendMessage = async () => {

    if (!message.trim()) return

    try {
      await API.post("/chat/send", {
        class_id,
        message
      })

      setMessage("")
    } catch (err) {
      console.log(err)
    }
  }

  // ❌ NO CLASS CASE
  if (!class_id) {
    return (
      <div className="p-6 text-center text-red-500">
        No class assigned
      </div>
    )
  }

  return (

    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        💬 Class Chat
      </h1>

      {/* CHAT BOX */}
      <div className="bg-gray-100 rounded-xl p-4 h-[500px] overflow-y-auto mb-4 space-y-3">

        {messages.map((msg) => (

          <div key={msg.id} className="bg-white p-3 rounded-xl shadow-sm">

            <p className={`font-semibold text-sm
              ${msg.sender_role === "admin" ? "text-red-600" :
                msg.sender_role === "teacher" ? "text-green-600" :
                "text-blue-600"}
            `}>
              {msg.users?.full_name || "User"} ({msg.sender_role})
            </p>

            <p className="text-gray-800 mt-1">
              {msg.message}
            </p>

            <p className="text-xs text-gray-400 mt-1 text-right">
              {new Date(msg.created_at).toLocaleTimeString()}
            </p>

          </div>

        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* INPUT */}
      <div className="flex gap-2">

        <input
          className="border p-3 w-full rounded-lg"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default ClassChat



