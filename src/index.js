require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
})

router.get('/', (req, res) => {
  const response = {ok : 'ok'};
  return res.send(response);
})

// api/access-token
const accessTokenController = require('./controllers/access.token.controller');
router.post('/access-token', accessTokenController.requestCreateToken);
router.get('/access-token', accessTokenController.middlewareOpenToken, accessTokenController.requestGetTokenPayload);

// api/users
const usersControler = require('./controllers/users.controller');
router.get('/users', accessTokenController.middlewareOpenToken, usersControler.requestGetUsers);
router.get('/users/:userId', accessTokenController.middlewareOpenToken, usersControler.requestGetUser);

const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', router);

app.listen(port);