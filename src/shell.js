import readline from 'readline'
import os from 'os'
import { parse } from './parser.js'
import { execute } from './executor.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const prompt = () => {
  const user = os.userInfo().username
  const cwd = process.cwd()
  return `\x1b[1;32m${user}\x1b[0m:\x1b[1;34m${cwd}\x1b[0m $ `
}

const loop = () => {
  rl.question(prompt(), async line => {
    const ast = parse(line)
    if (ast) await execute(ast)
    loop()
  })
}

loop()
