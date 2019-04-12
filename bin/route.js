/**********************************
*
* [Syntax]
* route enable $PATH
*
* [Example]
* route enable /tx/:tx
*
* [Syntax]
* route add $ADDRESS $PATH $ENDPOINT
*
* [Example]
* route add 19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut /:tx https://bico.media/${tx}
*
**********************************/
const post = require('../lib/post')
const endpoint = "https://babel.bitdb.network/q/1DHDifPvtPgKFPZMRSxmVHhiPvFmxZwbfh/"
const apikey = "1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU"
const axios = require('axios')
module.exports = function(params) {
  if (params.length === 1) {
    let items = params[0]
    if (items.length >= 3) {
      let cmd = items[1];
      let args = items.slice(2);
      if (cmd === 'enable' && args.length === 1) {
        post(["$"].concat(items))
      } else if (cmd === 'add') {
        if (args.length === 3) {
          if (process.env.ADDRESS === args[0]) {
            console.log("[Error] It is not recommended for admins to add routes, adding routes are for service providers. If you want to act as a service provider, create a separate account (create a new folder and run 'bit init') and run 'route add' again.")
          } else {
            // check that the route is enabled
            let address = items[2]
            let route = items[3]
            var query = {
              "v": 3,
              "q": {
                "db": ["c"],
                "find": {
                  "in.e.a": address,
                  "out.s4": route
                },
                "project": {
                  "out.s1": 1, "out.s2": 1, "out.s3": 1, "out.s4": 1, "out.s5": 1
                }
              }
            };
            var s = JSON.stringify(query);
            var b64 = Buffer.from(s).toString('base64');
            var url = endpoint + b64;
            var header = { headers: { key: apikey } };
            axios.get(url, header).then(function(r) {
              console.log("response = ", r.data)
              if (r.data.c && r.data.c.length > 0) {
                console.log("route exists:", address, route)
                post(["$"].concat(items))
              } else {
                console.log("route doesn't exist", address, route)
              }
            })
          }
        } else {
          console.log("Syntax: 'bit route add [BITCOM_ADDRESS] [ROUTE] [SERVICE_ENDPOINT]'")
        }
      }
    }
  }
}
