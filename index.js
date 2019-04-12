#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
require('dotenv').config({path: path.resolve(process.cwd(), '.bit')})
const bin = {}
const keywords = ['cat', 'echo', 'route', 'useradd', 'to']
const tokenize = function(tokens) {
  let result = []
  let bundle = []
  for(let index=0; index<tokens.length; index++) {
    let token = tokens[index]
    if (keywords.includes(token.toLowerCase())) {
      token = token.toLowerCase()
    }
    if (['to'].includes(token)) {
      result.push(bundle)
      result.push([token])
      bundle = []
    } else {
      bundle.push(token) 
    }
  }
  result.push(bundle)
  return result
}
const parse = function(sequences) {
  let cmd = sequences[0][0]
  return {
    cmd: bin[cmd],
    params: sequences
  }
}
if (require.main === module) {
  if (process.argv.length >= 3) {
    fs.readdir(__dirname + "/bin", async function(err, items) {
      for (let i=0; i<items.length; i++) {
        let name = items[i].split('.')[0];
        bin[name] = require(__dirname + "/bin/" + items[i])
      }
      let tok = tokenize(process.argv.slice(2))
      let program = parse(tok)
      if (program) {
        program.cmd(program.params)
      } else {
        console.log("Error: command doesn't exist")
      }
    });
  }
}
module.exports = {
  tokenize: tokenize,
  parse: parse
}
