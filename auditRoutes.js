const express = require('express');
const multer = require('multer');
const AuditRequest = require('../models/AuditRequest');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post(
  '/audit-request',
  upload.fields([
    { name: 'pan' },
    { name: 'gst' },
    { name: 'financials' },
    { name: 'invoices' },
  ]),
  async (req, res) => {
    try {
      const files = req.files;
      const newRequest = new AuditRequest({
        ...req.body,
        files: {
          pan: files.pan?.[0]?.filename || '',
          gst: files.gst?.[0]?.filename || '',
          financials: files.financials?.[0]?.filename || '',
          invoices: files.invoices?.[0]?.filename || '',
        },
      });

      await newRequest.save();
      res.status(200).json({ message: 'Audit request stored successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
