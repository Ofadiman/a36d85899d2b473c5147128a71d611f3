import { guardConst } from '../guard.const'

export const template = `export const ${guardConst.plop.name.camelCase} = (value: unknown): value is unknown => {
  return true
}
`
