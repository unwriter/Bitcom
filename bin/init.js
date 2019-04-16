const datapay = require('datapay')
const qrcode = require('qrcode-terminal');
const fs = require('fs')
const createKey = function() {
  let privateKey = new datapay.bsv.PrivateKey();
  let address = privateKey.toAddress();
  let pubKey = privateKey.toPublicKey();
  return {PRIVATE: privateKey.toWIF(), ADDRESS: address.toString(), PUBLIC: pubKey.toString()}
}
module.exports = function() {
  let _path = process.cwd() + "/.bit"
  if (fs.existsSync(_path)) {
    console.log("Bitcom already initiated. Use a folder with no .bit file.")
    return;
  }
  let stream = fs.createWriteStream(_path)
  let keys = createKey()
  stream.once('open', function(fd) {
    let content = Object.keys(keys).map(function(key) {
      return key + "=" + keys[key] 
    }).join("\n")
    stream.write(content)
    stream.end();
    console.log("#################################################")
    console.log("##")
    console.log("## Welcome to Bitcom, a Bitcoin Unix Computer")
    console.log("##")
    console.log("## Created a Bitcoin Key Pair + Address")
    console.log("## [Look inside .bit file]")
    console.log("##")
    console.log("## Address: " + keys.ADDRESS)
    console.log("##")
    console.log("#################################################\n")
    qrcode.generate("bitcoin:"+keys.ADDRESS, function(code) {
      console.log(code)
      datapay.connect('https://bchsvexplorer.com').address(keys.ADDRESS, function(err, info) {
        if (err) {
          console.log("Error: ", err)
        } else {
          balance = info.balance
          console.log("\nbalance: ", info.balance)
          console.log("\nOption 1. Charge the address with QR code, with small amount of Bitcoin SV to get started.\n")
          let payload = {
            "to": keys.ADDRESS,
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
  });
}
