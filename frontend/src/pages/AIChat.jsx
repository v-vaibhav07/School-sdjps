// import { useState } from "react"
// import API from "../services/api"

// function AIChat() {

//   const [question, setQuestion] = useState("")
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)

//   const askAI = async () => {

//     if (!question.trim()) return

//     const userMsg = { type: "user", text: question }
//     setMessages(prev => [...prev, userMsg])
//     setQuestion("")
//     setLoading(true)

//     try {
//       const res = await API.post("/ai/ask", {
//         question
//       })

//       const aiMsg = { type: "ai", text: res.data.answer }

//       setMessages(prev => [...prev, aiMsg])

//     } catch (err) {
//       console.log(err)
//     }

//     setLoading(false)
//   }

//   return (

//     <div className="bg-white p-5 rounded-xl shadow mt-6">

//       <h2 className="font-bold mb-4">
//         🤖 AI Doubt Solver
//       </h2>

//       {/* CHAT BOX */}
//       <div className="h-64 overflow-y-auto border p-3 mb-3 rounded">

//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`mb-2 ${
//               m.type === "user"
//                 ? "text-right"
//                 : "text-left"
//             }`}
//           >
//             <span className={`inline-block p-2 rounded ${
//               m.type === "user"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200"
//             }`}>
//               {m.text}
//             </span>
//           </div>
//         ))}

//         {loading && <p>Thinking...</p>}

//       </div>

//       {/* INPUT */}
//       <div className="flex gap-2">

//         <input
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Ask your doubt..."
//           className="flex-1 border p-2 rounded"
//         />

//         <button
//           onClick={askAI}
//           className="bg-blue-600 text-white px-4 rounded"
//         >
//           Ask
//         </button>

//       </div>

//     </div>
//   )
// }

// export default AIChat


















// import { useEffect, useState } from "react"
// import API from "../services/api"

// function AIChat() {

//   const [question, setQuestion] = useState("")
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)

//   const [chatId, setChatId] = useState(null)
//   const [chatList, setChatList] = useState([])

//   // ✅ FIX: ALWAYS VALID UUID
//   let userId = localStorage.getItem("userId")

//   if (!userId) {
//     userId = crypto.randomUUID()   // 🔥 REAL UUID
//     localStorage.setItem("userId", userId)
//   }

//   // 🔥 Load chats
//   useEffect(() => {
//     fetchChats()
//   }, [])

//   const fetchChats = async () => {
//     try {
//       const res = await API.get(`/ai/chats/${userId}`)
//       const chats = res.data || []

//       setChatList(chats)

//       if (chats.length > 0) {
//         loadChat(chats[0].chat_id)
//       }

//     } catch (err) {
//       console.log("Fetch chats error:", err)
//     }
//   }

//   const loadChat = async (id) => {
//     try {
//       setChatId(id)

//       const res = await API.get(`/ai/${userId}/${id}`)

//       const formatted = (res.data || []).map(m => ({
//         type: m.role,
//         text: m.message
//       }))

//       setMessages(formatted)

//     } catch (err) {
//       console.log("Load chat error:", err)
//     }
//   }

//   const newChat = () => {
//     setChatId(null)
//     setMessages([])
//   }

//   const askAI = async () => {

//     if (!question.trim()) return

//     const userMsg = { type: "user", text: question }
//     setMessages(prev => [...prev, userMsg])

//     const currentQuestion = question
//     setQuestion("")
//     setLoading(true)

//     try {

//       const res = await API.post("/ai/ask", {
//         question: currentQuestion,
//         user_id: userId,   // ✅ FIXED
//         chat_id: chatId
//       })

//       const aiMsg = { type: "ai", text: res.data.answer }
//       setMessages(prev => [...prev, aiMsg])

//       if (!chatId && res.data.chat_id) {
//         setChatId(res.data.chat_id)
//         fetchChats()
//       }

//     } catch (err) {
//       console.log("AI ERROR:", err)
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="bg-white p-5 rounded-xl shadow mt-6 flex gap-4">

//       {/* LEFT */}
//       <div className="w-1/4 border-r pr-3">

//         <button
//           onClick={newChat}
//           className="w-full mb-3 bg-blue-600 text-white p-2 rounded"
//         >
//           + New Chat
//         </button>

//         <div className="space-y-2">

//           {chatList.length === 0 && (
//             <p className="text-gray-400 text-sm">No chats yet</p>
//           )}

//           {chatList.map((c, i) => (
//             <div
//               key={i}
//               onClick={() => loadChat(c.chat_id)}
//               className={`p-2 rounded cursor-pointer ${
//                 chatId === c.chat_id
//                   ? "bg-blue-100"
//                   : "bg-gray-100 hover:bg-gray-200"
//               }`}
//             >
//               Chat {i + 1}
//             </div>
//           ))}

//         </div>

//       </div>

//       {/* RIGHT */}
//       <div className="w-3/4">

//         <h2 className="font-bold mb-4">
//           🤖 AI Doubt Solver
//         </h2>

//         <div className="h-80 overflow-y-auto border p-3 mb-3 rounded">

//           {messages.length === 0 && (
//             <p className="text-gray-400 text-center">
//               Start a new conversation 🚀
//             </p>
//           )}

//           {messages.map((m, i) => (
//             <div
//               key={i}
//               className={`mb-2 ${
//                 m.type === "user"
//                   ? "text-right"
//                   : "text-left"
//               }`}
//             >
//               <span className={`inline-block p-2 rounded ${
//                 m.type === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200"
//               }`}>
//                 {m.text}
//               </span>
//             </div>
//           ))}

//           {loading && <p>Thinking...</p>}

//         </div>

//         <div className="flex gap-2">

//           <input
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Ask your doubt..."
//             className="flex-1 border p-2 rounded"
//           />

