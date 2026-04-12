// const express = require("express")
// const router = express.Router()
// const axios = require("axios")

// router.post("/ask", async (req, res) => {

//   const { question } = req.body

//   try {

//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "openrouter/auto", // 🔥 auto free model
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful school tutor. Explain in simple way."
//           },
//           {
//             role: "user",
//             content: question
//           }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     )

//     const answer = response.data.choices[0].message.content

//     res.json({ answer })

//   } catch (err) {

//     console.log("AI ERROR:", err.response?.data || err.message)

//     res.json({
//       answer: "⚠️ AI error — try again"
//     })
//   }

// })

// module.exports = router



















// const express = require("express")
// const router = express.Router()
// const axios = require("axios")
// const supabase = require("../config/supabase")

// // ASK AI
// router.post("/ask", async (req, res) => {

//   const { question, user_id } = req.body

//   try {

//     // 🔹 Save user message
//     await supabase.from("ai_chats").insert([
//       {
//         user_id,
//         role: "user",
//         message: question
//       }
//     ])

//     // 🔹 AI call
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "openrouter/auto",
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful school tutor."
//           },
//           {
//             role: "user",
//             content: question
//           }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     )

//     const answer = response.data.choices[0].message.content

//     // 🔹 Save AI response
//     await supabase.from("ai_chats").insert([
//       {
//         user_id,
//         role: "ai",
//         message: answer
//       }
//     ])

//     res.json({ answer })

//   } catch (err) {

//     console.log(err)

//     res.json({
//       answer: "⚠️ AI error"
//     })
//   }

// })


// // GET CHAT HISTORY
// router.get("/:userId", async (req, res) => {

//   const { userId } = req.params

//   const { data } = await supabase
//     .from("ai_chats")
//     .select("*")
//     .eq("user_id", userId)
//     .order("created_at", { ascending: true })

//   res.json(data)

// })

// module.exports = router

































// const express = require("express")
// const router = express.Router()
// const axios = require("axios")
// const supabase = require("../config/supabase")
// const { v4: uuidv4 } = require("uuid")

// // ==========================
// // 🔥 ASK AI (WITH CONTEXT)
// // ==========================

// router.post("/ask", async (req, res) => {

//   const { question, user_id, chat_id } = req.body

//   try {

//     // 🔥 STEP 1: chat id generate
//     let finalChatId = chat_id

//     if (!finalChatId) {
//       finalChatId = uuidv4()
//     }

//     // 🔥 STEP 2: GET OLD MESSAGES (context memory)
//     const { data: oldMessages } = await supabase
//       .from("ai_chats")
//       .select("role, message")
//       .eq("user_id", user_id)
//       .eq("chat_id", finalChatId)
//       .order("created_at", { ascending: true })

//     // 🔥 STEP 3: FORMAT FOR AI
//     const messages = [
//       {
//         role: "system",
//         content: "You are a helpful school tutor. Explain in simple way."
//       }
//     ]

//     if (oldMessages && oldMessages.length > 0) {
//       oldMessages.forEach(m => {
//         messages.push({
//           role: m.role === "ai" ? "assistant" : "user",
//           content: m.message
//         })
//       })
//     }

//     // 🔥 CURRENT QUESTION ADD
//     messages.push({
//       role: "user",
//       content: question
//     })

//     // 🔥 STEP 4: SAVE USER MESSAGE
//     await supabase.from("ai_chats").insert([
//       {
//         user_id,
//         chat_id: finalChatId,
//         role: "user",
//         message: question
//       }
//     ])

//     // 🔥 STEP 5: AI CALL
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "openrouter/auto",
//         messages: messages
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     )

//     const answer = response.data.choices[0].message.content

//     // 🔥 STEP 6: SAVE AI RESPONSE
//     await supabase.from("ai_chats").insert([
//       {
//         user_id,
//         chat_id: finalChatId,
//         role: "ai",
//         message: answer
//       }
//     ])

//     // 🔥 RESPONSE
//     res.json({
//       answer,
//       chat_id: finalChatId
//     })

//   } catch (err) {

//     console.log("AI ERROR:", err.response?.data || err.message)

//     res.json({
//       answer: "⚠️ AI error — try again"
//     })
//   }

// })


// // ==========================
// // 🔥 GET CHAT LIST
// // ==========================

// router.get("/chats/:userId", async (req, res) => {

//   const { userId } = req.params

