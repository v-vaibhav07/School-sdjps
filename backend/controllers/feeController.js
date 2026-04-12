// const supabase = require("../config/supabase")

// // Admin create fee structure
// // exports.createFeeStructure = async (req, res) => {
// //   const { class_id, amount, due_date } = req.body

// //   const { data, error } = await supabase
// //     .from("fee_structure")
// //     .insert([{ class_id, amount, due_date }])

// //   if (error) return res.status(400).json(error)

// //   res.json({ message: "Fee structure created" })
// // }

// // // Student view fee
// exports.getStudentFees = async (req, res) => {
//   const { student_id } = req.params

//   const { data, error } = await supabase
//     .from("fee_payments")
//     .select("*")
//     .eq("student_id", student_id)

//   if (error) return res.status(400).json(error)

//   res.json(data)
// }

// exports.createFeeStructure = async (req, res) => {

//   const { class_id, amount, due_date, month } = req.body

//   try {

//     // 1️⃣ Create fee structure
//     const { data: fee, error: feeError } = await supabase
//       .from("fee_structure")
//       .insert([{ class_id, amount, due_date, month }])
//       .select()
//       .single()

//     if (feeError) return res.status(400).json(feeError)

//     // 2️⃣ Find students of that class
//     const { data: students, error: studentError } = await supabase
//       .from("students")
//       .select("id")
//       .eq("class_id", class_id)

//     if (studentError) return res.status(400).json(studentError)

//     // 3️⃣ Prepare student fee records
// const studentFees = students.map(student => ({
//   student_id: student.id,
//   fee_id: fee.id,
//   amount: amount,
//   status: "pending",
//   month: month
// })) 

//     // 4️⃣ Insert into student_fees
//     const { error: assignError } = await supabase
//       .from("student_fees")
//       .insert(studentFees)

//     if (assignError) return res.status(400).json(assignError)

//     res.json({
//       message: "Fee structure created and assigned to students"
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }


// // Pay fee
// // exports.payFee = async (req, res) => {
  
// //   const { student_id, fee_id, amount, payment_method } = req.body

// //   const { data, error } = await supabase
// //     .from("fee_payments")
// //     .insert([
// //       {
// //         student_id,
// //         fee_id,
// //         amount,
// //         payment_method,
// //         payment_status: "paid"
// //       }
// //     ])

// //   if (error) return res.status(400).json(error)

// //   res.json({ message: "Payment recorded successfully" })
// // }

// // exports.payFee = async (req, res) => {

// //   const { fee_id, amount, payment_method } = req.body

// //   // find student using logged-in user
// //   const { data: student, error: studentError } = await supabase
// //     .from("students")
// //     .select("id")
// //     .eq("user_id", req.user.id)
// //     .single()

// //   if (studentError) return res.status(400).json(studentError)

// //   const { data, error } = await supabase
// //     .from("fee_payments")
// //     .insert([
// //       {
// //         student_id: student.id,
// //         fee_id,
// //         amount,
// //         payment_method,
// //         payment_status: "paid"
// //       }
// //     ])

// //   if (error) return res.status(400).json(error)

// //   res.json({ message: "Payment recorded successfully" })
// // }



// exports.payFee = async (req, res) => {

//   const { fee_id, amount, payment_method } = req.body

//   // find student
//   const { data: student, error: studentError } = await supabase
//     .from("students")
//     .select("id, name")
//     .eq("user_id", req.user.id)
//     .single()

//   if (studentError) return res.status(400).json(studentError)

//   // 1️⃣ insert payment record
//   const { error: paymentError } = await supabase
//     .from("fee_payments")
//     .insert([
//       {
//         student_id: student.id,
//         student_name: student.name,
//         fee_id,
//         amount,
//         payment_method,
//         payment_status: "paid"
//       }
//     ])

//   if (paymentError) return res.status(400).json(paymentError)

//   // 2️⃣ get current paid amount
//   const { data: feeRecord, error: feeError } = await supabase
//     .from("student_fees")
//     .select("paid_amount")
//     .eq("student_id", student.id)
//     .eq("fee_id", fee_id)
//     .single()

//   if (feeError) return res.status(400).json(feeError)

//   const newPaid = feeRecord.paid_amount + amount

//   // 3️⃣ update paid amount
//   const { error: updateError } = await supabase
//     .from("student_fees")
//     .update({ paid_amount: newPaid })
//     .eq("student_id", student.id)
//     .eq("fee_id", fee_id)

//   if (updateError) return res.status(400).json(updateError)

//   res.json({
//     message: "Payment successful"
//   })

// }



// // Student Fee Dashboard
// exports.getStudentFeeDashboard = async (req, res) => {

//   const user_id = req.user.id

//   try {

//     // 1️⃣ Get student record
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, class_id")
//       .eq("user_id", user_id)
//       .single()

//     if (studentError) return res.status(400).json(studentError)

//     // 2️⃣ Get fee structure for student's class
//     const { data: feeStructure, error: feeError } = await supabase
//       .from("fee_structure")
//       .select("*")
//       .eq("class_id", student.class_id)
//       .single()

//     if (feeError) return res.status(400).json(feeError)

//     // 3️⃣ Get payments made by student
//     const { data: payments, error: paymentError } = await supabase
//       .from("fee_payments")
//       .select("amount")
//       .eq("student_id", student.id)

//     if (paymentError) return res.status(400).json(paymentError)

//     // 4️⃣ Calculate paid fee
//     let paid_fee = 0
//     payments.forEach(p => {
//       paid_fee += p.amount
//     })

//     const total_fee = feeStructure.amount
//     const pending_fee = total_fee - paid_fee

//     // 5️⃣ Late fine calculation
//     const today = new Date()
//     const dueDate = new Date(feeStructure.due_date)

//     let late_fine = 0

//     if (today > dueDate && pending_fee > 0) {
//       const daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
//       late_fine = daysLate * 10 // ₹10 per day fine
//     }

//     res.json({
//       total_fee,
//       paid_fee,
//       pending_fee,
//       due_date: feeStructure.due_date,
//       late_fine
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }


// // ============================
// // Admin Financial Dashboard
// // ============================
// exports.getAdminFinanceDashboard = async (req, res) => {

//   try {

//     // 1️⃣ Total fee collected
//     const { data: payments, error: paymentError } = await supabase
//       .from("fee_payments")
//       .select("amount")

//     if (paymentError) return res.status(400).json(paymentError)

//     let total_collected = 0
//     payments.forEach(p => {
//       total_collected += p.amount
//     })


//     // 2️⃣ Total expected fee
//     const { data: feeStructures, error: feeError } = await supabase
//       .from("fee_structure")
//       .select("class_id, amount")

//     if (feeError) return res.status(400).json(feeError)

//     const { data: students, error: studentError } = await supabase
//       .from("students")
//       .select("id, class_id")

//     if (studentError) return res.status(400).json(studentError)

//     let total_expected = 0

//     students.forEach(student => {
//       const fee = feeStructures.find(f => f.class_id === student.class_id)
//       if (fee) {
//         total_expected += fee.amount
//       }
//     })

