const express = require('express');
const { insert } = require('../controller/userController');

const router = express.Router();

router.post('/', (req, res) => insert(req, res));

module.exports = router;
