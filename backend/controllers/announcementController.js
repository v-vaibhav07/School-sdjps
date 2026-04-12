// const supabase = require("../config/supabase")

// // Send announcement
// exports.createAnnouncement = async (req, res) => {
//   const { class_id, message } = req.body

//   const { data, error } = await supabase
//     .from("class_announcements")
//     .insert([
//       {
//         class_id,
//         sender_id: req.user.id,
//         message
//       }
//     ])

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement sent successfully" })
// }

// // Get class announcements
// exports.getAnnouncements = async (req, res) => {
//   const { class_id } = req.query

//   const { data, error } = await supabase
//     .from("class_announcements")
//     .select(`
//       id,
//       message,
//       is_pinned,
//       created_at,
//       users(full_name)
//     `)
//     .eq("class_id", class_id)
//     .order("created_at", { ascending: false })

//   if (error) return res.status(400).json(error)

//   res.json(data)
// }

// // Pin message
// exports.pinAnnouncement = async (req, res) => {
//   const { id } = req.params

//   const { data, error } = await supabase
//     .from("class_announcements")
//     .update({ is_pinned: true })
//     .eq("id", id)

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement pinned" })
// }

// // Delete message
// exports.deleteAnnouncement = async (req, res) => {
//   const { id } = req.params

//   const { error } = await supabase
//     .from("class_announcements")
//     .delete()
//     .eq("id", id)

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement deleted" })
// }


// ye uper pura woking code h





















const supabase = require("../config/supabase")
// exports.createAnnouncement = async (req, res) => {

//   // const { class_id = null, message } = req.body
//   const { class_id = null, message, target_type } = req.body

//   // 🔴 MESSAGE VALIDATION
//   if (!message || message.trim() === "") {
//     return res.status(400).json({
//       error: "Announcement message required"
//     })
//   }

//   const { data, error } = await supabase
//     .from("class_announcements")
//     // .insert([
//     //   {
//     //     class_id,
//     //     sender_id: req.user.id,
//     //     message
//     //   }
//     // ])/

//     .insert([
//   {
//     class_id,
//     sender_id: req.user.id,
//     message,
//     target_type: "teacher" || "teacher"
//   }
// ])

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement sent successfully" })
// }







// exports.createAnnouncement = async (req, res) => {

//   const { class_id = null, message, target_type } = req.body

//   if (!message || message.trim() === "") {
//     return res.status(400).json({
//       error: "Message required"
//     })
//   }

//   if (target_type === "class" && !class_id) {
//     return res.status(400).json({
//       error: "Class required"
//     })
//   }

//   const { error } = await supabase
//     .from("class_announcements")
//     .insert([{
//       class_id: target_type === "class" ? class_id : null,
//       sender_id: req.user.id,
//       message,
//       target_type   // ✅ EXACT VALUE SAVE
//     }])

//   if (error) {
//     console.log(error)
//     return res.status(400).json(error)
//   }

//   res.json({ message: "Announcement sent ✅" })
// } ye sahi kam kar raha h 
exports.createAnnouncement = async (req, res) => {
  try {

    const { class_id = null, message, target_type } = req.body

    // 🔴 MESSAGE VALIDATION
    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message required"
      })
    }

    // 🔴 TARGET TYPE VALIDATION (🔥 IMPORTANT)
    if (!target_type) {
      return res.status(400).json({
        error: "target_type required"
      })
    }

    // 🔴 ALLOWED TYPES CHECK
    const allowedTypes = ["all", "class", "teacher"]

    if (!allowedTypes.includes(target_type)) {
      return res.status(400).json({
        error: "Invalid target_type"
      })
    }

    // 🔴 CLASS VALIDATION
    if (target_type === "class" && !class_id) {
      return res.status(400).json({
        error: "class_id required for class announcement"
      })
    }

    // ✅ INSERT
    const { error } = await supabase
      .from("class_announcements")
      .insert([
        {
          class_id: target_type === "class" ? class_id : null,
          sender_id: req.user.id,
          message: message.trim(),
          target_type
        }
      ])

    if (error) {
      console.log("INSERT ERROR:", error)
      return res.status(400).json(error)
    }

    res.json({
      message: "Announcement sent successfully ✅"
    })

  } catch (err) {
    console.log("SERVER ERROR:", err)
    res.status(500).json({
      error: err.message
    })
  }
}









// exports.createAnnouncement = async (req, res) => {

//   const { class_id = null, message, target_type } = req.body

//   if (!message || message.trim() === "") {
//     return res.status(400).json({
//       error: "Message required"
//     })
//   }

//   // ✅ VALIDATION
//   if (target_type === "class" && !class_id) {
//     return res.status(400).json({
//       error: "Class required"
//     })
//   }

//   const { error } = await supabase
//     .from("class_announcements")
//     .insert([{
//       class_id: target_type === "class" ? class_id : null,
//       sender_id: req.user.id,
//       message,
//       target_type // ✅ "all" | "class" | "teacher"
//     }])

//   if (error) {
//     console.log(error)
//     return res.status(400).json(error)
//   }

//   res.json({ message: "Announcement sent ✅" })
// }






// Get class announcements
// exports.getAnnouncements = async (req,res)=>{

//   const { class_id } = req.query

// let query = supabase
// .from("class_announcements")
// .select(`
//   id,
//   message,
//   target_type,
//   is_pinned,
//   created_at,
//   users(full_name)
// `)
// .eq("target_type", "teacher")
// .order("created_at",{ascending:false})

//   if(class_id){
//     query = query.eq("class_id",class_id)
//   }

//   const {data,error} = await query

//   if(error) return res.status(400).json(error)

//   res.json(data)

// }
exports.getAnnouncements = async (req,res)=>{

  const { class_id } = req.query

  let query = supabase
    .from("class_announcements")
    .select(`
      id,
      message,
      target_type,
      is_pinned,
      created_at,
      users(full_name)
    `)
    .order("created_at",{ascending:false})

  if(class_id){
    query = query.eq("class_id",class_id)
  }

  const {data,error} = await query

  if(error) return res.status(400).json(error)

  res.json(data)
}

// Pin message
exports.pinAnnouncement = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from("class_announcements")
    .update({ is_pinned: true })
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Announcement pinned" })
}

// Delete message
exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from("class_announcements")
    .delete()
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Announcement deleted" })
}
exports.getAdminFeed = async (req,res)=>{

const {data,error} = await supabase
.from("class_announcements")
.select(`
id,
message,
target_type,
is_pinned,
created_at,
users(full_name)
`)
.order("created_at",{ascending:false})

if(error) return res.status(400).json(error)

res.json(data)

}