const supabase = require("../config/supabase")
const bcrypt = require("bcryptjs")

exports.resetOwnPassword = async (req, res) => {
  try {
    const userId = req.user.id
    const { currentPassword, newPassword } = req.body

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .maybeSingle()

    if (error || !user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash)

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: hashedPassword })
      .eq("id", userId)

    if (updateError) {
      return res.status(400).json({ message: updateError.message })
    }

    res.json({ message: "Password updated successfully" })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}