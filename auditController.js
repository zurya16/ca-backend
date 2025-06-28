// controllers/auditController.js
const AuditRequest = require('../models/AuditRequest');

exports.submitAuditForm = async (req, res) => {
  try {
    const { name, email, phone, companyName, auditType, checklist } = req.body;
    const files = req.files?.map(f => f.path) || [];

    const newAudit = new AuditRequest({
      name,
      email,
      phone,
      companyName,
      auditType,
      checklist,
      uploadedDocs: files,
    });

    await newAudit.save();
    res.status(201).json({ message: 'Audit request submitted', data: newAudit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