//     const pending_fees = total_expected - total_collected


//     // 3️⃣ Students with pending fee
//     let students_due = 0

//     for (let student of students) {

//       const fee = feeStructures.find(f => f.class_id === student.class_id)

//       if (!fee) continue

//       const { data: studentPayments } = await supabase
//         .from("fee_payments")
//         .select("amount")
//         .eq("student_id", student.id)

//       let paid = 0
//       studentPayments.forEach(p => paid += p.amount)

//       if (paid < fee.amount) {
//         students_due++
//       }

//     }


//     // 4️⃣ Today's collection
//     const today = new Date().toISOString().split("T")[0]

//     const { data: todayPayments, error: todayError } = await supabase
//       .from("fee_payments")
//       .select("amount, created_at")
//       .gte("created_at", today)

//     if (todayError) return res.status(400).json(todayError)

//     let today_collection = 0
//     todayPayments.forEach(p => today_collection += p.amount)


//     res.json({
//       total_collected,
//       pending_fees,
//       students_due,
//       today_collection
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }


// // ============================
// // Monthly Revenue Analytics
// // ============================
// exports.getMonthlyRevenue = async (req, res) => {

//   try {

//     const { data: payments, error } = await supabase
//       .from("fee_payments")
//       .select("amount, created_at")

//     if (error) return res.status(400).json(error)

//     const revenue = {
//       Jan: 0,
//       Feb: 0,
//       Mar: 0,
//       Apr: 0,
//       May: 0,
//       Jun: 0,
//       Jul: 0,
//       Aug: 0,
//       Sep: 0,
//       Oct: 0,
//       Nov: 0,
//       Dec: 0
//     }

//     const months = [
//       "Jan","Feb","Mar","Apr","May","Jun",
//       "Jul","Aug","Sep","Oct","Nov","Dec"
//     ]

//     payments.forEach(payment => {

//       const date = new Date(payment.created_at)
//       const monthIndex = date.getMonth()

//       const monthName = months[monthIndex]

//       revenue[monthName] += payment.amount

//     })

//     res.json(revenue)

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }





// exports.getRecentPayments = async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("fee_payments")
//       .select("student_name, amount, created_at")
//       .order("created_at", { ascending: false })
//       .limit(10)

//     if (error) return res.status(400).json(error)

//     res.json(data)

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }




// exports.getClassFeeSummary = async (req, res) => {

//   try {

//     // 1️⃣ Get classes
//     const { data: classes, error: classError } = await supabase
//       .from("classes")
//       .select("id, class_name, section")

//     if (classError) return res.status(400).json(classError)

//     // 2️⃣ Get fee structures
//     const { data: fees } = await supabase
//       .from("fee_structure")
//       .select("class_id, amount")

//     // 3️⃣ Get students
//     const { data: students } = await supabase
//       .from("students")
//       .select("id, class_id")

//     // 4️⃣ Get payments
//     const { data: payments } = await supabase
//       .from("fee_payments")
//       .select("student_id, amount")

//     let result = []

//     for (let cls of classes) {

//       const classStudents = students.filter(s => s.class_id === cls.id)

//       const feeStructure = fees.find(f => f.class_id === cls.id)

//       if (!feeStructure) continue

//       const totalFee = feeStructure.amount * classStudents.length

//       let paid = 0

//       for (let student of classStudents) {

//         const studentPayments = payments.filter(
//           p => p.student_id === student.id
//         )

//         studentPayments.forEach(p => {
//           paid += p.amount
//         })

//       }

//       const remaining = totalFee - paid

//       result.push({
//         class_id: cls.id,
//         class_name: cls.class_name,
//         section: cls.section,
//         total_fee: totalFee,
//         paid_fee: paid,
//         remaining_fee: remaining
//       })

//     }

//     res.json(result)

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }







// exports.getClassStudentsFees = async (req, res) => {

//   const { class_id } = req.params

//   try {

//     // 1️⃣ get students of class
//     const { data: students, error: studentError } = await supabase
//       .from("students")
//       .select("id, name")
//       .eq("class_id", class_id)

//     if (studentError) return res.status(400).json(studentError)

//     // 2️⃣ get fee structure
//     const { data: feeStructure } = await supabase
//       .from("fee_structure")
//       .select("amount")
//       .eq("class_id", class_id)
//       .single()

//     const totalFee = feeStructure.amount

//     let result = []

//     for (let student of students) {

//       const { data: payments } = await supabase
//         .from("fee_payments")
//         .select("amount")
//         .eq("student_id", student.id)

//       let paid = 0
//       payments.forEach(p => paid += p.amount)

//       result.push({
//         student_id: student.id,
//         student_name: student.name,
//         paid_fee: paid,
//         remaining_fee: totalFee - paid
//       })

//     }

//     res.json(result)

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }




// exports.sendFeeReminder = async (req, res) => {

//   const { student_id } = req.body

//   try {

//     // find student user id
//     const { data: student, error } = await supabase
//       .from("students")
//       .select("user_id, name")
//       .eq("id", student_id)
//       .single()

//     if (error) return res.status(400).json(error)

//     // insert notification
//     const { error: notifyError } = await supabase
//       .from("notifications")
//       .insert([
//         {
//           user_id: student.user_id,
//           title: "Fee Reminder",
//           message: `Dear ${student.name}, please pay your pending school fee.`
//         }
//       ])

//     if (notifyError) return res.status(400).json(notifyError)

//     res.json({
//       message: "Reminder sent successfully"
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }






// exports.getClassMonthlyFees = async (req, res) => {

//   const { class_id } = req.params

//   try {

//     const { data: students } = await supabase
//       .from("students")
//       .select("id, name")
//       .eq("class_id", class_id)

//     const { data: fees } = await supabase
//       .from("fee_structure")
//       .select("id, month, amount")
//       .eq("class_id", class_id)

//     let result = []

//     for (let student of students) {

//       let monthlyData = {}

//       for (let fee of fees) {

//         const { data: payment } = await supabase
//           .from("fee_payments")
//           .select("amount")
//           .eq("student_id", student.id)
//           .eq("fee_id", fee.id)

//         let paid = 0
//         payment?.forEach(p => paid += p.amount)

//         monthlyData[fee.month] =
//           paid >= fee.amount ? "paid" : "pending"
//       }

//       result.push({
//         student_id: student.id,
//         student_name: student.name,
//         months: monthlyData
//       })
//     }

//     res.json(result)

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }









































const supabase = require("../config/supabase")
const crypto = require("crypto")
const razorpay = require("../config/razorpay")
const cron = require("node-cron")
const { generateFeeReceiptPDF } = require("../utils/generateFeeReceipt")

