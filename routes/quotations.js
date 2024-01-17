const express = require('express');

const Quotation = require('../models/Quotation');

const router = express.Router();

const quotationController = require('../controllers/quotationController');

router.post('/analyze', quotationController.analyzeQuotation);
router.put('/updateQuotation/:id', quotationController.updateQuotation);
router.delete('/deleteQuotation/:id', quotationController.deleteQuotation);
// TODO GET request get all quotatiobs by group id
router.get('/getQuotationsByGroup', quotationController.getQuotationsByGroup);
router.get('/getAllQuotations', quotationController.getAllQuotations);



module.exports = router;