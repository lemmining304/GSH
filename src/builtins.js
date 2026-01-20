export const builtins = {
  cd: async args => {
    try {
      process.chdir(args[0] || process.env.HOME)
    } catch {
      console.error('cd: diretório inválido')
    }
  },

  exit: async () => {
    process.exit(0)
  },

  help: async () => {
    console.log(`
GSH - Ghessé's Shell

Builtins:
  cd [dir]
  exit
  help
`)
  }
}