// ============================
// Create Fee Structure + Auto Assign to Students
// ============================
exports.createFeeStructure = async (req, res) => {
  const { class_id, amount, due_date, month } = req.body

  try {
    // Validate month
    const validMonths = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]

    // Auto detect month if not provided
    const feeMonth = month || validMonths[new Date().getMonth()]

    if (!validMonths.includes(feeMonth)) {
      return res.status(400).json({ message: "Invalid month name" })
    }

    // Check duplicate - same class same month
    const { data: existing } = await supabase
      .from("fee_structure")
      .select("id")
      .eq("class_id", class_id)
      .eq("month", feeMonth)
      .single()

    if (existing) {
      return res.status(400).json({
        message: `Fee structure already exists for ${feeMonth}`
      })
    }

    // 1️⃣ Create fee structure
    const { data: fee, error: feeError } = await supabase
      .from("fee_structure")
      .insert([{ class_id, amount, due_date, month: feeMonth }])
      .select()
      .single()

    if (feeError) return res.status(400).json(feeError)

    // 2️⃣ Find students of that class
    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("class_id", class_id)

    if (studentError) return res.status(400).json(studentError)

    if (students.length === 0) {
      return res.json({
        message: `Fee structure created for ${feeMonth} but no students found in this class`
      })
    }

    // 3️⃣ Prepare student fee records
    const studentFees = students.map(student => ({
      student_id: student.id,
      fee_id: fee.id,
      amount: amount,
      status: "pending",
      paid_amount: 0,
      month: feeMonth
    }))

    // 4️⃣ Insert into student_fees
    const { error: assignError } = await supabase
      .from("student_fees")
      .insert(studentFees)

    if (assignError) return res.status(400).json(assignError)

    res.json({
      message: `Fee structure created for ${feeMonth} and assigned to ${students.length} students`
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// Student View Fee
// ============================
exports.getStudentFees = async (req, res) => {
  const { student_id } = req.params

  const { data, error } = await supabase
    .from("fee_payments")
    .select("*")
    .eq("student_id", student_id)

  if (error) return res.status(400).json(error)

  res.json(data)
}


// ============================
// Pay Fee
// ============================
exports.payFee = async (req, res) => {
  try {
    const { fee_id, amount, payment_method } = req.body
    const payAmount = Number(amount)

    if (!fee_id || !payAmount || payAmount <= 0) {
      return res.status(400).json({ message: "Invalid payment details" })
    }

    // 1. student find
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // 2. student fee record
    const { data: studentFee, error: feeError } = await supabase
      .from("student_fees")
      .select("id, amount, paid_amount, status, fee_id, month")
      .eq("student_id", student.id)
      .eq("fee_id", fee_id)
      .single()

    if (feeError || !studentFee) {
      return res.status(404).json({ message: "Fee record not found" })
    }

    const totalAmount = Number(studentFee.amount || 0)
    const alreadyPaid = Number(studentFee.paid_amount || 0)
    const remaining = totalAmount - alreadyPaid

    if (remaining <= 0) {
      return res.status(400).json({ message: "This fee is already fully paid" })
    }

    if (payAmount > remaining) {
      return res.status(400).json({
        message: `You can pay maximum ₹${remaining} for ${studentFee.month}`
      })
    }

    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`

    // 3. insert payment
    const { error: paymentError } = await supabase
      .from("fee_payments")
      .insert([
        {
          student_id: student.id,
          student_name: student.name,
          fee_id,
          amount: payAmount,
          payment_method,
          payment_status: "paid",
          transaction_id: transactionId
        }
      ])

    if (paymentError) return res.status(400).json(paymentError)

    // 4. update paid amount
    const newPaidAmount = alreadyPaid + payAmount

    let newStatus = "pending"
    if (newPaidAmount >= totalAmount) newStatus = "paid"
    else if (newPaidAmount > 0) newStatus = "partial"

    const { error: updateError } = await supabase
      .from("student_fees")
      .update({
        paid_amount: newPaidAmount,
        status: newStatus
      })
      .eq("student_id", student.id)
      .eq("fee_id", fee_id)

    if (updateError) return res.status(400).json(updateError)

    res.json({
      message: `Payment successful for ${studentFee.month}`,
      transaction_id: transactionId,
      paid_amount: payAmount,
      total_paid: newPaidAmount,
      remaining_amount: Math.max(totalAmount - newPaidAmount, 0),
      status: newStatus
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ============================
// Student Fee Dashboard
// ============================
exports.getStudentFeeDashboard = async (req, res) => {
  const user_id = req.user.id

  try {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", user_id)
      .single()

    if (studentError) return res.status(400).json(studentError)

    const { data: feeStructure, error: feeError } = await supabase
      .from("fee_structure")
      .select("*")
      .eq("class_id", student.class_id)
      .single()

    if (feeError) return res.status(400).json(feeError)

    const { data: payments, error: paymentError } = await supabase
      .from("fee_payments")
      .select("amount")
      .eq("student_id", student.id)

    if (paymentError) return res.status(400).json(paymentError)

    let paid_fee = 0
    payments.forEach(p => paid_fee += p.amount)

    const total_fee = feeStructure.amount
    const pending_fee = total_fee - paid_fee

    const today = new Date()
    const dueDate = new Date(feeStructure.due_date)

    let late_fine = 0
    if (today > dueDate && pending_fee > 0) {
      const daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
      late_fine = daysLate * 10
    }

    res.json({ total_fee, paid_fee, pending_fee, due_date: feeStructure.due_date, late_fine })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// Admin Financial Dashboard
// ============================
exports.getAdminFinanceDashboard = async (req, res) => {
  try {
    const { data: payments, error: paymentError } = await supabase
      .from("fee_payments")
      .select("amount")

    if (paymentError) return res.status(400).json(paymentError)

    let total_collected = 0
    payments.forEach(p => total_collected += p.amount)

    const { data: feeStructures, error: feeError } = await supabase
      .from("fee_structure")
      .select("class_id, amount")

    if (feeError) return res.status(400).json(feeError)

    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")

    if (studentError) return res.status(400).json(studentError)

    let total_expected = 0
    students.forEach(student => {
      const fee = feeStructures.find(f => f.class_id === student.class_id)
      if (fee) total_expected += fee.amount
    })

    const pending_fees = total_expected - total_collected

    let students_due = 0
    for (let student of students) {
      const fee = feeStructures.find(f => f.class_id === student.class_id)
      if (!fee) continue

      const { data: studentPayments } = await supabase
        .from("fee_payments")
        .select("amount")
        .eq("student_id", student.id)

      let paid = 0
      studentPayments.forEach(p => paid += p.amount)
      if (paid < fee.amount) students_due++
    }

    const today = new Date().toISOString().split("T")[0]
    const { data: todayPayments, error: todayError } = await supabase
      .from("fee_payments")
      .select("amount, created_at")
      .gte("created_at", today)

    if (todayError) return res.status(400).json(todayError)

    let today_collection = 0
    todayPayments.forEach(p => today_collection += p.amount)

    res.json({ total_collected, pending_fees, students_due, today_collection })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// Monthly Revenue Analytics
// ============================
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const { data: payments, error } = await supabase
      .from("fee_payments")
      .select("amount, created_at")

    if (error) return res.status(400).json(error)

    const revenue = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    }

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    payments.forEach(payment => {
      const date = new Date(payment.created_at)
      const monthName = months[date.getMonth()]
      revenue[monthName] += payment.amount
    })

    res.json(revenue)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// Recent Payments
// ============================
exports.getRecentPayments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fee_payments")
      .select("student_name, amount, created_at")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) return res.status(400).json(error)
    res.json(data)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// Class Fee Summary
// ============================
exports.getClassFeeSummary = async (req, res) => {
  try {
    const { data: classes, error: classError } = await supabase
      .from("classes")
      .select("id, class_name, section")

    if (classError) return res.status(400).json(classError)

    const { data: fees } = await supabase.from("fee_structure").select("class_id, amount")
    const { data: students } = await supabase.from("students").select("id, class_id")
    const { data: payments } = await supabase.from("fee_payments").select("student_id, amount")

    let result = []

    for (let cls of classes) {
      const classStudents = students.filter(s => s.class_id === cls.id)
      const feeStructure = fees.find(f => f.class_id === cls.id)
      if (!feeStructure) continue

      const totalFee = feeStructure.amount * classStudents.length
      let paid = 0

      for (let student of classStudents) {
        const studentPayments = payments.filter(p => p.student_id === student.id)
        studentPayments.forEach(p => paid += p.amount)
      }

      result.push({
        class_id: cls.id,
        class_name: cls.class_name,
        section: cls.section,
        total_fee: totalFee,
        paid_fee: paid,
        remaining_fee: totalFee - paid
      })
    }

    res.json(result)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// Class Students Fees
// ============================
exports.getClassStudentsFees = async (req, res) => {
  const { class_id } = req.params

  try {
    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("class_id", class_id)

    if (studentError) return res.status(400).json(studentError)

    const { data: feeStructure } = await supabase
      .from("fee_structure")
      .select("amount")
      .eq("class_id", class_id)
      .single()

    const totalFee = feeStructure?.amount || 0
    let result = []

    for (let student of students) {
      const { data: payments } = await supabase
        .from("fee_payments")
        .select("amount")
        .eq("student_id", student.id)

      let paid = 0
      payments.forEach(p => paid += p.amount)

      result.push({
        student_id: student.id,
        student_name: student.name,
        paid_fee: paid,
        remaining_fee: totalFee - paid
      })
    }

    res.json(result)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// Send Fee Reminder
// ============================
exports.sendFeeReminder = async (req, res) => {
  const { student_id } = req.body

  try {
    const { data: student, error } = await supabase
      .from("students")
      .select("user_id, name")
      .eq("id", student_id)
      .single()

    if (error) return res.status(400).json(error)

    const { error: notifyError } = await supabase
      .from("notifications")
      .insert([{
        user_id: student.user_id,
        title: "Fee Reminder",
        message: `Dear ${student.name}, please pay your pending school fee.`
      }])

    if (notifyError) return res.status(400).json(notifyError)

    res.json({ message: "Reminder sent successfully" })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// ✅ Class Monthly Fees (FIXED - Auto Month Handle)
// ============================
// exports.getClassMonthlyFees = async (req, res) => {
//   const { class_id } = req.params

//   try {
//     // 1️⃣ Get students
//     const { data: students, error: studentError } = await supabase
//       .from("students")
//       .select("id, name")
//       .eq("class_id", class_id)

//     if (studentError) return res.status(400).json(studentError)

//     if (!students || students.length === 0) {
//       return res.json([])
//     }

//     // 2️⃣ Get fee structures for this class
//     const { data: fees, error: feeError } = await supabase
//       .from("fee_structure")
//       .select("id, month, amount")
//       .eq("class_id", class_id)

//     if (feeError) return res.status(400).json(feeError)

//     // 3️⃣ Fix NULL months in fee_structure using created_at
//     const monthNames = [
//       "January", "February", "March", "April",
//       "May", "June", "July", "August",
//       "September", "October", "November", "December"
//     ]

//     // Check if any fee has NULL month
//     const nullFees = fees.filter(f => !f.month)

//     if (nullFees.length > 0) {
//       // Get full data with created_at for null month fees
//       const { data: nullFeesFull } = await supabase
//         .from("fee_structure")
//         .select("id, created_at")
//         .eq("class_id", class_id)
//         .is("month", null)

//       // Fix each null month
//       for (let nf of (nullFeesFull || [])) {
//         const createdDate = new Date(nf.created_at)
//         const autoMonth = monthNames[createdDate.getMonth()]

//         // Update fee_structure
//         await supabase
//           .from("fee_structure")
//           .update({ month: autoMonth })
//           .eq("id", nf.id)

//         // Update student_fees too
//         await supabase
//           .from("student_fees")
//           .update({ month: autoMonth })
//           .eq("fee_id", nf.id)

//         // Update local array too
//         const feeIndex = fees.findIndex(f => f.id === nf.id)
//         if (feeIndex !== -1) {
//           fees[feeIndex].month = autoMonth
//         }
//       }
//     }

//     // 4️⃣ If still no months exist, create current month fee
//     const validFees = fees.filter(f => f.month)

//     if (validFees.length === 0) {
//       // No fee structure at all - return empty with message
//       const result = students.map(s => ({
//         student_id: s.id,
//         student_name: s.name,
//         months: {}
//       }))
//       return res.json(result)
//     }

//     // 5️⃣ Build monthly data for each student
//     let result = []

//     for (let student of students) {
//       let monthlyData = {}

//       for (let fee of validFees) {
//         if (!fee.month) continue

//         // Get payments for this student + fee
//         const { data: payments } = await supabase
//           .from("fee_payments")
//           .select("amount")
//           .eq("student_id", student.id)
//           .eq("fee_id", fee.id)

//         let paid = 0
//         if (payments) {
//           payments.forEach(p => paid += p.amount)
//         }

//         monthlyData[fee.month] = paid >= fee.amount ? "paid" : "pending"
//       }

//       result.push({
//         student_id: student.id,
//         student_name: student.name,
//         months: monthlyData
//       })
//     }

//     res.json(result)

//   } catch (err) {
//     console.error("ClassMonthlyFees Error:", err)
//     res.status(500).json({ message: "Server error" })
//   }
// }.
exports.getClassMonthlyFees = async (req, res) => {
  const { class_id } = req.params

  try {
    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("class_id", class_id)

    if (studentError) return res.status(400).json(studentError)
    if (!students || students.length === 0) return res.json([])

    // fee_structure se month + amount
    const { data: feeStructures, error: feeError } = await supabase
      .from("fee_structure")
      .select("id, month, amount")
      .eq("class_id", class_id)

    if (feeError) return res.status(400).json(feeError)

    const ALL_MONTHS = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]

    let result = []

    for (let student of students) {
      let months = {}

      for (let monthName of ALL_MONTHS) {
        // current month ka fee structure
        const fee = feeStructures?.find(f => f.month === monthName)

        if (!fee) {
          months[monthName] = {
            status: "no_fee",
            amount: 0,
            paid_amount: 0
          }
          continue
        }

        // student_fees se actual assigned fee record
        const { data: studentFee } = await supabase
          .from("student_fees")
          .select("amount, paid_amount, status")
          .eq("student_id", student.id)
          .eq("fee_id", fee.id)
          .single()

        const amount = Number(studentFee?.amount || fee.amount || 0)
        const paid_amount = Number(studentFee?.paid_amount || 0)

        months[monthName] = {
          status: paid_amount >= amount && amount > 0 ? "paid" : "pending",
          amount,
          paid_amount
        }
      }

      result.push({
        student_id: student.id,
        student_name: student.name,
        months
      })
    }

    res.json(result)
  } catch (err) {
    console.error("getClassMonthlyFees error:", err)
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// ✅ Fix NULL Months (One Time Fix)
// ============================
exports.fixNullMonths = async (req, res) => {
  try {
    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]

    // Fix fee_structure table
    const { data: nullFees } = await supabase
      .from("fee_structure")
      .select("id, created_at")
      .is("month", null)

    let feeFixed = 0
    for (let fee of (nullFees || [])) {
      const month = monthNames[new Date(fee.created_at).getMonth()]
      await supabase
        .from("fee_structure")
        .update({ month })
        .eq("id", fee.id)
      feeFixed++
    }

    // Fix student_fees table
    const { data: nullStudentFees } = await supabase
      .from("student_fees")
      .select("id, created_at, fee_id")
      .is("month", null)

    let studentFeeFixed = 0
    for (let sf of (nullStudentFees || [])) {
      // Try to get month from fee_structure first
      let month = null

      if (sf.fee_id) {
        const { data: feeData } = await supabase
          .from("fee_structure")
          .select("month")
          .eq("id", sf.fee_id)
          .single()

        month = feeData?.month
      }

      // Fallback to created_at
      if (!month) {
        month = monthNames[new Date(sf.created_at).getMonth()]
      }

      await supabase
        .from("student_fees")
        .update({ month })
        .eq("id", sf.id)

      studentFeeFixed++
    }

    res.json({
      message: "NULL months fixed successfully",
      fee_structure_fixed: feeFixed,
      student_fees_fixed: studentFeeFixed
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}


// ============================
// ✅ Create Bulk Monthly Fees (All 12 Months)
// ============================
exports.createBulkMonthlyFees = async (req, res) => {
  const { class_id, amount, due_day } = req.body
  // due_day = 10 means every month 10th date is due date

  try {
    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]

    const currentYear = new Date().getFullYear()

    // Get students
    const { data: students } = await supabase
      .from("students")
      .select("id")
      .eq("class_id", class_id)

    if (!students || students.length === 0) {
      return res.status(400).json({ message: "No students in this class" })
    }

    // Check existing months
    const { data: existingFees } = await supabase
      .from("fee_structure")
      .select("month")
      .eq("class_id", class_id)

    const existingMonths = (existingFees || []).map(f => f.month)

    let created = 0
    let skipped = 0

    for (let i = 0; i < 12; i++) {
      const month = monthNames[i]

      // Skip if already exists
      if (existingMonths.includes(month)) {
        skipped++
        continue
      }

      const due_date = `${currentYear}-${String(i + 1).padStart(2, "0")}-${String(due_day || 10).padStart(2, "0")}`

      // Create fee structure
      const { data: fee, error: feeError } = await supabase
        .from("fee_structure")
        .insert([{ class_id, amount, due_date, month }])
        .select()
        .single()

      if (feeError) continue

      // Create student fees
      const studentFees = students.map(s => ({
        student_id: s.id,
        fee_id: fee.id,
        amount,
        status: "pending",
        paid_amount: 0,
        month
      }))

      await supabase.from("student_fees").insert(studentFees)
      created++
    }

    res.json({
      message: `Created ${created} months, skipped ${skipped} existing`,
      created,
      skipped
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}















// exports.getMyFees = async (req, res) => {
//   try {
//     const userId = req.user.id

//     const ALL_MONTHS = [
//       "January", "February", "March", "April",
//       "May", "June", "July", "August",
//       "September", "October", "November", "December"
//     ]

//     // 1) student find karo
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, class_id")
//       .eq("user_id", userId)
//       .single()

//     if (studentError || !student) {
//       console.log("student error", studentError)
//       return res.status(404).json({ message: "Student not found" })
//     }

//     // 2) class ki fee_structure lao
//     const { data: feeStructures, error: fsError } = await supabase
//       .from("fee_structure")
//       .select("id, class_id, month, amount, due_date")
//       .eq("class_id", student.class_id)

//     if (fsError) {
//       console.log("fee structure error", fsError)
//       return res.status(400).json(fsError)
//     }

//     // 3) student_fees lao
//     const { data: studentFees, error: sfError } = await supabase
//       .from("student_fees")
//       .select("id, student_id, fee_id, amount, paid_amount, status, month")
//       .eq("student_id", student.id)

//     if (sfError) {
//       console.log("student fees error", sfError)
//       return res.status(400).json(sfError)
//     }

//     // 4) all 12 months return karo
//     const result = ALL_MONTHS.map((monthName) => {
//       const feeStructure = (feeStructures || []).find(f => f.month === monthName)
//       const studentFee = (studentFees || []).find(f => f.month === monthName)

//       // Agar class ke liye fee structure hi nahi bana
//       if (!feeStructure) {
//         return {
//           id: null,
//           fee_id: null,
//           month: monthName,
//           amount: 0,
//           paid_amount: 0,
//           remaining_amount: 0,
//           due_date: null,
//           status: "no_fee"
//         }
//       }

//       const totalAmount = Number(studentFee?.amount || feeStructure.amount || 0)
//       const paidAmount = Number(studentFee?.paid_amount || 0)
//       const remainingAmount = Math.max(totalAmount - paidAmount, 0)

//       let finalStatus = "pending"
//       if (paidAmount >= totalAmount && totalAmount > 0) {
//         finalStatus = "paid"
//       } else if (paidAmount > 0 && paidAmount < totalAmount) {
//         finalStatus = "partial"
//       }

//       return {
//         id: studentFee?.id || null,
//         fee_id: feeStructure.id,
//         month: monthName,
//         amount: totalAmount,
//         paid_amount: paidAmount,
//         remaining_amount: remainingAmount,
//         due_date: feeStructure.due_date,
//         status: finalStatus
//       }
//     })

//     res.json(result)

//   } catch (err) {
//     console.log("getMyFees server error:", err)
//     res.status(500).json({ message: "Server error" })
//   }
// }
// ============================================================
// feeController.js mein getMyFees function ko replace karo
// ============================================================

exports.getMyFees = async (req, res) => {
  try {
    const userId = req.user.id

    const ALL_MONTHS = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]

    // 1) student find karo
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", userId)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // 2) class ki fee_structure lao
    const { data: feeStructures, error: fsError } = await supabase
      .from("fee_structure")
      .select("id, class_id, month, amount, due_date")
      .eq("class_id", student.class_id)

    if (fsError) return res.status(400).json(fsError)

    // 3) student_fees lao
    const { data: studentFees, error: sfError } = await supabase
      .from("student_fees")
      .select("id, student_id, fee_id, amount, paid_amount, status, month")
      .eq("student_id", student.id)

    if (sfError) return res.status(400).json(sfError)

    // ✅ 4) fee_payments lao (payment_id ke liye - receipt download hoga)
    const { data: allPayments, error: pmtError } = await supabase
      .from("fee_payments")
      .select("id, fee_id, payment_status, created_at")
      .eq("student_id", student.id)
      .eq("payment_status", "paid")
      .order("created_at", { ascending: false })

    if (pmtError) {
      console.log("payments fetch error", pmtError)
    }

    // 5) all 12 months return karo
    const result = ALL_MONTHS.map((monthName) => {
      const feeStructure = (feeStructures || []).find(f => f.month === monthName)
      const studentFee   = (studentFees   || []).find(f => f.month === monthName)

      // Agar class ke liye fee structure hi nahi bana
      if (!feeStructure) {
        return {
          id:               null,
          fee_id:           null,
          payment_id:       null,   // ✅ no payment
          month:            monthName,
          amount:           0,
          paid_amount:      0,
          remaining_amount: 0,
          due_date:         null,
          status:           "no_fee"
        }
      }

      const totalAmount     = Number(studentFee?.amount  || feeStructure.amount || 0)
      const paidAmount      = Number(studentFee?.paid_amount || 0)
      const remainingAmount = Math.max(totalAmount - paidAmount, 0)

      let finalStatus = "pending"
      if (paidAmount >= totalAmount && totalAmount > 0) {
        finalStatus = "paid"
      } else if (paidAmount > 0 && paidAmount < totalAmount) {
        finalStatus = "partial"
      }

      // ✅ Is month ka latest paid payment_id dhoondo (receipt download ke liye)
      const latestPayment = (allPayments || []).find(
        p => p.fee_id === feeStructure.id
      )

      return {
        id:               studentFee?.id  || null,
        fee_id:           feeStructure.id,
        payment_id:       latestPayment?.id || null,   // ✅ NEW - receipt download ke liye
        month:            monthName,
        amount:           totalAmount,
        paid_amount:      paidAmount,
        remaining_amount: remainingAmount,
        due_date:         feeStructure.due_date,
        status:           finalStatus
      }
    })

    res.json(result)

  } catch (err) {
    console.log("getMyFees server error:", err)
    res.status(500).json({ message: "Server error" })
  }
}






// exports.createPaymentOrder = async (req, res) => {
//   try {
//     const { fee_id, amount } = req.body
//     const payAmount = Number(amount)

//     if (!fee_id || !payAmount || payAmount <= 0) {
//       return res.status(400).json({ message: "Invalid payment details" })
//     }

//     // student find
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, name")
//       .eq("user_id", req.user.id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ message: "Student not found" })
//     }

//     // student fee check
//     const { data: studentFee, error: feeError } = await supabase
//       .from("student_fees")
//       .select("id, amount, paid_amount, fee_id, month")
//       .eq("student_id", student.id)
//       .eq("fee_id", fee_id)
//       .single()

//     if (feeError || !studentFee) {
//       return res.status(404).json({ message: "Fee record not found" })
//     }

//     const totalAmount = Number(studentFee.amount || 0)
//     const alreadyPaid = Number(studentFee.paid_amount || 0)
//     const remaining = totalAmount - alreadyPaid

//     if (remaining <= 0) {
//       return res.status(400).json({ message: "Fee already fully paid" })
//     }

//     if (payAmount > remaining) {
//       return res.status(400).json({
//         message: `Maximum payable amount is ₹${remaining}`
//       })
//     }

//     const options = {
//       amount: payAmount * 100, // paise
//       currency: "INR",
//       receipt: `fee_${Date.now()}`,

//       notes: {
//         fee_id,
//         student_id: student.id,
//         month: studentFee.month
//       }
//     }

//     const order = await razorpay.orders.create(options)

//     res.json({
//       success: true,
//       order,
//       key: process.env.RAZORPAY_KEY_ID,
//       student_name: student.name,
//       month: studentFee.month,
//       amount: payAmount
//     })

//   } catch (err) {
//     console.error("createPaymentOrder error:", err)
//     res.status(500).json({ message: "Server error" })
//   }
// }
// feeController.js mein createPaymentOrder ko ye se replace karo

exports.createPaymentOrder = async (req, res) => {
  try {
    const { fee_id, amount } = req.body
    const payAmount = Number(amount)

    if (!fee_id || !payAmount || payAmount <= 0) {
      return res.status(400).json({ message: "Invalid payment details" })
    }

    // 1. student find karo
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // 2. fee_structure check karo (fee exist karti hai ya nahi)
    const { data: feeStructure, error: fsError } = await supabase
      .from("fee_structure")
      .select("id, amount, month, class_id")
      .eq("id", fee_id)
      .single()

    if (fsError || !feeStructure) {
      return res.status(404).json({ message: "Fee structure not found" })
    }

    // 3. student_fees record dhundho
    let { data: studentFee, error: feeError } = await supabase
      .from("student_fees")
      .select("id, amount, paid_amount, fee_id, month, status")
      .eq("student_id", student.id)
      .eq("fee_id", fee_id)
      .single()

    // ✅ Agar student_fees mein record nahi hai to auto-create karo
    if (feeError || !studentFee) {
      console.log(`student_fees record missing for student ${student.id}, fee ${fee_id} — auto creating...`)

      const { data: newRecord, error: insertError } = await supabase
        .from("student_fees")
        .insert([{
          student_id:  student.id,
          fee_id:      fee_id,
          amount:      feeStructure.amount,
          paid_amount: 0,
          status:      "pending",
          month:       feeStructure.month
        }])
        .select()
        .single()

      if (insertError) {
        console.error("Auto-create student_fees failed:", insertError)
        return res.status(500).json({ message: "Could not initialize fee record" })
      }

      studentFee = newRecord
    }

    // 4. remaining check karo
    const totalAmount = Number(studentFee.amount  || feeStructure.amount || 0)
    const alreadyPaid = Number(studentFee.paid_amount || 0)
    const remaining   = totalAmount - alreadyPaid

    if (remaining <= 0) {
      return res.status(400).json({ message: "Fee already fully paid" })
    }

    if (payAmount > remaining) {
      return res.status(400).json({
        message: `Maximum payable amount is ₹${remaining}`
      })
    }

    // 5. Razorpay order banao — receipt max 40 chars
    const options = {
      amount:   payAmount * 100, // paise mein
      currency: "INR",
      receipt:  `fee_${Date.now()}`,   // ✅ 17 chars only
      notes: {
        fee_id,
        student_id: student.id,
        month:      studentFee.month
      }
    }

    const order = await razorpay.orders.create(options)

    res.json({
      success:      true,
      order,
      key:          process.env.RAZORPAY_KEY_ID,
      student_name: student.name,
      month:        studentFee.month,
      amount:       payAmount
    })

  } catch (err) {
    console.error("createPaymentOrder error:", err)
    res.status(500).json({ message: "Server error" })
  }
}








exports.verifyPaymentAndSave = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      fee_id,
      amount,
      payment_method
    } = req.body

    const payAmount = Number(amount)

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !fee_id || !payAmount) {
      return res.status(400).json({ message: "Missing payment details" })
    }

    // signature verify
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" })
    }

    // student find
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // fee record
    const { data: studentFee, error: feeError } = await supabase
      .from("student_fees")
      .select("amount, paid_amount, month")
      .eq("student_id", student.id)
      .eq("fee_id", fee_id)
      .single()

    if (feeError || !studentFee) {
      return res.status(404).json({ message: "Fee record not found" })
    }

    const totalAmount = Number(studentFee.amount || 0)
    const oldPaid = Number(studentFee.paid_amount || 0)
    const newPaidAmount = oldPaid + payAmount

    let newStatus = "pending"
    if (newPaidAmount >= totalAmount) newStatus = "paid"
    else if (newPaidAmount > 0) newStatus = "partial"

    // insert fee payment
    const { error: paymentInsertError } = await supabase
      .from("fee_payments")
      .insert([
        {
          student_id: student.id,
          student_name: student.name,
          fee_id,
          amount: payAmount,
          payment_method: payment_method || "online",
          payment_status: "paid",
          transaction_id: razorpay_payment_id
        }
      ])

    if (paymentInsertError) {
      return res.status(400).json(paymentInsertError)
    }

    // update student fee
    const { error: updateError } = await supabase
      .from("student_fees")
      .update({
        paid_amount: newPaidAmount,
        status: newStatus
      })
      .eq("student_id", student.id)
      .eq("fee_id", fee_id)

    if (updateError) {
      return res.status(400).json(updateError)
    }

    res.json({
      success: true,
      message: `Payment successful for ${studentFee.month}`,
      payment_id: razorpay_payment_id,
      status: newStatus,
      total_paid: newPaidAmount
    })

  } catch (err) {
    console.error("verifyPaymentAndSave error:", err)
    res.status(500).json({ message: "Server error" })
  }
}




exports.setupAutoMonthlyFeesJob = () => {

  console.log("✅ Auto monthly fee generation job started")

  // Run every day at midnight 1 AM
  cron.schedule("0 1 * * *", async () => {
    console.log("🔄 Running auto monthly fee generation job...")

    try {
      const today = new Date()
      const dayOfMonth = today.getDate()

      // Sirf har mahine ke pehle 3 din hi run karega
      if (dayOfMonth > 3) {
        console.log("✅ Not first day of month, skipping")
        return
      }

      const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ]

      const currentMonthIndex = today.getMonth()
      const currentMonthName = monthNames[currentMonthIndex]
      const lastMonthIndex = currentMonthIndex - 1

      console.log(`Current month: ${currentMonthName}`)

      // 1️⃣ Get all active classes
      const { data: classes, error: classError } = await supabase
        .from("classes")
        .select("id, class_name, section")

      if (classError) throw classError

      console.log(`Found ${classes.length} active classes`)

      for (const cls of classes) {

        // 2️⃣ Check is month already created
        const { data: existing } = await supabase
          .from("fee_structure")
          .select("id")
          .eq("class_id", cls.id)
          .eq("month", currentMonthName)
          .single()

        if (existing) {
          console.log(`✅ Class ${cls.class_name} already has ${currentMonthName} fee, skipping`)
          continue
        }

        // 3️⃣ Get last month fee from same class
        const lastMonthName = monthNames[lastMonthIndex]

        const { data: lastMonthFee } = await supabase
          .from("fee_structure")
          .select("amount, due_date")
          .eq("class_id", cls.id)
          .eq("month", lastMonthName)
          .single()

        // Fallback agar last month nahi mila
        const feeAmount = lastMonthFee?.amount || 5000
        const dueDay = lastMonthFee?.due_date?.split("-")[2] || 10

        const currentYear = today.getFullYear()
        const dueDate = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, "0")}-${String(dueDay).padStart(2, "0")}`

        console.log(`Creating ${currentMonthName} fee for class ${cls.class_name}: ₹${feeAmount}`)

        // 4️⃣ Create new fee structure
        const { data: newFeeStructure, error: createError } = await supabase
          .from("fee_structure")
          .insert([{
            class_id: cls.id,
            amount: feeAmount,
            due_date: dueDate,
            month: currentMonthName
          }])
          .select()
          .single()

        if (createError) throw createError

        // 5️⃣ Get all students of this class
        const { data: students, error: studentError } = await supabase
          .from("students")
          .select("id")
          .eq("class_id", cls.id)

        if (studentError) throw studentError

        // 6️⃣ Assign fee to all students
        const studentFeeRecords = students.map(student => ({
          student_id: student.id,
          fee_id: newFeeStructure.id,
          amount: feeAmount,
          status: "pending",
          paid_amount: 0,
          month: currentMonthName
        }))

        await supabase.from("student_fees").insert(studentFeeRecords)

        console.log(`✅ Assigned to ${students.length} students`)
      }

      console.log("✅ Auto monthly fee generation job completed successfully")

    } catch (err) {
      console.error("❌ Auto monthly job failed:", err)
    }
  })

}






