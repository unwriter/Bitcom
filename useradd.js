const datapay = require('datapay')
module.exports = function(params) {
  if (process.env.ADDRESS && process.env.PRIVATE) {
    let payload = {
      data: ["$", "useradd", process.env.ADDRESS],
      pay: { key: process.env.PRIVATE }
    }
    console.log("Publishing payload = ", JSON.stringify(payload, null, 2))
    datapay.send(payload, function(err, tx) {
      if (err) console.log("error", err)
      console.log(tx)
    })
  } else {
    console.log("Please run 'bit init' to generate a keypair")
    process.exit()
  }
}
