// import { useEffect, useState, useRef } from "react"
// import { io } from "socket.io-client"
// import API from "../services/api"

// const socket = io("http://localhost:5000")

// function StudentClassChat(){

//   const user = JSON.parse(localStorage.getItem("user"))

//   const [classId, setClassId] = useState(null)
//   const [messages,setMessages] = useState([])
//   const [text,setText] = useState("")
//   const messagesEndRef = useRef(null)

//   // ✅ FETCH CLASS ID FROM BACKEND
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("/student/profile")
//         setClassId(res.data.class_id)
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     fetchProfile()
//   }, [])

//   // ✅ SOCKET + LOAD MESSAGES
//   useEffect(()=>{

//     if(!classId) return

//     loadMessages()

//     socket.emit("join_class", classId)

//     socket.on("receive_message",(data)=>{
//       if(data.class_id === classId){
//         setMessages(prev=>[...prev,data])
//       }
//     })

//     return () => {
//       socket.off("receive_message")
//     }

//   },[classId])

//   // ✅ AUTO SCROLL
//   useEffect(()=>{
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   },[messages])

//   // ✅ LOAD MESSAGES
//   const loadMessages = async()=>{

//     try{
//       const res = await API.get(`/chat/class/${classId}`)
//       setMessages(res.data)
//     }catch(err){
//       console.log(err)
//     }

//   }

//   // ✅ SEND MESSAGE
//   const sendMessage = async()=>{

//     if(!text.trim()) return

//     try{

//       const res = await API.post("/chat/send",{
//         class_id: classId,
//         message:text
//       })

//       socket.emit("send_message",res.data.data)

//       setText("")

//     }catch(err){
//       console.log(err)
//     }

//   }

//   // ❌ NO CLASS CASE
//   if(!classId){
//     return <p className="p-6 text-red-500">No class assigned</p>
//   }

//   return (

//     <div className="p-4">

//       <h1 className="text-xl font-bold mb-4">
//         Class Chat
//       </h1>

//       <div className="bg-white rounded-lg shadow p-4 h-[450px] flex flex-col">

//         <div className="flex-1 overflow-y-auto space-y-2">

//           {messages.map((m,i)=>{

//             const isMe = m.sender_id === user?.id

//             return (
//               <div
//                 key={i}
//                 className={`p-2 rounded max-w-[70%]
//                 ${isMe ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"}`}
//               >
//                 {!isMe && (
//                   <p className="text-xs font-semibold">
//                     {m.users?.full_name}
//                   </p>
//                 )}

//                 <p>{m.message}</p>
//               </div>
//             )
//           })}

//           <div ref={messagesEndRef} />

//         </div>

//         <div className="flex gap-2 mt-3">

//           <input
//             value={text}
//             onChange={(e)=>setText(e.target.value)}
//             className="flex-1 border p-2 rounded"
//             placeholder="Type message..."
//             onKeyDown={(e)=> e.key === "Enter" && sendMessage()}
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Send
//           </button>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default StudentClassChat






























import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import API from "../services/api"
import BookLoader from "../components/BookLoader"

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
const socket = io(BACKEND_URL)

function StudentClassChat() {

  const user = JSON.parse(localStorage.getItem("user"))

  const [classId, setClassId] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef()

  // ✅ FETCH CLASS ID
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/student/profile")
        setClassId(res.data.class_id)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProfile()
  }, [])

  // ✅ SOCKET + LOAD
  useEffect(() => {

    if (!classId) return

    loadMessages()

    socket.emit("join_class", classId)

    socket.on("receive_message", (data) => {
      if (data.class_id === classId) {
        setMessages(prev => [...prev, data])
      }
    })

    return () => {
      socket.off("receive_message")
    }

  }, [classId])

  // ✅ AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ✅ LOAD MESSAGES
  const loadMessages = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/chat/class/${classId}`)
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ SEND MESSAGE
  const sendMessage = async () => {
    if (!text.trim()) return

    try {
      const res = await API.post("/chat/send", {
        class_id: classId,
        message: text
      })

      socket.emit("send_message", res.data.data)
      setText("")
    } catch (err) {
      console.log(err)
    }
  }

  // ❌ NO CLASS CASE
  if (!classId && !loading) {
    return <p className="p-6 text-red-500">No class assigned</p>
  }

  // ✅ LOADER
  if (loading) return <BookLoader />

  return (

    <div className="h-full flex items-center justify-center bg-gray-100 p-4">

      {/* CARD */}
      <div className="w-full max-w-4xl h-full bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-4 md:px-6 py-3 border-b bg-gray-50">
          <h2 className="text-base md:text-lg font-semibold">
            Class Chat 💬
          </h2>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">

          {messages.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No messages yet 👀
            </p>
          )}

          {messages.map((msg, index) => {

            const isMe = msg.sender_id === user?.id

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >

                <div
                  className={`
                    max-w-[80%] md:max-w-md
                    px-3 md:px-4 py-2
                    rounded-2xl shadow-sm
                    text-sm md:text-base
                    break-words
                    ${isMe
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }
                  `}
                >

                  <p className="text-[11px] md:text-xs opacity-70 mb-1 font-medium">
                    {msg.users?.full_name || "User"}
                  </p>

                  <p>{msg.message}</p>

                  <p className="text-[10px] md:text-xs text-right mt-1 opacity-70">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>

                </div>

              </div>
            )
          })}

          <div ref={bottomRef} />

        </div>

        {/* INPUT */}
        <div className="p-3 border-t flex gap-2 bg-white">

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="
              flex-1 
              border 
              rounded-full 
              px-4 py-2 
              outline-none 
              focus:ring-2 focus:ring-indigo-400
            "
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="
              bg-indigo-600 
              text-white 
              px-5 py-2 
              rounded-full 
              hover:bg-indigo-700 
              transition
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  )
}

export default StudentClassChat