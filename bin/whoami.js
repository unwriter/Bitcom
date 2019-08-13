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
      datapay.connect().address(process.env.ADDRESS, function(err, info) {
        if (err) {
          console.log("Error: ", err)
        } else {
          balance = info.balance
          console.log("\nbalance: ", info.balance)
          console.log("\nOption 1. Charge the address with QR code, with small amount of Bitcoin SV to get started.\n")
          let payload = {
            "to": process.env.ADDRESS,
            "editable": true,
            "currency": "USD",
            "type": "tip"
          }
          let str = JSON.stringify(payload);
          let b64 = Buffer.from(str).toString("base64");
          let url = "https://button.bitdb.network/#" + b64;
          console.log("Option 2. Charge with Moneybutton:\n" + url + "\n");
        }
      });
    })
  } else {
    console.log("You haven't generated a keypair. Look inside the .bit file, or generate a new one with 'bit init'")
  }
}
