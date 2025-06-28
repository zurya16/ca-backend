const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    console.log("Booking saved:", booking);
    res.status(201).json({ success: true, message: "Booking successful" });
  } catch (error) {
    console.error(" Booking error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// @route GET /api/bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
});

module.exports = router;
