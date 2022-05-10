const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(process.env.PWD, 'public')));

// импорт роутеров
const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const registerRouter = require('./routes/registerRouter');

app.use(session({
  secret: 'BRIDGE',
  store: new FileStore(),
  resave: false,
  saveUninitialized: false,
  name: 'os',
  cookie: { httpOnly: true },
})); // эта строчка для сессии везде идентична - просто вставить

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.name = req.session?.name;
  next();
}); // создает локальную переменную, которая сущ-ет если польз-ль залогинин

// подключение роутеров
app.use('/', mainRouter);
app.use('/', productsRouter);
app.use('/', registerRouter);

app.listen(PORT, () => {
  console.log('Server start on port', process.env.PORT);
});
