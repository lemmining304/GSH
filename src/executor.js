import { spawn } from 'child_process'
import { builtins } from './builtins.js'

export async function execute(ast) {
  if (ast.length === 1) {
    const { cmd, args } = ast[0]
    if (builtins[cmd]) {
      await builtins[cmd](args)
      return
    }
  }

  let prev = null

  for (const node of ast) {
    const proc = spawn(node.cmd, node.args, { stdio: ['pipe', 'pipe', 'inherit'] })

    if (prev) prev.stdout.pipe(proc.stdin)
    prev = proc
  }

  if (prev) prev.stdout.pipe(process.stdout)
}
