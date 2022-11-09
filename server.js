const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//rotas
const publicRouter = require('./routes/public.routes')
const privateRouter = require('./routes/private.routes')

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'asd7394asdjs83_asd&&ad#f@50gmdualg89674ahfpa',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false
  }
}));

app.use('/', publicRouter);
app.use('/', privateRouter)

app.listen(3000, () => {
  console.log('Servidor inicializado na porta 3000');
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

