const { save } = require('../repository/userRepository');

async function insert(req, res) {
  const { email } = req.body;
  if (email.length === 0) {
    res.status(400);
    res.json({
      message: 'Invalid Email',
      success: false,
    });
  }
  const result = await save(email);
  res.send(result);
}

module.exports = {
  insert,
};
