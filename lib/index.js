#!/usr/bin/env node
'use strict'

const readline = require('readline')
const {execSync} = require('child_process')

const argv = require('yargs')
  .boolean('e').alias('e', 'exec')
  .boolean('l').alias('l', 'list')
  .boolean('j').alias('j', 'json')
  .argv

const lines = [
  [m => m.l || m.list, cmd => cmd.map(c => [c])],
  [m => m.j || m.json, cmd => JSON.parse(cmd)],
  [_ => true,          cmd => execSync(cmd.join(' ')).toString().split('\n').map(s => s.trim()).filter(Boolean).map(v => [v])]
].find(([fn]) => fn(argv))[1](argv._)

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
