const jwt = require('jsonwebtoken');
const responseHelper = require('../helpers/response.error.helper');

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const middlewareOpenToken = (req, res, next) => {
  const token = req.headers['access-token'];

  try {
    jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return responseHelper.send(res, err, 403);
      }
      delete decoded.iat;
      req.accessTokenPayload = decoded;
      return next();
    });
  } catch (err) {
    return responseHelper.send(res, err);
  }
}

const requestCreateToken = (req, res) => {
  if (req.body && req.body.userId) {
    try {
      const token = jwt.sign({ userId: req.body.userId }, TOKEN_SECRET_KEY);
      return res.status(201).json({ token });
    } catch (err) {
      return responseHelper.send(res, err);
    }
  }

  const err = new Error('LTI did not provide the data');
  return responseHelper.send(res, err, 403);
}

const requestGetTokenPayload = (req, res) => {
  return res.send(req.accessTokenPayload);
}

module.exports = {
  middlewareOpenToken,
  requestCreateToken,
  requestGetTokenPayload
}