const post = require('../lib/post')
module.exports = function(params) {
  post(["$", "useradd", process.env.ADDRESS])
}
