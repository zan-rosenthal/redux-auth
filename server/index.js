const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://localhost:auth/auth');
mongoose.connection.on('connected', function(){
  console.log('Server connected to MongoDB')
});

//App setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);

//Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app) ;
server.listen(port);
console.log('Server listening on: ', port);