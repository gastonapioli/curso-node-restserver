const { response } = require("express");

const login = (req, res = response) => {
  res.json({
    msg: "login",
  });
};

module.exports = {
  login,
};