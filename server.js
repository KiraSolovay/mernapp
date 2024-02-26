// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
require('dotenv').config()
require('./config/database');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));




app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Express app running on port ${port}`));