const R = require('ramda');

module.exports = function ParqueResponse(res, status, err, data) {
  let body;

  if (err) {
    const { code, message } = err;

    body = {
      error: { code, message },
    };
  } else if (data || !R.isEmpty(data)) {
    body = {
      data,
    };
  }

  res.status(status).send(body);
};
