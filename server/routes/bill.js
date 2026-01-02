const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

// Create bill
router.post("/create", async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "Items are required" });
    }

    if (!total) {
      return res.status(400).json({ msg: "Total amount required" });
    }

    const bill = new Bill({
      items,
      total
    });

    await bill.save();

    res.json({
      billId: bill._id,
      total: bill.total,
      status: bill.status
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
// Fetch bill by ID (Admin)
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ msg: "Bill not found" });
    }

    res.json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
// Confirm payment
router.post("/confirm/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ msg: "Bill not found" });
    }

    bill.status = "PAID";
    await bill.save();

    res.json({
      msg: "Payment confirmed",
      billId: bill._id,
      status: bill.status
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