//           <button
//             onClick={askAI}
//             className="bg-blue-600 text-white px-4 rounded"
//           >
//             Ask
//           </button>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default AIChat



























// import { useEffect, useState, useRef } from "react"
// import API from "../services/api"
// import { Send, Plus, Bot, User, MessageSquare, Sparkles } from "lucide-react"

// const aiChatStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

//   .ai-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

//   .ai-wrap {
//     background: #fff;
//     border-radius: 20px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.07);
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//   }

//   /* TOP BAR */
//   .ai-topbar {
//     background: linear-gradient(135deg, #1e3a8a, #3b5bdb);
//     padding: 18px 22px;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .ai-topbar-icon {
//     background: rgba(255,255,255,0.15);
//     border-radius: 12px;
//     width: 42px; height: 42px;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//   }

//   .ai-topbar-title {
//     font-size: 16px;
//     font-weight: 800;
//     color: #fff;
//     letter-spacing: -0.3px;
//   }

//   .ai-topbar-sub {
//     font-size: 12px;
//     color: rgba(255,255,255,0.65);
//     font-weight: 500;
//     margin-top: 1px;
//   }

//   .ai-live-dot {
//     width: 8px; height: 8px;
//     background: #4ade80;
//     border-radius: 50%;
//     animation: pulse 2s infinite;
//     margin-left: auto;
//     box-shadow: 0 0 0 0 rgba(74,222,128,0.4);
//   }

//   @keyframes pulse {
//     0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
//     50% { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
//   }

//   /* BODY */
//   .ai-body {
//     display: flex;
//     flex: 1;
//     min-height: 0;
//   }

//   /* SIDEBAR */
//   .ai-sidebar {
//     width: 200px;
//     border-right: 1.5px solid #f0f2f7;
//     padding: 16px 12px;
//     background: #fafbfd;
//     flex-shrink: 0;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }

//   @media (max-width: 600px) {
//     .ai-sidebar { display: none; }
//     .ai-body { flex-direction: column; }
//     .ai-chat-area { width: 100%; }
//   }

//   .new-chat-btn {
//     background: linear-gradient(135deg, #3b5bdb, #4dabf7);
//     color: #fff;
//     border: none;
//     border-radius: 12px;
//     padding: 10px 0;
//     font-size: 13px;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 700;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 6px;
//     box-shadow: 0 4px 12px rgba(59,91,219,0.3);
//     transition: transform 0.15s, box-shadow 0.15s;
//   }

//   .new-chat-btn:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 6px 16px rgba(59,91,219,0.38);
//   }

//   .sidebar-label {
//     font-size: 10px;
//     font-weight: 800;
//     text-transform: uppercase;
//     letter-spacing: 0.8px;
//     color: #9ca3af;
//     padding: 0 4px;
//   }

//   .chat-history { display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1; }

//   .chat-history-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 9px 10px;
//     border-radius: 10px;
//     cursor: pointer;
//     font-size: 13px;
//     font-weight: 600;
//     color: #374151;
//     transition: background 0.15s;
//     border: 1.5px solid transparent;
//   }

//   .chat-history-item:hover { background: #f0f2f7; }
//   .chat-history-item.active { background: #eef2ff; border-color: #c7d2fe; color: #3b5bdb; }

//   .no-chats {
//     font-size: 12px;
//     color: #9ca3af;
//     font-weight: 500;
//     text-align: center;
//     padding: 10px 0;
//   }

//   /* CHAT AREA */
//   .ai-chat-area {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     min-height: 0;
//   }

//   .msg-window {
//     flex: 1;
//     overflow-y: auto;
//     padding: 20px 20px 10px;
//     display: flex;
//     flex-direction: column;
//     gap: 14px;
//     min-height: 320px;
//     max-height: 380px;
//   }

//   .msg-window::-webkit-scrollbar { width: 5px; }
//   .msg-window::-webkit-scrollbar-track { background: transparent; }
//   .msg-window::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }

//   .empty-chat {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     flex: 1;
//     gap: 10px;
//     color: #9ca3af;
//     font-size: 13px;
//     font-weight: 600;
//     padding: 40px 0;
//   }

//   .empty-chat-icon {
//     width: 52px; height: 52px;
//     background: #f0f2f7;
//     border-radius: 16px;
//     display: flex; align-items: center; justify-content: center;
//     color: #c7d2fe;
//   }

//   /* MESSAGES */
//   .msg-row {
//     display: flex;
//     gap: 10px;
//     align-items: flex-end;
//   }

//   .msg-row.user { flex-direction: row-reverse; }

//   .msg-avatar {
//     width: 30px; height: 30px;
//     border-radius: 10px;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//   }

//   .msg-avatar.ai { background: linear-gradient(135deg, #1e3a8a, #3b5bdb); color: #fff; }
//   .msg-avatar.user { background: linear-gradient(135deg, #059669, #34d399); color: #fff; }

//   .msg-bubble {
//     max-width: 75%;
//     padding: 11px 15px;
//     border-radius: 16px;
//     font-size: 14px;
//     font-weight: 500;
//     line-height: 1.55;
//   }

//   .msg-bubble.ai {
//     background: #f8f9fc;
//     border: 1.5px solid #e5e7eb;
//     color: #1f2937;
//     border-bottom-left-radius: 4px;
//   }

//   .msg-bubble.user {
//     background: linear-gradient(135deg, #3b5bdb, #4dabf7);
//     color: #fff;
//     border-bottom-right-radius: 4px;
//   }

//   /* TYPING */
//   .typing-row { display: flex; gap: 10px; align-items: flex-end; }

//   .typing-bubble {
//     background: #f0f2f7;
//     border: 1.5px solid #e5e7eb;
//     border-radius: 16px;
//     border-bottom-left-radius: 4px;
//     padding: 12px 18px;
//     display: flex;
//     gap: 5px;
//     align-items: center;
//   }

