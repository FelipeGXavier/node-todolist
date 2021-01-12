const express = require('express');
const userRoutes = require('./todo/routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send('Pong');
});

app.use('/user', userRoutes);

app.listen(process.env.SERVER_PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started`);
});
