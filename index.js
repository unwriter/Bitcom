#!/usr/bin/env node
const path = require('path')
require('dotenv').config({path: path.resolve(process.cwd(), '.bit')})
const init = require('./init')
const useradd = require('./useradd')
const create = require('./create')
const whoami = require('./whoami')
const tokenize = function(tokens) {
  let result = []
  let bundle = []
  for(let index=0; index<tokens.length; index++) {
    let token = tokens[index].toLowerCase()
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
  console.log(sequences)
  let cmd = sequences[0][0]
  if (cmd === 'init') {
    init()
  } else if (cmd === 'whoami') {
    whoami()
  } else if (cmd === 'useradd') {
    useradd()
  } else if (cmd === 'cat') {
    // bit cat README.md to readme
  } else if (cmd === 'echo') {
    if (sequences.length === 3
      && sequences[1] && sequences[1][0] === 'to'
      && sequences[2] && sequences[2].length === 1) {
        let content = sequences[0][1]
        let filename = sequences[2][0]
        console.log(content, filename)
        create(filename, content)
    }
  }
}
if (require.main === module) {
  if (process.argv.length >= 3) {
    let tok = tokenize(process.argv.slice(2))
    parse(tok)
  }
}
module.exports = {
  tokenize: tokenize,
  parse: parse
}

