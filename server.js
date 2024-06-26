
if (process.env.NODE_ENV !== 'prodction') {
    require('dotenv').config()    
}



const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRoute = require('./routes/index');
const authorRoute = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose'));


app.use('/', indexRoute);
app.use('/authors', authorRoute);

app.listen(process.env.PORT || 3000);