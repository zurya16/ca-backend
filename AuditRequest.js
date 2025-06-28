const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  auditType: String,
  description: String,
  files: {
    pan: String,
    gst: String,
    financials: String,
    invoices: String,
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditRequest', auditSchema);