// ============================================================
// ADD THIS TO YOUR feeController.js
// ============================================================
// At the top of feeController.js, add this import:
//   const { generateFeeReceiptPDF } = require("../utils/generateFeeReceipt")
//
// Install dependency:  npm install pdfkit
// ============================================================


// ============================
// Download Fee Receipt (PDF)
// GET /api/fees/receipt/:payment_id
// ============================
// exports.downloadFeeReceipt = async (req, res) => {
//   try {
//     const { payment_id } = req.params

//     // 1. Fetch payment record from fee_payments
//     const { data: payment, error: payError } = await supabase
//       .from("fee_payments")
//       .select("id, student_id, fee_id, amount, payment_method, payment_status, transaction_id, created_at, student_name")
//       .eq("id", payment_id)
//       .single()

//     if (payError || !payment) {
//       return res.status(404).json({ message: "Payment record not found" })
//     }

//     // Security: make sure this payment belongs to the requesting student
//     const { data: student, error: stuErr } = await supabase
//       .from("students")
//       .select("id, name, roll_number, admission_num, class_id")
//       .eq("user_id", req.user.id)
//       .single()

//     if (stuErr || !student) {
//       return res.status(404).json({ message: "Student not found" })
//     }

//     if (student.id !== payment.student_id) {
//       return res.status(403).json({ message: "Access denied" })
//     }