//   .dot {
//     width: 7px; height: 7px;
//     background: #9ca3af;
//     border-radius: 50%;
//     animation: blink 1.2s infinite;
//   }

//   .dot:nth-child(2) { animation-delay: 0.2s; }
//   .dot:nth-child(3) { animation-delay: 0.4s; }

//   @keyframes blink {
//     0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
//     40% { transform: scale(1.2); opacity: 1; }
//   }

//   /* INPUT BAR */
//   .ai-input-bar {
//     display: flex;
//     gap: 10px;
//     padding: 16px 20px 20px;
//     border-top: 1.5px solid #f0f2f7;
//     align-items: flex-end;
//   }

//   .ai-input {
//     flex: 1;
//     border: 2px solid #e5e7eb;
//     border-radius: 14px;
//     padding: 12px 16px;
//     font-size: 14px;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 500;
//     color: #111827;
//     outline: none;
//     resize: none;
//     transition: border-color 0.2s;
//     background: #f9fafb;
//     min-height: 46px;
//     max-height: 120px;
//     line-height: 1.5;
//   }

//   .ai-input:focus {
//     border-color: #3b5bdb;
//     background: #fff;
//   }

//   .ai-input::placeholder { color: #9ca3af; }

//   .send-btn {
//     background: linear-gradient(135deg, #3b5bdb, #4dabf7);
//     color: #fff;
//     border: none;
//     border-radius: 14px;
//     width: 46px; height: 46px;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer;
//     box-shadow: 0 4px 12px rgba(59,91,219,0.35);
//     transition: transform 0.15s, box-shadow 0.15s;
//     flex-shrink: 0;
//   }

//   .send-btn:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 6px 16px rgba(59,91,219,0.4);
//   }

//   .send-btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none;
//   }
// `

// function AIChat() {
//   const [question, setQuestion] = useState("")
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [chatId, setChatId] = useState(null)
//   const [chatList, setChatList] = useState([])
//   const bottomRef = useRef(null)

//   let userId = localStorage.getItem("userId")
//   if (!userId) {
//     userId = crypto.randomUUID()
//     localStorage.setItem("userId", userId)
//   }

//   useEffect(() => { fetchChats() }, [])

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages, loading])

//   const fetchChats = async () => {
//     try {
//       const res = await API.get(`/ai/chats/${userId}`)
//       const chats = res.data || []
//       setChatList(chats)
//       if (chats.length > 0) loadChat(chats[0].chat_id)
//     } catch (err) { console.log("Fetch chats error:", err) }
//   }

//   const loadChat = async (id) => {
//     try {
//       setChatId(id)
//       const res = await API.get(`/ai/${userId}/${id}`)
//       const formatted = (res.data || []).map(m => ({ type: m.role, text: m.message }))
//       setMessages(formatted)
//     } catch (err) { console.log("Load chat error:", err) }
//   }

//   const newChat = () => { setChatId(null); setMessages([]) }

//   const askAI = async () => {
//     if (!question.trim() || loading) return
//     const userMsg = { type: "user", text: question }
//     setMessages(prev => [...prev, userMsg])
//     const currentQuestion = question
//     setQuestion("")
//     setLoading(true)
//     try {
//       const res = await API.post("/ai/ask", {
//         question: currentQuestion,
//         user_id: userId,
//         chat_id: chatId
//       })
//       const aiMsg = { type: "ai", text: res.data.answer }
//       setMessages(prev => [...prev, aiMsg])
//       if (!chatId && res.data.chat_id) {
//         setChatId(res.data.chat_id)
//         fetchChats()
//       }
//     } catch (err) { console.log("AI ERROR:", err) }
//     setLoading(false)
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       askAI()
//     }
//   }

//   return (
//     <div className="ai-wrap">
//       <style>{aiChatStyle}</style>

//       {/* TOP BAR */}
//       <div className="ai-topbar">
//         <div className="ai-topbar-icon">
//           <Sparkles size={20} color="#fff" />
//         </div>
//         <div>
//           <div className="ai-topbar-title">AI Doubt Solver</div>
//           <div className="ai-topbar-sub">Powered by Claude · Always ready</div>
//         </div>
//         <div className="ai-live-dot" />
//       </div>

//       {/* BODY */}
//       <div className="ai-body">

//         {/* SIDEBAR */}
//         <div className="ai-sidebar">
//           <button onClick={newChat} className="new-chat-btn">
//             <Plus size={15} /> New Chat
//           </button>

//           <div className="sidebar-label">History</div>

//           <div className="chat-history">
//             {chatList.length === 0 && (
//               <div className="no-chats">No chats yet</div>
//             )}
//             {chatList.map((c, i) => (
//               <div
//                 key={i}
//                 onClick={() => loadChat(c.chat_id)}
//                 className={`chat-history-item ${chatId === c.chat_id ? "active" : ""}`}
//               >
//                 <MessageSquare size={13} />
//                 Chat {i + 1}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CHAT AREA */}
//         <div className="ai-chat-area">
//           <div className="msg-window">
//             {messages.length === 0 && !loading && (
//               <div className="empty-chat">
//                 <div className="empty-chat-icon">
//                   <Bot size={26} />
//                 </div>
//                 Ask your doubts — I'm here to help 🚀
//               </div>
//             )}

//             {messages.map((m, i) => (
//               <div key={i} className={`msg-row ${m.type === "user" ? "user" : ""}`}>
//                 <div className={`msg-avatar ${m.type}`}>
//                   {m.type === "user" ? <User size={14} /> : <Bot size={14} />}
//                 </div>
//                 <div className={`msg-bubble ${m.type}`}>{m.text}</div>
//               </div>
//             ))}

