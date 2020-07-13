const send = (res, err, httpStatusCode = 500, overwriteOriginalMessageErrorWith) => {
  console.log(err);

  const data = {
    message: overwriteOriginalMessageErrorWith || err.message
  }

  res.status(httpStatusCode).send(data);
}

module.exports = {
  send
}