//     // 2. Fetch class info
//     const { data: classInfo } = await supabase
//       .from("classes")
//       .select("class_name, section")
//       .eq("id", student.class_id)
//       .single()

//     // 3. Fetch fee structure for month, due_date, total amount
//     const { data: feeStructure } = await supabase
//       .from("fee_structure")
//       .select("month, due_date, amount")
//       .eq("id", payment.fee_id)
//       .single()

//     // 4. Fetch student_fees record for paid_amount (could be partial)
//     const { data: studentFee } = await supabase
//       .from("student_fees")
//       .select("amount, paid_amount, status")
//       .eq("student_id", student.id)
//       .eq("fee_id", payment.fee_id)
//       .single()

//     // 5. Build receipt data object
//     const totalAmount   = Number(studentFee?.amount || feeStructure?.amount || 0)
//     const paidAmount    = Number(studentFee?.paid_amount || payment.amount || 0)
//     const remaining     = Math.max(totalAmount - paidAmount, 0)

//     const paymentDate = new Date(payment.created_at).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     })

//     const dueDate = feeStructure?.due_date
//       ? new Date(feeStructure.due_date).toLocaleDateString("en-IN", {
//           day: "2-digit", month: "long", year: "numeric"
//         })
//       : "N/A"

//     const receiptData = {
//       transaction_id:  payment.transaction_id,
//       payment_date:    paymentDate,
//       student_name:    student.name || payment.student_name,
//       class_name:      `Class ${classInfo?.class_name || ""} - Section ${classInfo?.section || ""}`,
//       roll_number:     student.roll_number || "N/A",
//       admission_num:   student.admission_num || "N/A",
//       month:           feeStructure?.month || "N/A",
//       fee_amount:      totalAmount,
//       paid_amount:     paidAmount,
//       remaining:       remaining,
//       payment_method:  payment.payment_method || "N/A",
//       due_date:        dueDate,
//       status:          studentFee?.status || payment.payment_status || "paid",
//     }

