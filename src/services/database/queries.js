const admDBAccess = require('./access');

const findUserByEmail = async (email) => {
  const consulta = `SELECT *
                    FROM users
                    WHERE users.email = '${email}'`;
  return await admDBAccess.executeQuery(consulta);
};

module.exports = {
  findUserByEmail
};