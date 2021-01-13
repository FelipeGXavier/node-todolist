const {
  save,
  userExists,
  findTaskFromUser,
  findUserById,
} = require('../repository/userRepository');
const User = require('../entities/user');

const checkEmailExists = async (res, result) => {
  const exists = await userExists(result.user.email);
  if (exists) {
    res.status(409);
    return res.json({
      message: 'Esse usuário já existe',
    });
  }
  return null;
};

const checkUserExists = async (res, id) => {
  const exists = await findUserById(parseInt(id, 10));
  if (!exists) {
    res.status(400);
    return res.json({
      message: 'Esse usuário não existe',
    });
  }
  return null;
};

async function insert(req, res) {
  const { email } = req.body;
  const result = await User.create({ email });
  if (result.valid) {
    const checkEmail = await checkEmailExists(res, result);
    if (checkEmail) {
      return checkEmail;
    }
    const user = await save(result.user);
    return res.send(user);
  }
  res.status(400);
  return res.send(result);
}

async function findTasks(req, res) {
  const { id } = req.params;
  const checkUser = await checkUserExists(res, id);
  if (checkUser) {
    return checkUser;
  }
  const tasks = await findTaskFromUser(id);
  return res.json({ tasks });
}

module.exports = {
  insert,
  findTasks,
};
