// controllers/calendarController.js

const supabase = require("../config/supabase")

// ============================
// Get All Events (month wise)
// ============================
// controllers/calendarController.js

exports.getEvents = async (req, res) => {
  try {
    const { month, year } = req.query

    let query = supabase
      .from("calendar_events")
      .select(`
        id,
        title,
        description,
        event_date,
        event_type,
        created_at,
        users (
          full_name
        )
      `)
      .order("event_date", { ascending: true })

    if (month && year) {
      // FIX: Calculate correct last day of month
      const startDate = `${year}-${String(month).padStart(2, "0")}-01`
      
      // Get last day of month (28-31)
      const lastDay = new Date(year, month, 0).getDate()
      const endDate = `${year}-${String(month).padStart(2, "0")}-${lastDay}`
      
      query = query.gte("event_date", startDate).lte("event_date", endDate)
    }

    const { data, error } = await query

    if (error) return res.status(400).json(error)

    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// Create Event (Admin only)
// ============================
exports.createEvent = async (req, res) => {
  try {
    const { title, description, event_date, event_type } = req.body
    const userId = req.user.id

    if (!title || !event_date) {
      return res.status(400).json({ message: "Title and date are required" })
    }

    const { data, error } = await supabase
      .from("calendar_events")
      .insert([{
        title,
        description: description || null,
        event_date,
        event_type:  event_type || "general",
        created_by:  userId
      }])
      .select()
      .single()

    if (error) return res.status(400).json(error)

    res.json({ message: "Event created successfully", event: data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// Update Event (Admin only)
// ============================
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, event_date, event_type } = req.body

    const { error } = await supabase
      .from("calendar_events")
      .update({ title, description, event_date, event_type })
      .eq("id", id)

    if (error) return res.status(400).json(error)

    res.json({ message: "Event updated successfully" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// Delete Event (Admin only)
// ============================
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", id)

    if (error) return res.status(400).json(error)

    res.json({ message: "Event deleted successfully" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}