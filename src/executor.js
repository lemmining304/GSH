import { spawn } from 'child_process'

export async function execute(ast, config) {
  if (ast.length === 1) {
    const { cmd, args } = ast[0]
    if (config.builtins && config.builtins[cmd]) {
      await config.builtins[cmd](args)
      return
    }
  }

  let prev = null

  for (const node of ast) {
    let cmd = node.cmd
    let args = node.args

    if (config.aliases && config.aliases[cmd]) {
      const parts = config.aliases[cmd].split(/\s+/)
      cmd = parts[0]
      args = parts.slice(1).concat(args)
    }

    const proc = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'inherit'] })

    if (prev) prev.stdout.pipe(proc.stdin)
    prev = proc
  }

  if (prev) prev.stdout.pipe(process.stdout)
}
