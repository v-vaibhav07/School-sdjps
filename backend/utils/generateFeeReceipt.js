// utils/generateFeeReceipt.js
// Uses PDFKit — run: npm install pdfkit

const PDFDocument = require("pdfkit")

/**
 * Generates a professional fee receipt PDF buffer.
 * @param {object} data  - All receipt fields (see feeController.js for shape)
 * @returns {Promise<Buffer>}
 */
function generateFeeReceiptPDF(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 0 })
    const chunks = []

    doc.on("data", (chunk) => chunks.push(chunk))
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)

    const W = doc.page.width   // 595.28
    const H = doc.page.height  // 841.89
    const MARGIN = 40

    // ─── Colors ──────────────────────────────────────────────
    const C = {
      primary:   "#4F46E5",
      primaryDk: "#3730A3",
      light:     "#EEF2FF",
      green:     "#059669",
      greenBg:   "#F0FDF4",
      greenBdr:  "#22C55E",
      gray:      "#6B7280",
      border:    "#E5E7EB",
      text:      "#111827",
      rowAlt:    "#F9FAFB",
      white:     "#FFFFFF",
      footerBg:  "#F5F3FF",
      subText:   "#C7D2FE",
    }

    // ─── Header Banner ────────────────────────────────────────
    doc.rect(0, 0, W, 200).fill(C.primary)

    // School name
    doc
      .fillColor(C.white)
      .font("Helvetica-Bold")
      .fontSize(24)
      .text("SDJPS School", 0, 35, { align: "center" })

    // Subtitle
    doc
      .fillColor(C.subText)
      .font("Helvetica")
      .fontSize(12)
      .text("Fee Payment Receipt", 0, 65, { align: "center" })

    // Receipt badge box
    const badgeX = W / 2 - 140
    doc
      .roundedRect(badgeX, 95, 280, 50, 8)
      .fill(C.primaryDk)

    doc
      .fillColor(C.white)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(`Receipt No: ${data.transaction_id}`, 0, 107, { align: "center" })
      .font("Helvetica")
      .fontSize(9)
      .text(`Date: ${data.payment_date}`, 0, 123, { align: "center" })

    // PAID stamp (top-right)
    doc.save()
    doc.translate(W - 70, 55)
    doc.rotate(15, { origin: [0, 0] })
    doc
      .roundedRect(-40, -18, 80, 36, 6)
      .lineWidth(2)
      .strokeColor(C.greenBdr)
      .fillAndStroke(C.greenBg, C.greenBdr)
    doc
      .fillColor(C.green)
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("PAID", -40, -8, { width: 80, align: "center" })
    doc.restore()

    // ─── Student Info Card ────────────────────────────────────
    const cardY = 215
    doc
      .roundedRect(MARGIN, cardY, W - MARGIN * 2, 90, 8)
      .lineWidth(0.5)
      .strokeColor(C.primary)
      .fillAndStroke(C.light, C.primary)

    // Left column
    doc
      .fillColor(C.gray)
      .font("Helvetica")
      .fontSize(8)
      .text("STUDENT NAME", MARGIN + 15, cardY + 12)

    doc
      .fillColor(C.text)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text(data.student_name, MARGIN + 15, cardY + 24)

    doc
      .fillColor(C.gray)
      .font("Helvetica")
      .fontSize(8)
      .text("CLASS & SECTION", MARGIN + 15, cardY + 55)

    doc
      .fillColor(C.text)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(data.class_name, MARGIN + 15, cardY + 67)

    // Right column
    const midX = W / 2 + 15
    doc
      .fillColor(C.gray)
      .font("Helvetica")
      .fontSize(8)
      .text("ROLL NUMBER", midX, cardY + 12)

    doc
      .fillColor(C.text)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text(String(data.roll_number || "N/A"), midX, cardY + 24)

    doc
      .fillColor(C.gray)
      .font("Helvetica")
      .fontSize(8)
      .text("ADMISSION NO", midX, cardY + 55)

    doc
      .fillColor(C.text)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(data.admission_num || "N/A", midX, cardY + 67)

    // ─── Payment Details Header ───────────────────────────────
    const tableHeaderY = 325
    doc
      .roundedRect(MARGIN, tableHeaderY, W - MARGIN * 2, 28, 6)
      .fill(C.primary)

    doc
      .fillColor(C.white)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("PAYMENT DETAILS", MARGIN + 15, tableHeaderY + 9)

    // ─── Table Rows ───────────────────────────────────────────
    const rows = [
      { label: "Fee Month",       value: data.month,                    highlight: false },
      { label: "Fee Amount",      value: `Rs. ${data.fee_amount}`,      highlight: "primary" },
      { label: "Amount Paid",     value: `Rs. ${data.paid_amount}`,     highlight: "primary" },
      { label: "Remaining",       value: `Rs. ${data.remaining}`,       highlight: false },
      { label: "Payment Method",  value: (data.payment_method || "").toUpperCase(), highlight: false },
      { label: "Due Date",        value: data.due_date || "N/A",        highlight: false },
      { label: "Payment Status",  value: (data.status || "").toUpperCase(), highlight: "green" },
    ]

    const rowH = 30
    let rowY = tableHeaderY + 28

    rows.forEach((row, i) => {
      const bg = i % 2 === 0 ? C.rowAlt : C.white
      doc.rect(MARGIN, rowY, W - MARGIN * 2, rowH).fill(bg)

      // divider
      doc
        .moveTo(MARGIN, rowY)
        .lineTo(W - MARGIN, rowY)
        .lineWidth(0.3)
        .strokeColor(C.border)
        .stroke()

      // label
      doc
        .fillColor(C.gray)
        .font("Helvetica")
        .fontSize(9)
        .text(row.label, MARGIN + 15, rowY + 10)

      // value (right-aligned)
      const valColor =
        row.highlight === "primary" ? C.primary :
        row.highlight === "green"   ? C.green   : C.text

      doc
        .fillColor(valColor)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(String(row.value), MARGIN, rowY + 10, {
          width: W - MARGIN * 2 - 15,
          align: "right"
        })

      rowY += rowH
    })

    // Bottom border of table
    doc
      .moveTo(MARGIN, rowY)
      .lineTo(W - MARGIN, rowY)
      .lineWidth(0.3)
      .strokeColor(C.border)
      .stroke()

    // ─── Total Box ────────────────────────────────────────────
    const totalY = rowY + 15
    doc
      .roundedRect(MARGIN, totalY, W - MARGIN * 2, 40, 8)
      .fill(C.primary)

    doc
      .fillColor(C.white)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("TOTAL AMOUNT PAID", MARGIN + 15, totalY + 13)

    doc
      .fillColor(C.white)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text(`Rs. ${data.paid_amount}`, MARGIN, totalY + 11, {
        width: W - MARGIN * 2 - 15,
        align: "right"
      })

    // ─── Footer ───────────────────────────────────────────────
    const footerH = 80
    doc.rect(0, H - footerH, W, footerH).fill(C.footerBg)

    doc
      .fillColor(C.gray)
      .font("Helvetica")
      .fontSize(8)
      .text(
        "This is a computer-generated receipt and does not require a physical signature.",
        0, H - footerH + 16,
        { align: "center" }
      )
      .text(
        "For queries contact: school@sdjps.edu.in | +91-XXXXXXXXXX",
        0, H - footerH + 30,
        { align: "center" }
      )

    doc
      .fillColor(C.primary)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(
        "SDJPS School — Empowering Future Generations",
        0, H - footerH + 50,
        { align: "center" }
      )

    doc.end()
  })
}

module.exports = { generateFeeReceiptPDF }