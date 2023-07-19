const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

const routes = require('./routes');
const { sequelize } = require('./models');

dotenv.config();

passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('데이터베이서 연결성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
