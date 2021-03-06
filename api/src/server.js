const express = require('express');
const cors = require('cors');
const userRoutes = require('./todo/routes/userRoutes');
const taskRoutes = require('./todo/routes/taskRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.get('http://127.0.0.1', cors());
app.post('http://127.0.0.1', cors());

app.get('/api/ping', (req, res) => {
  res.send('Pong');
});

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.listen(process.env.SERVER_PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started`);
});
