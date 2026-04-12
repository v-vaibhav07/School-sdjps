

// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { io } from "socket.io-client"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// const socket = io("http://localhost:5000")

// function ClassChatRoom(){

// const { class_id } = useParams()

// const [messages,setMessages] = useState([])
// const [text,setText] = useState("")
// const [typingUser,setTypingUser] = useState("")

// useEffect(()=>{

//   loadMessages()

//   socket.emit("join_class", class_id)

//   socket.on("receive_message",(data)=>{
//     if(data.class_id === class_id){
//       setMessages(prev=>[...prev,data])
//     }
//   })

//   socket.on("user_typing",(data)=>{
//     setTypingUser(data.user + " is typing...")
//   })

//   socket.on("user_stop_typing",()=>{
//     setTypingUser("")
//   })

//   return () => {
//     socket.off("receive_message")
//     socket.off("user_typing")
//     socket.off("user_stop_typing")
//   }

// },[class_id])
// const loadMessages = async()=>{

// const res = await API.get(`/chat/class/${class_id}`)
// setMessages(res.data)

// }

// const sendMessage = async()=>{

// if(!text) return

// const res = await API.post("/chat/send",{
// class_id,
// message:text
// })

// socket.emit("send_message",res.data.data)

// setText("")

// }

// return(

// <AdminLayout>

// <h1 className="text-2xl font-bold mb-6">
// Class Chat
// </h1>

// <div className="bg-white rounded-xl shadow p-5 h-[500px] flex flex-col">

// <div className="flex-1 overflow-y-auto space-y-3 mb-4">

// {messages.map((m,i)=>(

// <div key={i} className="bg-gray-100 p-3 rounded">

// <b>{m.users?.full_name || "User"}</b>

// <p>{m.message}</p>

// <span className="text-xs text-gray-500">

// {m.sender_role}

// </span>

// </div>

// ))}

// </div>

// {typingUser && (
// <p className="text-sm text-gray-500 italic mb-2">
// {typingUser}
// </p>
// )}

// <div className="flex gap-2">

// <input
// value={text}
// onChange={(e)=>{

// setText(e.target.value)

// socket.emit("typing",{
// class_id,
// user:localStorage.getItem("user_name")
// })

// setTimeout(()=>{
// socket.emit("stop_typing",{class_id})
// },1000)

// }}
// className="flex-1 border p-2 rounded"
// placeholder="Type message..."
// />

// <button
// onClick={sendMessage}
// className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
// >

// Send

// </button>

// </div>

// </div>

// </AdminLayout>

// )

// }

// export default ClassChatRoom


// improved ui 





import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import BookLoader from "../components/BookLoader"
import {
  HiPaperAirplane,
  HiChatBubbleLeftRight,
  HiUserCircle,
  HiShieldCheck,
  HiAcademicCap,
  HiFaceSmile,
  HiEllipsisHorizontal,
  HiSignal,
  HiUsers,
  HiHashtag,
  HiSparkles,
  HiArrowDown,
} from "react-icons/hi2"

const socket = io("http://localhost:5000")

