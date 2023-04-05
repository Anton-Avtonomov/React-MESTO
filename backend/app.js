// Импортируем модули
require("dotenv").config(); // old version
const { API_URL, FRONT_URL } = process.env;
const express = require("express");
const mongoose = require("mongoose"); // Пакет для работы с MONGODB
const rateLimit = require("express-rate-limit"); // Защита от DDOS attack - лимиттер запросов
const helmet = require("helmet"); // Защита от XSS attack
// const cookieParser = require("cookie-parser"); // Пакет для прикрепления куков к запросам (появляется req.cookies)
const { errors } = require("celebrate");
const cors = require("cors");
const auth = require("./middlewares/auth"); // Мидлвер авторизации
const { validationRouteSignUp, validationRouteSignIn } = require("./middlewares/joi");
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const { createUser, login } = require("./controllers/authorization");
const centerErrors = require("./middlewares/centerErrors"); // Мидлвер обработки ошибки
const NotFoundError = require("./errors/NotFoundError");

const app = express(); // Создаем приложение!
app.use(cors({
  origin: ["http://localhost:3000", "https://mesto-avtonomov.nomoredomains.work"], // Разрешаем запросы с определенных адресов(фронта)
  credentials: true // Разрешаем передачу авторизационных кук
}));

const limitter = rateLimit({ // Параметры лимиттера
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});

app.use(express.json()); // Подключаем мидлвар для обработки req.body!
app.use(limitter); // Активируем лимиттер
app.use(helmet()); // Активируем helmet
// app.use(cookieParser()); // Создаём объект req.cookies
// Маршрутизация ,без верификации
app.post("/signin", validationRouteSignIn, login);
app.post("/signup", validationRouteSignUp, createUser);

// Марштуризация с верификацией "auth"
app.use("/users", auth, usersRoutes);
app.use("/cards", auth, cardsRoutes);

app.all("*", auth, (req, res, next) => { // Все Неизвестные роуты
  next(new NotFoundError("Ошибка 404. Страница не найдена!"));
});
async function startServer() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect("mongodb://localhost:27017/mestodb"); // !Подключаемся к серверу БД>!
    const { PORT = 3001 } = process.env; // !Указываем порт для сервера, по умолчанию 3000

    app.listen(PORT, () => { // Устанавливаем слушатель порта!
      console.log(`Сервер запущен на порту: ${PORT}, в ${new Date()}`); // Проверка сервера
    });
  } catch (err) {
    console.log(new Error("Возникла ошибка при запуске сервера!"));
  }
}

startServer();

app.use(errors()); // обработчик ошибок JOI, работает только с ошибками JOI, остальные пропускает
app.use(centerErrors); // обработчик общих ошибок