//             {loading && (
//               <div className="typing-row">
//                 <div className="msg-avatar ai"><Bot size={14} /></div>
//                 <div className="typing-bubble">
//                   <div className="dot" />
//                   <div className="dot" />
//                   <div className="dot" />
//                 </div>
//               </div>
//             )}

//             <div ref={bottomRef} />
//           </div>

//           {/* INPUT BAR */}
//           <div className="ai-input-bar">
//             <textarea
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Ask your doubt... (Shift+Enter for new line)"
//               className="ai-input"
//               rows={1}
//             />
//             <button onClick={askAI} className="send-btn" disabled={loading || !question.trim()}>
//               <Send size={18} />
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default AIChat


























import { useEffect, useState, useRef } from "react"
import API from "../services/api"
import { Send, Plus, Bot, User, MessageSquare, Sparkles, Menu, X, Trash2 } from "lucide-react"

const aiChatStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

  .ai-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

  .ai-wrap {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  /* TOP BAR */
  .ai-topbar {
    background: linear-gradient(135deg, #1e3a8a, #3b5bdb);
    padding: 18px 22px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 10;
    position: relative;
  }

  .ai-topbar-icon {
    background: rgba(255,255,255,0.15);
    border-radius: 12px;
    width: 42px; height: 42px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .ai-topbar-title {
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .ai-topbar-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    font-weight: 500;
    margin-top: 1px;
  }

  .ai-live-dot {
    width: 8px; height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s infinite;
    margin-left: auto;
    box-shadow: 0 0 0 0 rgba(74,222,128,0.4);
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
    50% { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
  }

  /* HAMBURGER BUTTON - only visible on mobile */
  .ai-hamburger {
    display: none;
    background: rgba(255,255,255,0.15);
    border: none;
    border-radius: 10px;
    width: 38px; height: 38px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .ai-hamburger:hover {
    background: rgba(255,255,255,0.25);
  }

  /* BODY */
  .ai-body {
    display: flex;
    flex: 1;
    min-height: 0;
    position: relative;
  }

  /* SIDEBAR */
  .ai-sidebar {
    width: 220px;
    border-right: 1.5px solid #f0f2f7;
    padding: 16px 12px;
    background: #fafbfd;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 20;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .new-chat-btn {
    background: linear-gradient(135deg, #3b5bdb, #4dabf7);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 10px 0;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-shadow: 0 4px 12px rgba(59,91,219,0.3);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .new-chat-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(59,91,219,0.38);
  }

  .sidebar-label {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #9ca3af;
    padding: 0 4px;
  }

  .chat-history { display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1; }

  .chat-history::-webkit-scrollbar { width: 4px; }
  .chat-history::-webkit-scrollbar-track { background: transparent; }
  .chat-history::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }

  .chat-history-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 10px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    transition: background 0.15s;
    border: 1.5px solid transparent;
    position: relative;
  }

  .chat-history-item:hover { background: #f0f2f7; }
  .chat-history-item.active { background: #eef2ff; border-color: #c7d2fe; color: #3b5bdb; }

  .chat-history-item .chat-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .chat-delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    padding: 2px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
    flex-shrink: 0;
  }

  .chat-history-item:hover .chat-delete-btn { opacity: 1; }
  .chat-delete-btn:hover { color: #ef4444; background: rgba(239,68,68,0.08); }

  .no-chats {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 500;
    text-align: center;
    padding: 10px 0;
  }

  /* OVERLAY for mobile sidebar */
  .ai-overlay {
    display: none;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 15;
    animation: fadeIn 0.3s;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* MOBILE SIDEBAR CLOSE BTN */
  .sidebar-close-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
    padding: 4px;
    border-radius: 8px;
    align-self: flex-end;
    transition: color 0.15s, background 0.15s;
  }

  .sidebar-close-btn:hover {
    color: #ef4444;
    background: rgba(239,68,68,0.08);
  }

  /* CHAT AREA */
  .ai-chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
  }

  .msg-window {
    flex: 1;
    overflow-y: auto;
    padding: 20px 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 320px;
    max-height: 380px;
  }

  .msg-window::-webkit-scrollbar { width: 5px; }
  .msg-window::-webkit-scrollbar-track { background: transparent; }
  .msg-window::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }

  .empty-chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: 10px;
    color: #9ca3af;
    font-size: 13px;
    font-weight: 600;
    padding: 40px 0;
  }

  .empty-chat-icon {
    width: 52px; height: 52px;
    background: #f0f2f7;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    color: #c7d2fe;
  }

  /* MESSAGES */
  .msg-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .msg-row.user { flex-direction: row-reverse; }

  .msg-avatar {
    width: 30px; height: 30px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .msg-avatar.ai { background: linear-gradient(135deg, #1e3a8a, #3b5bdb); color: #fff; }
  .msg-avatar.user { background: linear-gradient(135deg, #059669, #34d399); color: #fff; }

  .msg-bubble {
    max-width: 75%;
    padding: 11px 15px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.55;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .msg-bubble.ai {
    background: #f8f9fc;
    border: 1.5px solid #e5e7eb;
    color: #1f2937;
    border-bottom-left-radius: 4px;
  }

  .msg-bubble.user {
    background: linear-gradient(135deg, #3b5bdb, #4dabf7);
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  /* TYPING */
  .typing-row { display: flex; gap: 10px; align-items: flex-end; }

  .typing-bubble {
    background: #f0f2f7;
    border: 1.5px solid #e5e7eb;
    border-radius: 16px;
    border-bottom-left-radius: 4px;
    padding: 12px 18px;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .dot {
    width: 7px; height: 7px;
    background: #9ca3af;
    border-radius: 50%;
    animation: blink 1.2s infinite;
  }

  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes blink {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1.2); opacity: 1; }
  }

  /* INPUT BAR */
  .ai-input-bar {
    display: flex;
    gap: 10px;
    padding: 16px 20px 20px;
    border-top: 1.5px solid #f0f2f7;
    align-items: flex-end;
  }

  .ai-input {
    flex: 1;
    border: 2px solid #e5e7eb;
    border-radius: 14px;
    padding: 12px 16px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    color: #111827;
    outline: none;
    resize: none;
    transition: border-color 0.2s;
    background: #f9fafb;
    min-height: 46px;
    max-height: 120px;
    line-height: 1.5;
  }

  .ai-input:focus {
    border-color: #3b5bdb;
    background: #fff;
  }

  .ai-input::placeholder { color: #9ca3af; }

  .send-btn {
    background: linear-gradient(135deg, #3b5bdb, #4dabf7);
    color: #fff;
    border: none;
    border-radius: 14px;
    width: 46px; height: 46px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(59,91,219,0.35);
    transition: transform 0.15s, box-shadow 0.15s;
    flex-shrink: 0;
  }

  .send-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(59,91,219,0.4);
  }

  .send-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* ========== MOBILE RESPONSIVE ========== */
  @media (max-width: 768px) {

    .ai-wrap {
      border-radius: 14px;
    }

    .ai-hamburger {
      display: flex;
    }

    .ai-topbar {
      padding: 14px 16px;
    }

    .ai-topbar-icon {
      width: 36px; height: 36px;
      border-radius: 10px;
    }

    .ai-topbar-title {
      font-size: 14px;
    }

    /* SIDEBAR — slides in from left as overlay */
    .ai-sidebar {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 260px;
      max-width: 80vw;
      transform: translateX(-100%);
      box-shadow: 4px 0 20px rgba(0,0,0,0.15);
      border-right: none;
      border-radius: 0 16px 16px 0;
      padding: 16px;
    }

    .ai-sidebar.open {
      transform: translateX(0);
    }

    .ai-overlay.show {
      display: block;
    }

    .sidebar-close-btn {
      display: flex;
    }

    .msg-window {
      padding: 16px 14px 10px;
      min-height: 280px;
      max-height: none;
      flex: 1;
    }

    .msg-bubble {
      max-width: 85%;
      font-size: 13px;
      padding: 10px 13px;
    }

    .msg-avatar {
      width: 26px; height: 26px;
      border-radius: 8px;
    }

    .ai-input-bar {
      padding: 12px 14px 16px;
      gap: 8px;
    }

    .ai-input {
      padding: 10px 14px;
      font-size: 13px;
      border-radius: 12px;
      min-height: 42px;
    }

    .send-btn {
      width: 42px; height: 42px;
      border-radius: 12px;
    }

    .empty-chat {
      padding: 30px 10px;
      font-size: 12px;
    }

    .empty-chat-icon {
      width: 44px; height: 44px;
      border-radius: 14px;
    }
  }

  @media (max-width: 400px) {
    .ai-topbar {
      padding: 12px 12px;
      gap: 8px;
    }

    .ai-topbar-title { font-size: 13px; }

    .ai-topbar-icon {
      width: 32px; height: 32px;
      border-radius: 8px;
    }

    .ai-hamburger {
      width: 34px; height: 34px;
      border-radius: 8px;
    }

    .ai-sidebar {
      width: 240px;
    }

    .msg-window {
      padding: 12px 10px 8px;
      gap: 10px;
    }

    .ai-input-bar {
      padding: 10px 10px 14px;
    }
  }
`

function AIChat() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [chatId, setChatId] = useState(null)
  const [chatList, setChatList] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef(null)

  let userId = localStorage.getItem("userId")
  if (!userId) {
    userId = crypto.randomUUID()
    localStorage.setItem("userId", userId)
  }

  useEffect(() => { fetchChats() }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const fetchChats = async () => {
    try {
      const res = await API.get(`/ai/chats/${userId}`)
      const chats = res.data || []
      setChatList(chats)
      if (chats.length > 0) loadChat(chats[0].chat_id)
    } catch (err) { console.log("Fetch chats error:", err) }
  }

  const loadChat = async (id) => {
    try {
      setChatId(id)
      const res = await API.get(`/ai/${userId}/${id}`)
      const formatted = (res.data || []).map(m => ({ type: m.role, text: m.message }))
      setMessages(formatted)
      setSidebarOpen(false) // close sidebar on mobile after selecting chat
    } catch (err) { console.log("Load chat error:", err) }
  }

  const newChat = () => {
    setChatId(null)
    setMessages([])
    setSidebarOpen(false)
  }

  const askAI = async () => {
    if (!question.trim() || loading) return
    const userMsg = { type: "user", text: question }
    setMessages(prev => [...prev, userMsg])
    const currentQuestion = question
    setQuestion("")
    setLoading(true)
    try {
      const res = await API.post("/ai/ask", {
        question: currentQuestion,
        user_id: userId,
        chat_id: chatId
      })
      const aiMsg = { type: "ai", text: res.data.answer }
      setMessages(prev => [...prev, aiMsg])
      if (!chatId && res.data.chat_id) {
        setChatId(res.data.chat_id)
        fetchChats()
      }
    } catch (err) { console.log("AI ERROR:", err) }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      askAI()
    }
  }

  return (
    <div className="ai-wrap">
      <style>{aiChatStyle}</style>

      {/* TOP BAR */}
      <div className="ai-topbar">
        <button
          className="ai-hamburger"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>

        <div className="ai-topbar-icon">
          <Sparkles size={20} color="#fff" />
        </div>
        <div>
          <div className="ai-topbar-title">AI Doubt Solver</div>
          <div className="ai-topbar-sub">Always ready to help</div>
        </div>
        <div className="ai-live-dot" />
      </div>

      {/* BODY */}
      <div className="ai-body">

        {/* OVERLAY for mobile */}
        <div
          className={`ai-overlay ${sidebarOpen ? "show" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* SIDEBAR */}
        <div className={`ai-sidebar ${sidebarOpen ? "open" : ""}`}>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>

          <button onClick={newChat} className="new-chat-btn">
            <Plus size={15} /> New Chat
          </button>

          <div className="sidebar-label">History</div>

          <div className="chat-history">
            {chatList.length === 0 && (
              <div className="no-chats">No chats yet</div>
            )}
            {chatList.map((c, i) => (
              <div
                key={i}
                onClick={() => loadChat(c.chat_id)}
                className={`chat-history-item ${chatId === c.chat_id ? "active" : ""}`}
              >
                <MessageSquare size={13} />
                <span className="chat-label">Chat {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="ai-chat-area">
          <div className="msg-window">
            {messages.length === 0 && !loading && (
              <div className="empty-chat">
                <div className="empty-chat-icon">
                  <Bot size={26} />
                </div>
                Ask your doubts — I'm here to help 🚀
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`msg-row ${m.type === "user" ? "user" : ""}`}>
                <div className={`msg-avatar ${m.type}`}>
                  {m.type === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`msg-bubble ${m.type}`}>{m.text}</div>
              </div>
            ))}

            {loading && (
              <div className="typing-row">
                <div className="msg-avatar ai"><Bot size={14} /></div>
                <div className="typing-bubble">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT BAR */}
          <div className="ai-input-bar">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your doubt... (Shift+Enter for new line)"
              className="ai-input"
              rows={1}
            />
            <button onClick={askAI} className="send-btn" disabled={loading || !question.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AIChat




















// import { useEffect, useState, useRef } from "react"
// import API from "../services/api"
// import { Send, Plus, Bot, User, MessageSquare, Sparkles, Menu, X } from "lucide-react"

// const aiChatStyle = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

//   .ai-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

//   .ai-wrap {
//     background: #fff;
//     border-radius: 20px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.07);
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     height: calc(100vh - 140px);
//     min-height: 520px;
//     position: relative;
//   }

//   .ai-topbar {
//     background: linear-gradient(135deg, #1e3a8a, #3b5bdb);
//     padding: 18px 22px;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     z-index: 10;
//     position: relative;
//     flex-shrink: 0;
//   }

//   .ai-topbar-icon {
//     background: rgba(255,255,255,0.15);
//     border-radius: 12px;
//     width: 42px; height: 42px;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//   }

//   .ai-topbar-title {
//     font-size: 16px;
//     font-weight: 800;
//     color: #fff;
//     letter-spacing: -0.3px;
//   }

//   .ai-topbar-sub {
//     font-size: 12px;
//     color: rgba(255,255,255,0.75);
//     font-weight: 500;
//     margin-top: 1px;
//   }

//   .ai-live-dot {
//     width: 8px; height: 8px;
//     background: #4ade80;
//     border-radius: 50%;
//     animation: pulse 2s infinite;
//     margin-left: auto;
//     box-shadow: 0 0 0 0 rgba(74,222,128,0.4);
//   }

//   @keyframes pulse {
//     0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
//     50% { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
//   }

//   .ai-hamburger {
//     display: none;
//     background: rgba(255,255,255,0.15);
//     border: none;
//     border-radius: 10px;
//     width: 38px; height: 38px;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     color: #fff;
//     flex-shrink: 0;
//     transition: background 0.2s;
//   }

//   .ai-hamburger:hover {
//     background: rgba(255,255,255,0.25);
//   }

//   .ai-body {
//     display: flex;
//     flex: 1;
//     min-height: 0;
//     overflow: hidden;
//     position: relative;
//   }

//   .ai-sidebar {
//     width: 220px;
//     border-right: 1.5px solid #f0f2f7;
//     padding: 16px 12px;
//     background: #fafbfd;
//     flex-shrink: 0;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     z-index: 20;
//     transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     overflow: hidden;
//   }

//   .new-chat-btn {
//     background: linear-gradient(135deg, #3b5bdb, #4dabf7);
//     color: #fff;
//     border: none;
//     border-radius: 12px;
//     padding: 10px 0;
//     font-size: 13px;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 700;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 6px;
//     box-shadow: 0 4px 12px rgba(59,91,219,0.3);
//     transition: transform 0.15s, box-shadow 0.15s;
//   }

//   .new-chat-btn:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 6px 16px rgba(59,91,219,0.38);
//   }

//   .sidebar-label {
//     font-size: 10px;
//     font-weight: 800;
//     text-transform: uppercase;
//     letter-spacing: 0.8px;
//     color: #9ca3af;
//     padding: 0 4px;
//   }

//   .chat-history {
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//     flex: 1;
//     min-height: 0;
//   }

//   .chat-history-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 9px 10px;
//     border-radius: 10px;
//     cursor: pointer;
//     font-size: 13px;
//     font-weight: 600;
//     color: #374151;
//     transition: background 0.15s;
//     border: 1.5px solid transparent;
//   }

//   .chat-history-item:hover { background: #f0f2f7; }
//   .chat-history-item.active { background: #eef2ff; border-color: #c7d2fe; color: #3b5bdb; }

//   .no-chats {
//     font-size: 12px;
//     color: #9ca3af;
//     font-weight: 500;
//     text-align: center;
//     padding: 10px 0;
//   }

//   .ai-overlay {
//     display: none;
//     position: absolute;
//     inset: 0;
//     background: rgba(0,0,0,0.4);
//     z-index: 15;
//     animation: fadeIn 0.3s;
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   .sidebar-close-btn {
//     display: none;
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: #6b7280;
//     padding: 4px;
//     border-radius: 8px;
//     align-self: flex-end;
//   }

//   .ai-chat-area {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     min-height: 0;
//     min-width: 0;
//     overflow: hidden;
//   }

//   .msg-window {
//     flex: 1;
//     overflow-y: auto;
//     padding: 20px 20px 10px;
//     display: flex;
//     flex-direction: column;
//     gap: 14px;
//     min-height: 0;
//   }

//   .msg-window::-webkit-scrollbar { width: 5px; }
//   .msg-window::-webkit-scrollbar-track { background: transparent; }
//   .msg-window::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }

//   .empty-chat {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     flex: 1;
//     gap: 10px;
//     color: #9ca3af;
//     font-size: 13px;
//     font-weight: 600;
//     padding: 40px 0;
//   }

//   .empty-chat-icon {
//     width: 52px; height: 52px;
//     background: #f0f2f7;
//     border-radius: 16px;
//     display: flex; align-items: center; justify-content: center;
//     color: #c7d2fe;
//   }

//   .msg-row {
//     display: flex;
//     gap: 10px;
//     align-items: flex-end;
//   }

//   .msg-row.user { flex-direction: row-reverse; }

//   .msg-avatar {
//     width: 30px; height: 30px;
//     border-radius: 10px;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//   }

//   .msg-avatar.ai { background: linear-gradient(135deg, #1e3a8a, #3b5bdb); color: #fff; }
//   .msg-avatar.user { background: linear-gradient(135deg, #059669, #34d399); color: #fff; }

//   .msg-bubble {
//     max-width: 75%;
//     padding: 11px 15px;
//     border-radius: 16px;
//     font-size: 14px;
//     font-weight: 500;
//     line-height: 1.55;
//     word-break: break-word;
//   }

//   .msg-bubble.ai {
//     background: #f8f9fc;
//     border: 1.5px solid #e5e7eb;
//     color: #1f2937;
//     border-bottom-left-radius: 4px;
//   }

//   .msg-bubble.user {
//     background: linear-gradient(135deg, #3b5bdb, #4dabf7);
//     color: #fff;
//     border-bottom-right-radius: 4px;
//   }

//   .typing-row { display: flex; gap: 10px; align-items: flex-end; }

//   .typing-bubble {
//     background: #f0f2f7;
//     border: 1.5px solid #e5e7eb;
//     border-radius: 16px;
//     border-bottom-left-radius: 4px;
//     padding: 12px 18px;
//     display: flex;
//     gap: 5px;
//     align-items: center;
//   }

//   .dot {
//     width: 7px; height: 7px;
//     background: #9ca3af;
//     border-radius: 50%;
//     animation: blink 1.2s infinite;
//   }

//   .dot:nth-child(2) { animation-delay: 0.2s; }
//   .dot:nth-child(3) { animation-delay: 0.4s; }

//   @keyframes blink {
//     0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
//     40% { transform: scale(1.2); opacity: 1; }
//   }

//   .ai-input-bar {
//     display: flex;
//     gap: 10px;
//     padding: 16px 20px 20px;
//     border-top: 1.5px solid #f0f2f7;
//     align-items: flex-end;
//     flex-shrink: 0;
//     background: #fff;
//   }

//   .ai-input {
//     flex: 1;
//     border: 2px solid #e5e7eb;
//     border-radius: 14px;
//     padding: 12px 16px;
//     font-size: 14px;
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 500;
//     color: #111827;
//     outline: none;
//     resize: none;
//     transition: border-color 0.2s;
//     background: #f9fafb;
//     min-height: 46px;
//     max-height: 120px;
//     line-height: 1.5;
//   }

//   .ai-input:focus {
//     border-color: #3b5bdb;
//     background: #fff;
//   }

//   .ai-input::placeholder { color: #9ca3af; }

//   .send-btn {
//     background: linear-gradient(135deg, #3b5bdb, #4dabf7);
//     color: #fff;
//     border: none;
//     border-radius: 14px;
//     width: 46px; height: 46px;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer;
//     box-shadow: 0 4px 12px rgba(59,91,219,0.35);
//     transition: transform 0.15s, box-shadow 0.15s;
//     flex-shrink: 0;
//   }

//   .send-btn:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 6px 16px rgba(59,91,219,0.4);
//   }

//   .send-btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none;
//   }

//   @media (max-width: 768px) {
//     .ai-wrap {
//       height: calc(100vh - 110px);
//       min-height: 420px;
//       border-radius: 14px;
//     }

//     .ai-hamburger {
//       display: flex;
//     }

//     .ai-topbar {
//       padding: 14px 16px;
//     }

//     .ai-topbar-icon {
//       width: 36px; height: 36px;
//       border-radius: 10px;
//     }

//     .ai-topbar-title {
//       font-size: 14px;
//     }

//     .ai-topbar-sub {
//       font-size: 11px;
//     }

//     .ai-sidebar {
//       position: absolute;
//       top: 0;
//       left: 0;
//       bottom: 0;
//       width: 260px;
//       max-width: 80vw;
//       transform: translateX(-100%);
//       box-shadow: 4px 0 20px rgba(0,0,0,0.15);
//       border-right: none;
//       border-radius: 0 16px 16px 0;
//       padding: 16px;
//     }

//     .ai-sidebar.open {
//       transform: translateX(0);
//     }

//     .ai-overlay.show {
//       display: block;
//     }

//     .sidebar-close-btn {
//       display: flex;
//     }

//     .msg-window {
//       padding: 16px 14px 10px;
//     }

//     .msg-bubble {
//       max-width: 85%;
//       font-size: 13px;
//       padding: 10px 13px;
//     }

//     .msg-avatar {
//       width: 26px; height: 26px;
//       border-radius: 8px;
//     }

//     .ai-input-bar {
//       padding: 12px 14px 16px;
//       gap: 8px;
//     }

//     .ai-input {
//       padding: 10px 14px;
//       font-size: 13px;
//       border-radius: 12px;
//       min-height: 42px;
//     }

//     .send-btn {
//       width: 42px; height: 42px;
//       border-radius: 12px;
//     }
//   }

//   @media (max-width: 480px) {
//     .ai-wrap {
//       height: calc(100vh - 95px);
//       min-height: 360px;
//     }

//     .ai-topbar {
//       padding: 12px;
//       gap: 8px;
//     }

//     .ai-topbar-title { font-size: 13px; }
//     .ai-topbar-sub { font-size: 10px; }

//     .ai-topbar-icon {
//       width: 32px; height: 32px;
//       border-radius: 8px;
//     }

//     .ai-hamburger {
//       width: 34px; height: 34px;
//       border-radius: 8px;
//     }

//     .ai-sidebar {
//       width: 240px;
//     }

//     .msg-window {
//       padding: 12px 10px 8px;
//       gap: 10px;
//     }

//     .ai-input-bar {
//       padding: 10px 10px 14px;
//     }
//   }
// `

// function AIChat() {
//   const [question, setQuestion] = useState("")
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [chatId, setChatId] = useState(null)
//   const [chatList, setChatList] = useState([])
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const bottomRef = useRef(null)

//   let userId = localStorage.getItem("userId")
//   if (!userId) {
//     userId = crypto.randomUUID()
//     localStorage.setItem("userId", userId)
//   }

//   useEffect(() => { fetchChats() }, [])

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages, loading])

//   const fetchChats = async () => {
//     try {
//       const res = await API.get(`/ai/chats/${userId}`)
//       const chats = res.data || []
//       setChatList(chats)
//       if (chats.length > 0) loadChat(chats[0].chat_id)
//     } catch (err) { console.log("Fetch chats error:", err) }
//   }

//   const loadChat = async (id) => {
//     try {
//       setChatId(id)
//       const res = await API.get(`/ai/${userId}/${id}`)
//       const formatted = (res.data || []).map(m => ({ type: m.role, text: m.message }))
//       setMessages(formatted)
//       setSidebarOpen(false)
//     } catch (err) { console.log("Load chat error:", err) }
//   }

//   const newChat = () => {
//     setChatId(null)
//     setMessages([])
//     setSidebarOpen(false)
//   }

//   const askAI = async () => {
//     if (!question.trim() || loading) return
//     const userMsg = { type: "user", text: question }
//     setMessages(prev => [...prev, userMsg])
//     const currentQuestion = question
//     setQuestion("")
//     setLoading(true)
//     try {
//       const res = await API.post("/ai/ask", {
//         question: currentQuestion,
//         user_id: userId,
//         chat_id: chatId
//       })
//       const aiMsg = { type: "ai", text: res.data.answer }
//       setMessages(prev => [...prev, aiMsg])
//       if (!chatId && res.data.chat_id) {
//         setChatId(res.data.chat_id)
//         fetchChats()
//       }
//     } catch (err) {
//       console.log("AI ERROR:", err)
//     }
//     setLoading(false)
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       askAI()
//     }
//   }

//   return (
//     <div className="ai-wrap">
//       <style>{aiChatStyle}</style>

//       <div className="ai-topbar">
//         <button
//           className="ai-hamburger"
//           onClick={() => setSidebarOpen(true)}
//         >
//           <Menu size={20} />
//         </button>

//         <div className="ai-topbar-icon">
//           <Sparkles size={20} color="#fff" />
//         </div>

//         <div>
//           <div className="ai-topbar-title">AI Doubt Solver</div>
//           <div className="ai-topbar-sub">Always ready to help</div>
//         </div>

//         <div className="ai-live-dot" />
//       </div>

//       <div className="ai-body">
//         <div
//           className={`ai-overlay ${sidebarOpen ? "show" : ""}`}
//           onClick={() => setSidebarOpen(false)}
//         />

//         <div className={`ai-sidebar ${sidebarOpen ? "open" : ""}`}>
//           <button
//             className="sidebar-close-btn"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X size={20} />
//           </button>

//           <button onClick={newChat} className="new-chat-btn">
//             <Plus size={15} /> New Chat
//           </button>

//           <div className="sidebar-label">History</div>

//           <div className="chat-history">
//             {chatList.length === 0 && (
//               <div className="no-chats">No chats yet</div>
//             )}
//             {chatList.map((c, i) => (
//               <div
//                 key={i}
//                 onClick={() => loadChat(c.chat_id)}
//                 className={`chat-history-item ${chatId === c.chat_id ? "active" : ""}`}
//               >
//                 <MessageSquare size={13} />
//                 Chat {i + 1}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="ai-chat-area">
//           <div className="msg-window">
//             {messages.length === 0 && !loading && (
//               <div className="empty-chat">
//                 <div className="empty-chat-icon">
//                   <Bot size={26} />
//                 </div>
//                 Ask your doubts — I'm here to help 🚀
//               </div>
//             )}

//             {messages.map((m, i) => (
//               <div key={i} className={`msg-row ${m.type === "user" ? "user" : ""}`}>
//                 <div className={`msg-avatar ${m.type}`}>
//                   {m.type === "user" ? <User size={14} /> : <Bot size={14} />}
//                 </div>
//                 <div className={`msg-bubble ${m.type}`}>{m.text}</div>
//               </div>
//             ))}

//             {loading && (
//               <div className="typing-row">
//                 <div className="msg-avatar ai"><Bot size={14} /></div>
//                 <div className="typing-bubble">
//                   <div className="dot" />
//                   <div className="dot" />
//                   <div className="dot" />
//                 </div>
//               </div>
//             )}

//             <div ref={bottomRef} />
//           </div>

//           <div className="ai-input-bar">
//             <textarea
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Ask your doubt... (Shift+Enter for new line)"
//               className="ai-input"
//               rows={1}
//             />
//             <button onClick={askAI} className="send-btn" disabled={loading || !question.trim()}>
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AIChat