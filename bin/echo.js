const post = require('../lib/post')
module.exports = function(params) {
  if (params.length === 3 && params[1] && params[1][0] === 'to' && params[2] && params[2].length === 1) {
    let content = params[0][1]
    let filename = params[2][0]
    console.log(content, filename)
    post(["$", "echo", content, "to", filename])
  }
}
