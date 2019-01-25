const datapay = require('datapay')
module.exports = function(filename, content) {
  // broadcast address to the blockchain
  if (process.env.ADDRESS && process.env.PRIVATE) {
    let payload = {
      data: ["$", "echo", content, "to", filename],
      pay: { key: process.env.PRIVATE }
    }
    console.log("Publishing payload = ", JSON.stringify(payload, null, 2))
    datapay.send(payload, function(err, tx) {
      if (err) console.log(err)
      console.log(tx)
    })
  } else {
    console.log("Please run 'bit init' to generate a keypair")
    process.exit()
  }
}
