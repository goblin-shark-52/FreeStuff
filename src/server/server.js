const express = require('express');
const path = require('path');
const cors = require('cors');

// Require in routers
const apiRouter = require('./routes/apiRouter');

// Require in controller
const apiController = require('./controllers/apiController');

// Set up server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../../dist')));

// Routes
app.use('/api', apiRouter);

// Catch-all handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 400,
    msg: { err: 'An error occurred' },
  };
  const errObj = { ...defaultErr, err };
  return res.status(errObj.status).json(errObj.msg);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
