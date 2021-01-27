import { readdirSync } from 'fs'

type Options = {
  additionalDirs?: string[]
  excludedDirs?: string[]
}

const readDirsAtPath = (path: string): string[] => {
  const cwd = process.cwd()

  return readdirSync(`${cwd}/${path}`, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

const filterExcludedDirs = (dirs: string[], excludedDirs: string[]): string[] => {
  return dirs.filter((dir) => !excludedDirs.includes(dir))
}

export const readDirs = (path: string, options?: Options): string[] => {
  const opts = options ? { additionalDirs: [], excludedDirs: [], ...options } : { additionalDirs: [], excludedDirs: [] }
  const baseDirs = readDirsAtPath(path)
  const extendedDirs = baseDirs.concat(opts.additionalDirs)

  return filterExcludedDirs(extendedDirs, opts.excludedDirs)
}
