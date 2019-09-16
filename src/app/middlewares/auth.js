import jwt from 'jsonwebtoken';

const verifyJWT = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.',
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const { id } = jwt.verify(token, process.env.APP_SECRET);

    req.userId = id;
    return next();
  } catch (err) {
    return res.status(500).send({
      auth: false,
      message: 'Failed to authenticate token.',
    });
  }
};

export default verifyJWT;
