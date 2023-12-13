const express = require('express');

const Quotation = require('../models/Quotation');

const router = express.Router();

const quotationController = require('../controllers/quotationController');

router.post('/analyze', quotationController.analyzeQuotation);
  
  
module.exports = router;