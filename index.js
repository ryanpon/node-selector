#!/usr/bin/env node
'use strict'

const readline = require('readline')
const {execSync} = require('child_process')

const argv = require('yargs')
  .default('mode', 'exec')
  .alias('mode', 'm')
  .boolean('e')
  .argv

const command = argv._

const lines = (mode => {
  switch (mode) {
    case 'e':
    case 'exec':
      return execSync(command.join(' '))
        .toString().split('\n').map(s => s.trim()).filter(Boolean).map(c => [c])
    case 'l':
    case 'list':
      return command.map(c => [c])
    case 'j':
    case 'json':
      return JSON.parse(command)
    default:
      throw new Error(`Unrecognized mode "${mode}"`)
  }
})(argv.mode)

const maxLineLen = lines.map(([l]) => l.length).sort((a, b) => b - a)[0]
const pad = Array(maxLineLen).fill(' ').join('')

lines.forEach(([cmd, comment = ''], i) => {
  process.stderr.write(`(${i + 1})  ${(cmd + pad).slice(0, maxLineLen)}`)
  !comment || process.stderr.write(`   ## ${comment}`)
  process.stderr.write('\n')
})
process.stderr.write('\n')

const rl = readline.createInterface({input: process.stdin, output: process.stderr})
rl.question('Which line do you want to select? ', answer => {
  process.stdout.write(lines[parseInt(answer, 10) - 1][0])
  rl.close()
})
