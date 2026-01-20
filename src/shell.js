import readline from 'readline'
import os from 'os'
import { parse } from './parser.js'
import { execute } from './executor.js'
import { loadConfig } from './config.js'

const config = loadConfig()

Object.entries(config.env).forEach(([k, v]) => {
  process.env[k] = v
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function defaultPrompt() {
  const user = os.userInfo().username
  const cwd = process.cwd()
  return `\x1b[1;32m${user}\x1b[0m:\x1b[1;34m${cwd}\x1b[0m $ `
}

function prompt() {
  if (typeof config.prompt === 'function') {
    try {
      return config.prompt({
        user: os.userInfo().username,
        cwd: process.cwd()
      })
    } catch {
      return defaultPrompt()
    }
  }
  return defaultPrompt()
}

function loop() {
  rl.question(prompt(), async line => {
    const ast = parse(line)
    if (ast) await execute(ast, config)
    loop()
  })
}

loop()
