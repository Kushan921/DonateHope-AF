const { defaults } = require("react-jest-config");

module.exports = {
  ...defaults,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
