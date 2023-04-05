const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок
  // console.log('мидлвар авторизации');
  // const authorization = req.cookies.jwt;
  if (!authorization || !authorization.startsWith('Bearer ')) { // убеждаемся, что нет авторизации или token не начинается с Bearer
    // console.log('ошибка авторизации')
    throw new AuthorizationError('Необходима авторизация!');
  }
  // Если пользователь авторизован
  const token = authorization.replace('Bearer ', ''); // извлечём токен без 'приставки' Bearer
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET); // Проверяет и возвращает payload JWT
    // console.log('токен валиден');
  } catch (err) {
    // console.log('токен НЕ валиден!!!')
    next(err);
  }
  req.user = payload; // добавляем к след. запросу payload (объект с полем jwtId)
  return next();
};
