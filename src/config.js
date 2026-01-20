import { spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export function loadConfig() {
  const file = path.join(process.env.HOME, '.gsh-config.lua')
  if (!fs.existsSync(file)) return { aliases: {}, env: {} }

  const out = spawnSync('lua', [file], { encoding: 'utf8' })
  if (out.error) return { aliases: {}, env: {} }

  const aliases = {}
  const env = {}

  out.stdout.split('\n').forEach(line => {
    if (line.startsWith('ALIAS ')) {
      const [k, v] = line.slice(6).split('=')
      aliases[k] = v
    }
    if (line.startsWith('ENV ')) {
      const [k, v] = line.slice(4).split('=')
      env[k] = v
    }
  })

  return { aliases, env }
}
