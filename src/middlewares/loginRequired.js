import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      erros: ['Login requeried'],
    });
  }

  const [texto, token] = authorization.split(' ');
  console.log(token);
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json({
      erros: ['Token expirado ou inválido'],
    });
  }
};
