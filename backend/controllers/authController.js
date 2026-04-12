// // const supabase = require("../config/supabase")
// // const bcrypt = require("bcryptjs")
// // const jwt = require("jsonwebtoken")

// // // Register
// // exports.register = async (req, res) => {
// //   const { full_name, email, password, role, phone } = req.body


// //     // this block is added
// //   const { data: existingUser } = await supabase
// //     .from("users")
// //     .select("*")
// //     .eq("email", email)
// //     .single()

// //   if (existingUser) {
// //     return res.status(400).json({ message: "Email already registered" })
// //   }

// //   const hashedPassword = await bcrypt.hash(password, 10)

// //   const { data, error } = await supabase
// //     .from("users")
// //     .insert([
// //       {
// //         full_name,
// //         email,
// //         password_hash: hashedPassword,
// //         role,
// //         phone
// //       }
// //     ])
// //     .select()

// //   if (error) return res.status(400).json(error)

// //   res.status(201).json({
// //     message: "User registered successfully",
// //     user: data[0]
// //   })
// // }

// // // Login
// // exports.login = async (req, res) => {
// //   const { email, password } = req.body

// //   const { data: users, error } = await supabase
// //     .from("users")
// //     .select("*")
// //     .eq("email", email)

// //   if (error || users.length === 0)
// //     return res.status(400).json({ message: "Invalid credentials" })

// //   const user = users[0]

// //   const isMatch = await bcrypt.compare(password, user.password_hash)

// //   if (!isMatch)
// //     return res.status(400).json({ message: "Invalid credentials" })

// //   const token = jwt.sign(
// //     // { id: user.id, role: user.role },
// //     { id: user.id, role: user.role.trim() },
// //     process.env.JWT_SECRET,
// //     { expiresIn: "1d" }
// //   )

// //   res.json({
// //     message: "Login successful",
// //     token,
// //     user: {
// //       id: user.id,
// //       full_name: user.full_name,
// //       // role: user.role
// //       role: user.role.trim()
// //     }
// //   })
// // }




// const supabase = require("../config/supabase")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// // =======================
// // REGISTER
// // =======================
// exports.register = async (req, res) => {
//   try {
//     const { full_name, email, password, role, phone } = req.body

//     // check existing user
//     const { data: existingUser, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle()

