const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();


//
app.listen(config.PORT, ()=>{
    console.log(`Started on port ${config.PORT}`);
})
