const qrcode = require('qrcode-terminal');
const datapay = require('datapay')
module.exports = function() {
  if (process.env.ADDRESS) {
    console.log("#################################################")
    console.log("##")
    console.log("## Welcome to Bitcom, a Bitcoin Unix Computer")
    console.log("##")
    console.log("## Here is your Bitcoin Address")
    console.log("## [Look inside .bit file for Private/Public Keys]")
    console.log("##")
    console.log("## Address: " + process.env.ADDRESS)
    console.log("##")
    console.log("#################################################\n")
    qrcode.generate("bitcoin:"+process.env.ADDRESS, function(code) {
      console.log(code)
      datapay.connect('https://bchsvexplorer.com').address(process.env.ADDRESS, function(err, info) {
        if (err) {
          console.log("Error: ", err)
        } else {
          balance = info.balance
          console.log("\nbalance: ", info.balance)
          console.log("\nCharge the address with small amount of Bitcoin SV to get started.\n\n")
        }
      });
    })
  } else {
    console.log("You haven't generated a keypair. Look inside the .bit file, or generate a new one with 'bit init'")
  }
}