function ClassChatRoom() {
  const { class_id } = useParams()

  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [typingUser, setTypingUser] = useState("")
  const [loading, setLoading] = useState(true)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  const currentUser = localStorage.getItem("user_name") || "You"

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  const handleScroll = () => {
    if (!chatContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 120)
  }

  useEffect(() => {
    loadMessages()

    socket.emit("join_class", class_id)

    socket.on("receive_message", (data) => {
      if (data.class_id === class_id) {
        setMessages((prev) => [...prev, data])
      }
    })

    socket.on("user_typing", (data) => {
      setTypingUser(data.user + " is typing...")
    })

    socket.on("user_stop_typing", () => {
      setTypingUser("")
    })

    return () => {
      socket.off("receive_message")
      socket.off("user_typing")
      socket.off("user_stop_typing")
    }
  }, [class_id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/chat/class/${class_id}`)
      setMessages(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!text.trim()) return
    try {
      const res = await API.post("/chat/send", {
        class_id,
        message: text,
      })
      socket.emit("send_message", res.data.data)
      setText("")
      socket.emit("stop_typing", { class_id })
    } catch (err) {
      console.error(err)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleTyping = (e) => {
    setText(e.target.value)
    socket.emit("typing", {
      class_id,
      user: currentUser,
    })
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { class_id })
    }, 1000)
  }

  const getRoleConfig = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return {
          icon: <HiShieldCheck className="w-3.5 h-3.5" />,
          color: "bg-red-100 text-red-700 border-red-200",
          accent: "from-red-500 to-pink-500",
          label: "Admin",
        }
      case "teacher":
        return {
          icon: <HiAcademicCap className="w-3.5 h-3.5" />,
          color: "bg-blue-100 text-blue-700 border-blue-200",
          accent: "from-blue-500 to-cyan-500",
          label: "Teacher",
        }
      case "student":
        return {
          icon: <HiFaceSmile className="w-3.5 h-3.5" />,
          color: "bg-emerald-100 text-emerald-700 border-emerald-200",
          accent: "from-emerald-500 to-teal-500",
          label: "Student",
        }
      default:
        return {
          icon: <HiUserCircle className="w-3.5 h-3.5" />,
          color: "bg-gray-100 text-gray-700 border-gray-200",
          accent: "from-gray-500 to-slate-500",
          label: role || "User",
        }
    }
  }

  const getAvatarGradient = (name) => {
    const gradients = [
      "from-violet-500 to-purple-600",
      "from-blue-500 to-cyan-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-amber-500",
      "from-pink-500 to-rose-500",
      "from-indigo-500 to-blue-500",
      "from-red-500 to-orange-500",
      "from-cyan-500 to-blue-500",
    ]
    let hash = 0
    for (let i = 0; i < (name || "U").length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return gradients[Math.abs(hash) % gradients.length]
  }

  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const isOwnMessage = (msg) => {
    const senderName = msg.users?.full_name || "User"
    return senderName === currentUser
  }

  if (loading) return <BookLoader />

  return (
    <AdminLayout>
      {/* ─── Header ─── */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/50">
              <HiChatBubbleLeftRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-800 tracking-tight">
                Class Chat Room
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                <HiHashtag className="w-3.5 h-3.5 text-amber-500" />
                Class ID: {class_id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <HiSignal className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">
                Live
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
              <HiUsers className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700">
                {messages.length} messages
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Chat Container ─── */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100/80 flex flex-col h-[calc(100vh-220px)] sm:h-[calc(100vh-240px)] lg:h-[600px] overflow-hidden">
        {/* ─── Chat Header Bar ─── */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiSparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-gray-700">
              Conversation
            </span>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <HiEllipsisHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* ─── Messages Area ─── */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-3 sm:px-5 lg:px-6 py-4 space-y-1 scroll-smooth"
          style={{
            background:
              "linear-gradient(180deg, #fefce8 0%, #fffbeb 30%, #ffffff 100%)",
          }}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <HiChatBubbleLeftRight className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-1">
                No messages yet
              </h3>
              <p className="text-sm text-gray-400 max-w-xs">
                Start the conversation! Type your first message below to get
                things going.
              </p>
            </div>
          ) : (
            messages.map((m, i) => {
              const roleConfig = getRoleConfig(m.sender_role)
              const senderName = m.users?.full_name || "User"
              const own = isOwnMessage(m)
              const showAvatar =
                i === 0 ||
                (messages[i - 1]?.users?.full_name || "User") !== senderName

              return (
                <div
                  key={i}
                  className={`flex ${own ? "justify-end" : "justify-start"} ${showAvatar ? "mt-4" : "mt-0.5"}`}
                >
                  <div
                    className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] ${own ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 mt-auto">
                      {showAvatar ? (
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br ${getAvatarGradient(senderName)} rounded-xl flex items-center justify-center shadow-md`}
                        >
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {getInitials(senderName)}
                          </span>
                        </div>
                      ) : (
                        <div className="w-8 sm:w-9" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className="flex flex-col">
                      {showAvatar && (
                        <div
                          className={`flex items-center gap-2 mb-1 ${own ? "justify-end" : "justify-start"}`}
                        >
                          <span className="text-xs sm:text-sm font-bold text-gray-700">
                            {own ? "You" : senderName}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold border ${roleConfig.color}`}
                          >
                            {roleConfig.icon}
                            {roleConfig.label}
                          </span>
                        </div>
                      )}

                      <div
                        className={`group relative px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition-all duration-200 hover:shadow-md ${
                          own
                            ? "bg-gradient-to-br from-amber-500 to-yellow-500 text-white rounded-br-md shadow-md shadow-amber-200/40"
                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-md shadow-sm"
                        }`}
                      >
                        <p
                          className={`text-sm sm:text-[15px] leading-relaxed break-words ${own ? "text-white" : "text-gray-800"}`}
                        >
                          {m.message}
                        </p>
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 ${own ? "text-white/70" : "text-gray-400"}`}
                        >
                          <span className="text-[10px]">
                            {formatTime(m.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ─── Scroll to Bottom ─── */}
        {showScrollBtn && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={() => scrollToBottom()}
              className="p-2 bg-amber-500 text-white rounded-full shadow-lg shadow-amber-200/50 hover:bg-amber-600 transition-all animate-bounce"
            >
              <HiArrowDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ─── Typing Indicator ─── */}
        {typingUser && (
          <div className="px-4 sm:px-6 py-2 border-t border-gray-50 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span
                  className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-500 italic">
                {typingUser}
              </span>
            </div>
          </div>
        )}

        {/* ─── Input Area ─── */}
        <div className="px-3 sm:px-5 lg:px-6 py-3 sm:py-4 border-t border-gray-100 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <input
                value={text}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-200"
                placeholder="Type your message..."
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 shadow-md ${
                text.trim()
                  ? "bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-300/50 scale-100 hover:scale-105 active:scale-95"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
              }`}
            >
              <HiPaperAirplane className="w-5 h-5 sm:w-6 sm:h-6 -rotate-0" />
            </button>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-400 mt-2 text-center">
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-[10px]">Enter</kbd> to send
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}

export default ClassChatRoom
















// import { useEffect, useState, useRef } from "react"
// import { useParams, useLocation } from "react-router-dom"
// import { io } from "socket.io-client"
// import API from "../services/api"

// import AdminLayout from "../layouts/AdminLayout"
// import StudentLayout from "../layouts/StudentLayout"
// import TeacherLayout from "../layouts/TeacherLayout"

// const socket = io("http://localhost:5000")

// function ClassChatRoom(){

//   const { class_id } = useParams()
//   const location = useLocation()

//   const [messages,setMessages] = useState([])
//   const [text,setText] = useState("")
//   const [typingUser,setTypingUser] = useState("")
//   const messagesEndRef = useRef(null)

//   const user = JSON.parse(localStorage.getItem("user"))

//   // 🔥 LOAD + SOCKET
//   useEffect(()=>{

//     loadMessages()

//     socket.emit("join_class", class_id)

//     socket.on("receive_message",(data)=>{
//       if(data.class_id === class_id){
//         setMessages(prev=>[...prev,data])
//       }
//     })

//     socket.on("user_typing",(data)=>{
//       setTypingUser(data.user + " is typing...")
//     })

//     socket.on("user_stop_typing",()=>{
//       setTypingUser("")
//     })

//     return () => {
//       socket.off("receive_message")
//       socket.off("user_typing")
//       socket.off("user_stop_typing")
//     }

//   },[class_id])

//   // 🔥 AUTO SCROLL
//   useEffect(()=>{
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   },[messages])

//   const loadMessages = async()=>{

//     try{
//       const res = await API.get(`/chat/class/${class_id}`)
//       setMessages(res.data)
//     }catch(err){
//       console.log(err)
//     }

//   }

//   const sendMessage = async()=>{

//     if(!text.trim()) return

//     try{

//       const res = await API.post("/chat/send",{
//         class_id,
//         message:text
//       })

//       socket.emit("send_message",res.data.data)

//       setText("")

//     }catch(err){
//       console.log(err)
//     }

//   }

//   // 🔥 CHAT UI
//   const chatUI = (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-4">
//         Class Chat
//       </h1>

//       <div className="bg-white rounded-xl shadow p-5 h-[500px] flex flex-col">

//         {/* MESSAGES */}
//         <div className="flex-1 overflow-y-auto space-y-3 mb-4">

//           {messages.map((m,i)=>{

//             const isMe = m.sender_id === user?.id

//             return (
//               <div
//                 key={i}
//                 className={`p-3 rounded max-w-[70%] 
//                 ${isMe 
//                   ? "bg-blue-500 text-white ml-auto" 
//                   : "bg-gray-100"
//                 }`}
//               >

//                 {!isMe && (
//                   <p className="text-xs font-semibold text-gray-600">
//                     {m.users?.full_name || "User"}
//                   </p>
//                 )}

//                 <p>{m.message}</p>

//                 <span className="text-xs opacity-70">
//                   {m.sender_role}
//                 </span>

//               </div>
//             )
//           })}

//           <div ref={messagesEndRef} />

//         </div>

//         {/* TYPING */}
//         {typingUser && (
//           <p className="text-sm text-gray-500 italic mb-2">
//             {typingUser}
//           </p>
//         )}

//         {/* INPUT */}
//         <div className="flex gap-2">

//           <input
//             value={text}
//             onChange={(e)=>{

//               setText(e.target.value)

//               socket.emit("typing",{
//                 class_id,
//                 user:user?.full_name
//               })

//               setTimeout(()=>{
//                 socket.emit("stop_typing",{class_id})
//               },800)

//             }}
//             className="flex-1 border p-2 rounded"
//             placeholder="Type message..."
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             Send
//           </button>

//         </div>

//       </div>

//     </div>
//   )

//   // 🔥 ROLE BASED LAYOUT
//   if (location.pathname.includes("/student")) {
//     return <StudentLayout>{chatUI}</StudentLayout>
//   }

//   if (location.pathname.includes("/teacher")) {
//     return <TeacherLayout>{chatUI}</TeacherLayout>
//   }

//   return <AdminLayout>{chatUI}</AdminLayout>
// }

// export default ClassChatRoom