const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();


///###### HBS SETUP ##########///
//1. Khai bao engine
app.engine('hbs',hbs({
    extname: 'hbs', //ten file
    defaultLayout: 'main', //Layout mac dinh
    layoutsDir: __dirname + './../views/layouts',//Vi tri File layout macdinh
    partialsDir: __dirname + './../views/partials'//Vi tri file layout thanh phan
}))
//2. Thiet lap view engine
app.set('view engine','hbs')
// MODEL
const {User} = require('./models/user');

// MID
app.use('/css',express.static(__dirname + './../public/css'));
app.use('/js', express.static(__dirname +'./../public/js'));
app.use(bodyParser.json());
app.use(cookieParser());
///###### DATABASE ##########///
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

/// ###### API ROUTE ##########///
// GET
/// Cac view template can phai nam ngay trong thu muc view
app.get('/', (req,res)=>{
    res.render('home');
})
app.get('/register', (req, res)=>{
    res.render('register');
})


// POST
app.post('/api/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err, doc)=>{
        if (err) res.status(404).send(err);
        //tao token cho user dang nhap
        user.generateToken((err,user)=>{
            if (err) res.status(404).send(err);
            // Luu token vao trong cookie
            res.cookie('auth', user.token).send('ok');
        })
    })
})
app.listen(config.PORT, ()=>{
    console.log(`Started on port ${config.PORT}`);
})
