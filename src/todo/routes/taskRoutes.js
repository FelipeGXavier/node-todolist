const express = require('express');
const { insert, deleteTaskByUser } = require('../controller/taskController');

const router = express.Router();

router.post('/', (req, res) => insert(req, res));
router.delete('/:id/user/:user', (req, res) => deleteTaskByUser(req, res));

module.exports = router;
