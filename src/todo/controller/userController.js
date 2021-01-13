const { save, userExists } = require('../repository/userRepository');
const User = require('../entities/user');

async function insert(req, res) {
  const { email } = req.body;
  const result = await User.create({ email });
  if (result.valid) {
    const exists = await userExists(result.user.email);
    if (exists) {
      res.status(409);
      return res.json({
        message: 'Esse usuário já existe',
      });
    }
    const user = await save(result.user);
    return res.send(user);
  }
  res.status(400);
  return res.send(result);
}

module.exports = {
  insert,
};
