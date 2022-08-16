const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '62fbd358ddc8d8cb51848294' };
  next();
});

app.use('*', (req, res, next) => {
  console.log(`Пришел запрос! URL: ${req.baseUrl}, Метод: ${req.method}`);
  next();
});
app.use(routes);

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  }, () => { console.log('Запущена БД'); });
  await app.listen(PORT, () => {
    console.log(`Запущен порт ${PORT}`);
  });
};

main();
