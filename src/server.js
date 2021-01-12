const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.send('Pong');
});

app.listen(process.env.SERVER_PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started`);
});
