module.exports = require('./make-webpack-config')({
  development: true,
  // Set to true to enable redux dev panel.
  devPanel: false,
  devtool: "source-map",
  debug: true
});
