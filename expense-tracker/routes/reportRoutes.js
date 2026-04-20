const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

// CSV
router.get("/csv", auth, async (req, res) => {
  const data = await Expense.find({ userId: req.user.id });
  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("report.csv");
  res.send(csv);
});

// PDF
router.get("/pdf", auth, async (req, res) => {
  const doc = new PDFDocument();
  doc.pipe(res);

  const data = await Expense.find({ userId: req.user.id });
  data.forEach(e => {
    doc.text(`${e.title} - ₹${e.amount}`);
  });

  doc.end();
});

module.exports = router;