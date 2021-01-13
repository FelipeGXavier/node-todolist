const express = require('express');
const { insert, findTasks } = require('../controller/userController');

const router = express.Router();

router.post('/', (req, res) => insert(req, res));
router.get('/:id/tasks', (req, res) => findTasks(req, res));

module.exports = router;