//     if (fetchError) {
//       return res.status(400).json({ message: fetchError.message })
//     }

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" })
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // insert user
//     const { data, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           password_hash: hashedPassword,
//           role: role.trim(),
//           phone
//         }
//       ])
//       .select()

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     res.status(201).json({
//       message: "User registered successfully",
//       user: data[0]
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // LOGIN
// // =======================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     const { data: users, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)

//     if (error || users.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     const user = users[0]

//     const isMatch = await bcrypt.compare(password, user.password_hash)

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     const role = user.role.trim()

//     const token = jwt.sign(
//       { id: user.id, role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     )

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         full_name: user.full_name,
//         email: user.email,
//         role
//       }
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // FORGOT PASSWORD
// // =======================
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body

//     const { data: user, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle()

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     if (!user) {
//       return res.status(400).json({ message: "User not found" })
//     }

//     // create reset token
//     const resetToken = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     )

//     // ⚠️ abhi ke liye response me bhej rahe hain
//     // later: email via nodemailer

//     res.json({
//       message: "Reset token generated",
//       resetToken
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }



// module.exports = { verifyToken, isAdmin, allowRoles }
// const supabase = require("../config/supabase")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// // =======================
// // REGISTER
// // =======================
// exports.register = async (req, res) => {
//   try {
//     const { full_name, email, password, role, phone } = req.body

//     const { data: existingUser, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle()

//     if (fetchError) {
//       return res.status(400).json({ message: fetchError.message })
//     }

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const { data, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           password_hash: hashedPassword,
//           role: role.trim(),
//           phone
//         }
//       ])
//       .select()

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     res.status(201).json({
//       message: "User registered successfully",
//       user: data[0]
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // LOGIN
// // =======================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     const { data: users, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)

//     if (error || users.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     const user = users[0]

//     const isMatch = await bcrypt.compare(password, user.password_hash)

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     const role = user.role.trim()

//     const token = jwt.sign(
//       { id: user.id, role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     )

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         full_name: user.full_name,
//         email: user.email,
//         role
//       }
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // FORGOT PASSWORD (UPDATED ✅)
// // =======================
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body

//     const { data: user, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle()

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     if (!user) {
//       return res.status(400).json({ message: "User not found" })
//     }

//     const resetToken = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     )

//     // 🔥 IMPORTANT CHANGE HERE
//     const resetLink = `http://localhost:5173/reset-password/${resetToken}`

//     res.json({
//       message: "Reset link generated",
//       resetLink
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // RESET PASSWORD
// // =======================
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body

//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     const userId = decoded.id

//     const hashedPassword = await bcrypt.hash(newPassword, 10)

//     const { error } = await supabase
//       .from("users")
//       .update({ password_hash: hashedPassword })
//       .eq("id", userId)

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     res.json({ message: "Password reset successful" })

//   } catch (err) {
//     res.status(400).json({ message: "Invalid or expired token" })
//   }
// }


// const supabase = require("../config/supabase")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// // =======================
// // REGISTER
// // =======================
// exports.register = async (req, res) => {
//   try {
//     const { full_name, email, password, role, phone } = req.body

//     const { data: existingUser, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle()

//     if (fetchError) {
//       return res.status(400).json({ message: fetchError.message })
//     }

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const { data, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           password_hash: hashedPassword,
//           role: role.trim(),
//           phone
//         }
//       ])
//       .select()

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     res.status(201).json({
//       message: "User registered successfully",
//       user: data[0]
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // LOGIN
// // =======================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     const { data: users, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)

//     if (error || users.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     const user = users[0]

//     const isMatch = await bcrypt.compare(password, user.password_hash)

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     const role = user.role.trim()

//     const token = jwt.sign(
//       { id: user.id, role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     )

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         full_name: user.full_name,
//         email: user.email,
//         role
//       }
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // FORGOT PASSWORD (UPDATED ✅)
// // =======================
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body

//     const { data: user, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle()

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     if (!user) {
//       return res.status(400).json({ message: "User not found" })
//     }

//     const resetToken = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     )

//     // 🔥 IMPORTANT CHANGE HERE
//     const resetLink = `http://localhost:5173/reset-password/${resetToken}`

//     res.json({
//       message: "Reset link generated",
//       resetLink
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }


// // =======================
// // RESET PASSWORD
// // =======================
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body

//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     const userId = decoded.id

//     const hashedPassword = await bcrypt.hash(newPassword, 10)

//     const { error } = await supabase
//       .from("users")
//       .update({ password_hash: hashedPassword })
//       .eq("id", userId)

//     if (error) {
//       return res.status(400).json({ message: error.message })
//     }

//     res.json({ message: "Password reset successful" })

//   } catch (err) {
//     res.status(400).json({ message: "Invalid or expired token" })
//   }
// }










// // const supabase = require("../config/supabase")
// // const bcrypt = require("bcryptjs")
// // const jwt = require("jsonwebtoken")

// // // Admin creates student/teacher
// // exports.createUserByAdmin = async (req, res) => {
// //   try {
// //     const { full_name, email, password, role, phone } = req.body

// //     // only student or teacher can be created from here
// //     if (!["student", "teacher"].includes(role)) {
// //       return res.status(400).json({ message: "Only student or teacher can be created" })
// //     }

// //     const { data: existingUser, error: existingError } = await supabase
// //       .from("users")
// //       .select("*")
// //       .eq("email", email)
// //       .maybeSingle()

// //     if (existingError) {
// //       return res.status(400).json({ message: existingError.message })
// //     }

// //     if (existingUser) {
// //       return res.status(400).json({ message: "Email already registered" })
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10)

// //     const { data, error } = await supabase
// //       .from("users")
// //       .insert([
// //         {
// //           full_name,
// //           email,
// //           password_hash: hashedPassword,
// //           role: role.trim(),
// //           phone
// //         }
// //       ])
// //       .select()

// //     if (error) {
// //       return res.status(400).json({ message: error.message })
// //     }

// //     res.status(201).json({
// //       message: `${role} created successfully by admin`,
// //       user: data[0]
// //     })
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" })
// //   }
// // }

// // // Login
// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body

// //     const { data: users, error } = await supabase
// //       .from("users")
// //       .select("*")
// //       .eq("email", email)

// //     if (error || users.length === 0) {
// //       return res.status(400).json({ message: "Invalid credentials" })
// //     }

// //     const user = users[0]

// //     const isMatch = await bcrypt.compare(password, user.password_hash)

// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid credentials" })
// //     }

// //     const role = user.role.trim()

// //     const token = jwt.sign(
// //       { id: user.id, role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     )

// //     res.json({
// //       message: "Login successful",
// //       token,
// //       user: {
// //         id: user.id,
// //         full_name: user.full_name,
// //         email: user.email,
// //         role
// //       }
// //     })
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" })
// //   }
// // }












// // controllers/authController.js
// const supabase = require("../config/supabase");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const emailService = require("../services/emailService")

// // =======================
// // ADMIN CREATE USER (Student/Teacher)
// // =======================
// exports.createUserByAdmin = async (req, res) => {
//   try {
//     const { full_name, email, password, role, phone } = req.body;

//     // Only allow student or teacher
//     if (!["student", "teacher"].includes(role?.toLowerCase())) {
//       return res.status(400).json({ 
//         message: "Only 'student' or 'teacher' role can be created by admin" 
//       });
//     }

//     const { data: existingUser } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle();

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const { data, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           password_hash: hashedPassword,
//           role: role.toLowerCase().trim(),
//           phone,
//         },
//       ])
//       .select();

//     if (error) return res.status(400).json({ message: error.message });

//     res.status(201).json({
//       message: `${role} created successfully by admin`,
//       user: data[0],
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // =======================
// // LOGIN
// // =======================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const { data: users, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email);

//     if (error || users.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const user = users[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const role = user.role.trim();

//     const token = jwt.sign(
//       { id: user.id, role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         full_name: user.full_name,
//         email: user.email,
//         role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // =======================
// // FORGOT PASSWORD
// // =======================
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const { data: user, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .maybeSingle();

//     if (error) return res.status(400).json({ message: error.message });

//     // security purpose
//     if (!user) {
//       return res.json({
//         message: "If email exists, reset link sent"
//       });
//     }

//     const resetToken = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

//     // 🔥 EMAIL SEND HERE
//     await emailService(
//       email,
//       "Reset Password",
//       `
//         <h2>Hello ${user.full_name}</h2>
//         <p>Click below to reset your password:</p>
//         <a href="${resetLink}" 
//            style="padding:10px 20px;background:#4F46E5;color:white;text-decoration:none;">
//           Reset Password
//         </a>
//       `
//     );

//     res.json({
//       message: "Reset link sent to email"
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // =======================
// // RESET PASSWORD (using token)
// // =======================
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const { error } = await supabase
//       .from("users")
//       .update({ password_hash: hashedPassword })
//       .eq("id", decoded.id);

//     if (error) return res.status(400).json({ message: error.message });

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     res.status(400).json({ message: "Invalid or expired token" });
//   }
// };

// // =======================
// // RESET OWN PASSWORD (Logged in user)
// // =======================
// exports.resetOwnPassword = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { currentPassword, newPassword } = req.body;

//     const { data: user, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .maybeSingle();

//     if (error || !user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Current password is incorrect" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const { error: updateError } = await supabase
//       .from("users")
//       .update({ password_hash: hashedPassword })
//       .eq("id", userId);

//     if (updateError) {
//       return res.status(400).json({ message: updateError.message });
//     }

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


















const supabase = require("../config/supabase")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../services/emailService")

// =======================
// ADMIN CREATE USER
// =======================
exports.createUserByAdmin = async (req, res) => {
  try {
    const { full_name, email, password, role, phone } = req.body

    if (!["student", "teacher"].includes(role?.toLowerCase())) {
      return res.status(400).json({
        message: "Only student or teacher can be created"
      })
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle()

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from("users")
      .insert([{
        full_name,
        email,
        password_hash: hashedPassword,
        role: role.toLowerCase().trim(),
        phone
      }])
      .select()

    if (error) return res.status(400).json({ message: error.message })

    // Welcome email bhejo student/teacher ko
    try {
      await sendEmail(
        email,
        "Welcome to SDJPS - Your Account Details",
        `
          <h2>Welcome ${full_name}!</h2>
          <p>Your <strong>${role}</strong> account has been created.</p>
          <div style="background:#f5f5f5;padding:15px;margin:20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <p>Please login and change your password.</p>
          <a href="http://localhost:5173/login"
             style="background:#4F46E5;color:white;padding:10px 20px;
                    text-decoration:none;border-radius:5px;display:inline-block;">
            Login Here
          </a>
        `
      )
    } catch (emailErr) {
      console.log("Welcome email failed:", emailErr.message)
    }

    res.status(201).json({
      message: `${role} created successfully`,
      user: data[0]
    })
  } catch (err) {
    console.error("Create user error:", err)
    res.status(500).json({ message: "Server error" })
  }
}

// =======================
// LOGIN
// =======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)

    if (error || users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const user = users[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const role = user.role.trim()

    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role
      }
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ message: "Server error" })
  }
}

// =======================
// FORGOT PASSWORD (Email bhejega)
// =======================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle()

    if (error) return res.status(400).json({ message: error.message })

    if (!user) {
      return res.json({ message: "If email exists, reset link sent" })
    }

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    )

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`

    // ✅ CORRECT WAY — sendEmail function call
    await sendEmail(
      email,
      "Reset Your Password - SDJPS",
      `
        <div style="font-family:Arial;max-width:600px;margin:0 auto;">
          <h2>Hello ${user.full_name},</h2>
          <p>You requested a password reset.</p>
          <p>Click the button below:</p>
          <a href="${resetLink}"
             style="display:inline-block;background:#4F46E5;color:white;
                    padding:12px 24px;text-decoration:none;border-radius:5px;
                    margin:20px 0;">
            Reset Password
          </a>
          <p>Or copy this link:</p>
          <p style="background:#f5f5f5;padding:10px;word-break:break-all;">
            ${resetLink}
          </p>
          <p style="color:#666;font-size:12px;">
            Link expires in 15 minutes.
          </p>
        </div>
      `
    )

    console.log("✅ Reset email sent to:", email)

    res.json({ message: "Reset link sent to email" })

  } catch (err) {
    console.error("❌ Forgot password error:", err)
    res.status(500).json({
      message: "Failed to send email",
      error: err.message
    })
  }
}

// =======================
// RESET PASSWORD (Token se)
// =======================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const { error } = await supabase
      .from("users")
      .update({ password_hash: hashedPassword })
      .eq("id", decoded.id)

    if (error) return res.status(400).json({ message: error.message })

    res.json({ message: "Password reset successful" })
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" })
  }
}

// =======================
// CHANGE OWN PASSWORD (Logged in)
// =======================
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
    console.error("Change password error:", err)
    res.status(500).json({ message: "Server error" })
  }
}