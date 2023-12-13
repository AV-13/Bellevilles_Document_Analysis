const express = require('express');

const Quotation = require('../models/Quotation');

const router = express.Router();

const quotationController = require('../controllers/quotationController');

router.post('/analyze', quotationController.analyzeQuotation);
// TODO GET request get all quotatiobs by group id
router.get('/getQuotationsByGroup', quotationController.getQuotationsByGroup);


module.exports = router;