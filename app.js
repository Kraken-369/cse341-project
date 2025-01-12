const express = require('express');
const bodyParser = require('body-parser');
const {initDB, getDB} = require('./connects/db');
const routes = require('./routes/contactRouter');

// const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})
app.use('/contact', routes);

(async () => {
  try {
    await initDB();
    const db = getDB();

    // app.listen(port, () => console.log('-==::APP is running::==-'));
    console.log('-==::APP is running::==-')
  } catch (error) {
    console.error('Failed to initialize DB:', error);
  }
})();