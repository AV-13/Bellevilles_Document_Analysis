const express = require('express');

const Group = require('../models/Groups');

const router = express.Router();

const groupsController = require('../controllers/groupsController');

router.post('/create', groupsController.createGroup);

// TODO GET all group Request
router.get('/getgroups', groupsController.getAllGroups);
module.exports = router;