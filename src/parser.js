export function parse(input) {
  input = input.trim()
  if (!input) return null

  const parts = input.split('|').map(p => p.trim())
  return parts.map(cmd => {
    const tokens = cmd.split(/\s+/)
    return {
      cmd: tokens[0],
      args: tokens.slice(1)
    }
  })
}