//     // 6. Generate PDF
//     const pdfBuffer = await generateFeeReceiptPDF(receiptData)

//     // 7. Send as downloadable file
//     const fileName = `Fee_Receipt_${feeStructure?.month || "Receipt"}_${student.roll_number || "Student"}.pdf`

//     res.setHeader("Content-Type", "application/pdf")
//     res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)
//     res.setHeader("Content-Length", pdfBuffer.length)
//     res.end(pdfBuffer)

//   } catch (err) {
//     console.error("downloadFeeReceipt error:", err)
//     res.status(500).json({ message: "Server error generating receipt" })
//   }
// }
// Replace downloadFeeReceipt function
// ============================
// Download Fee Receipt (PDF)
// GET /api/fees/receipt/:fee_id
// ============================
exports.downloadFeeReceipt = async (req, res) => {
  try {
    const { fee_id } = req.params

    console.log("=== RECEIPT DOWNLOAD ===")
    console.log("Fee ID:", fee_id)
    console.log("User ID:", req.user.id)

    // 1. Get student from token
    const { data: student, error: stuErr } = await supabase
      .from("students")
      .select("id, name, roll_number, admission_number, class_id")  // ✅ FIXED: admission_num → admission_number
      .eq("user_id", req.user.id)
      .single()

    if (stuErr || !student) {
      console.log("Student not found:", stuErr)
      return res.status(404).json({ message: "Student not found" })
    }

    console.log("Student found:", student.id, student.name)

    // 2. Find latest paid payment for this student + fee_id
    const { data: payment, error: payError } = await supabase
      .from("fee_payments")
      .select("id, student_id, fee_id, amount, payment_method, payment_status, transaction_id, created_at, student_name")
      .eq("student_id", student.id)
      .eq("fee_id", fee_id)
      .eq("payment_status", "paid")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (payError || !payment) {
      console.log("Payment not found:", payError)
      return res.status(404).json({ message: "No payment found for this fee" })
    }

    console.log("Payment found:", payment.id, payment.transaction_id)

    // 3. Fetch class info
    const { data: classInfo } = await supabase
      .from("classes")
      .select("class_name, section")
      .eq("id", student.class_id)
      .single()

    // 4. Fetch fee structure for month, due_date, total amount
    const { data: feeStructure } = await supabase
      .from("fee_structure")
      .select("month, due_date, amount")
      .eq("id", fee_id)
      .single()

    // 5. Fetch student_fees record
    const { data: studentFee } = await supabase
      .from("student_fees")
      .select("amount, paid_amount, status")
      .eq("student_id", student.id)
      .eq("fee_id", fee_id)
      .single()

    // 6. Build receipt data
    const totalAmount = Number(studentFee?.amount || feeStructure?.amount || 0)
    const paidAmount = Number(studentFee?.paid_amount || payment.amount || 0)
    const remaining = Math.max(totalAmount - paidAmount, 0)

    const paymentDate = new Date(payment.created_at).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    const dueDate = feeStructure?.due_date
      ? new Date(feeStructure.due_date).toLocaleDateString("en-IN", {
          day: "2-digit", month: "long", year: "numeric"
        })
      : "N/A"

    const receiptData = {
      transaction_id: payment.transaction_id,
      payment_date: paymentDate,
      student_name: student.name || payment.student_name,
      class_name: `Class ${classInfo?.class_name || ""} - Section ${classInfo?.section || ""}`,
      roll_number: student.roll_number || "N/A",
      admission_num: student.admission_number || "N/A",  // ✅ FIXED: admission_num → admission_number
      month: feeStructure?.month || "N/A",
      fee_amount: totalAmount,
      paid_amount: paidAmount,
      remaining: remaining,
      payment_method: payment.payment_method || "N/A",
      due_date: dueDate,
      status: studentFee?.status || payment.payment_status || "paid",
    }

    console.log("Receipt data prepared for:", receiptData.month)

    // 7. Generate PDF
    const pdfBuffer = await generateFeeReceiptPDF(receiptData)

    // 8. Send as downloadable file
    const fileName = `Fee_Receipt_${feeStructure?.month || "Receipt"}_${student.roll_number || "Student"}.pdf`

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)
    res.setHeader("Content-Length", pdfBuffer.length)
    res.end(pdfBuffer)

  } catch (err) {
    console.error("downloadFeeReceipt error:", err)
    res.status(500).json({ message: "Server error generating receipt" })
  }
}









// ============================
// List All Receipts for Student
// GET /api/fees/receipts
// ============================
exports.getMyReceipts = async (req, res) => {
  try {
    const { data: student, error: stuErr } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single()

    if (stuErr || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    const { data: payments, error: payErr } = await supabase
      .from("fee_payments")
      .select("id, fee_id, amount, payment_method, payment_status, transaction_id, created_at")
      .eq("student_id", student.id)
      .eq("payment_status", "paid")
      .order("created_at", { ascending: false })

    if (payErr) return res.status(400).json(payErr)

    // Attach month info from fee_structure for each payment
    const enriched = await Promise.all(
      payments.map(async (p) => {
        const { data: fs } = await supabase
          .from("fee_structure")
          .select("month, due_date")
          .eq("id", p.fee_id)
          .single()

        return {
          id:             p.id,
          transaction_id: p.transaction_id,
          amount:         p.amount,
          payment_method: p.payment_method,
          status:         p.payment_status,
          month:          fs?.month || "N/A",
          created_at:     p.created_at,
        }
      })
    )

    res.json(enriched)

  } catch (err) {
    console.error("getMyReceipts error:", err)
    res.status(500).json({ message: "Server error" })
  }
}