//   const { data } = await supabase
//     .from("ai_chats")
//     .select("chat_id, created_at")
//     .eq("user_id", userId)
//     .order("created_at", { ascending: false })

//   const unique = [...new Set(data.map(d => d.chat_id))]

//   res.json(unique.map(id => ({ chat_id: id })))
// })


// // ==========================
// // 🔥 GET SINGLE CHAT
// // ==========================

// router.get("/:userId/:chatId", async (req, res) => {

//   const { userId, chatId } = req.params

//   const { data } = await supabase
//     .from("ai_chats")
//     .select("*")
//     .eq("user_id", userId)
//     .eq("chat_id", chatId)
//     .order("created_at", { ascending: true })

//   res.json(data)
// })


// // ==========================
// // 🔥 (OPTIONAL) ALL HISTORY
// // ==========================

// router.get("/:userId", async (req, res) => {

//   const { userId } = req.params

//   const { data } = await supabase
//     .from("ai_chats")
//     .select("*")
//     .eq("user_id", userId)
//     .order("created_at", { ascending: true })

//   res.json(data)
// })

// module.exports = router




























const express = require("express")
const router = express.Router()
const axios = require("axios")
const supabase = require("../config/supabase")
const { randomUUID } = require("crypto") // ✅ better than uuid

// ==========================
// 🔥 ASK AI (WITH CONTEXT)
// ==========================

router.post("/ask", async (req, res) => {

  const { question, user_id, chat_id } = req.body

  console.log(user_id)

  // ✅ SAFETY CHECK
  if (!user_id) {
    return res.json({ answer: "User ID missing ❌" })
  }

  try {

    // 🔥 STEP 1: chat id
    const finalChatId = chat_id || randomUUID()
    // 🔥 STEP 2: GET OLD MESSAGES
    const { data: oldMessages, error: fetchError } = await supabase
      .from("ai_chats")
      .select("role, message")
      .eq("user_id", user_id)
      .eq("chat_id", finalChatId)
      .order("created_at", { ascending: true })   

    


    if (fetchError) {
      console.log("FETCH ERROR:", fetchError)
    }

    // 🔥 STEP 3: FORMAT
    const messages = [
      {
        role: "system",
        content: "You are a helpful school tutor. Explain in simple way."
      }
    ]

    oldMessages?.forEach(m => {
      messages.push({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.message
      })
    })

    // 🔥 CURRENT QUESTION
    messages.push({
      role: "user",
      content: question
    })

    // 🔥 STEP 4: SAVE USER MSG
    const { error: userError } = await supabase
      .from("ai_chats")
      .insert([
        {
          user_id,
          chat_id: finalChatId,
          role: "user",
          message: question
        }
      ])

    


    if (userError) {
      console.log("USER SAVE ERROR:", userError)
    }

    // 🔥 STEP 5: AI CALL
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto",
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    


    const answer = response.data.choices[0].message.content

    // 🔥 STEP 6: SAVE AI MSG
    const { error: aiError } = await supabase
      .from("ai_chats")
      .insert([
        {
          user_id,
          chat_id: finalChatId,
          role: "ai",
          message: answer
        }
      ])

    if (aiError) {
      console.log("AI SAVE ERROR:", aiError)
    }

    res.json({
      answer,
      chat_id: finalChatId
    })

  } catch (err) {

    console.log("AI ERROR:", err.response?.data || err.message)

    res.json({
      answer: "⚠️ AI error — try again"
    })
  }

})


// ==========================
// 🔥 GET CHAT LIST (FIXED)
// ==========================

router.get("/chats/:userId", async (req, res) => {

  const { userId } = req.params

  const { data, error } = await supabase
    .from("ai_chats")
    .select("chat_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.log("CHAT LIST ERROR:", error)
    return res.json([])
  }

  // ✅ UNIQUE CHAT IDs
  const uniqueChats = [...new Set(data.map(d => d.chat_id))]

  res.json(uniqueChats.map(id => ({ chat_id: id })))
})


// ==========================
// 🔥 GET SINGLE CHAT
// ==========================

router.get("/:userId/:chatId", async (req, res) => {

  const { userId, chatId } = req.params

  const { data, error } = await supabase
    .from("ai_chats")
    .select("*")
    .eq("user_id", userId)
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true })

  if (error) {
    console.log("CHAT FETCH ERROR:", error)
    return res.json([])
  }

  res.json(data)
})

module.exports = router