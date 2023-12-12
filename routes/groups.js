const express = require('express');

const Quotation = require('../models/Groups');

const router = express.Router();

const groupsController = require('../controllers/groupsController');

router.post('/groups/create', groupsController.createGroup);

module.exports = router;