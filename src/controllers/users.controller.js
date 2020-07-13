const responseHelper = require('../helpers/response.error.helper');

const requestGetUsers = async (req, res) => {
  try {
    const response = {ok : 'ok'};
    return res.send(response);
  } catch (err) {
    return responseHelper.send(res, err);
  }
};

const requestGetUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userIdToken = req.accessTokenPayload.userId;

    console.log(`requestGetUsers - userId: ${userId} | userIdToken: ${userIdToken}`);

    if (userId == userIdToken) {
      const response = {
        userId,
        message: 'user found'
      };
      return res.status(200).send(response);
    }else{
      const err = {};
      err.message = 'user not found'
      return responseHelper.send(res, err, 404);
    }

  } catch (err) {
    return responseHelper.send(res, err);
  }
}

module.exports = {
  requestGetUsers,
  requestGetUser
}