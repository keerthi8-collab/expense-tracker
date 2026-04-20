const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// Add Expense
router.post("/", auth, async (req, res) => {
  const exp = new Expense({ ...req.body, userId: req.user.id });
  await exp.save();
  res.json(exp);
});

// Get Expenses
router.get("/", auth, async (req, res) => {
  const data = await Expense.find({ userId: req.user.id });
  res.json(data);
});

// Analysis
router.get("/analysis", auth, async (req, res) => {
  const data = await Expense.find({ userId: req.user.id });

  let total = data.reduce((sum, e) => sum + e.amount, 0);
  let score = 100 - (total / 50);

  let tips = [];
  if (total > 2000) tips.push("Reduce spending");
  if (data.filter(e => e.amount < 50).length > 5)
    tips.push("Small expenses are increasing!");

  res.json({
    total,
    score: Math.max(score, 0),
    tips
  });
});

module.exports = router;