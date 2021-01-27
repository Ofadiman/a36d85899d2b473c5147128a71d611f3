import { createPlopVariables } from '@ofadiman/plop'

const variables = {
  moduleName: 'moduleName',
  name: 'name'
} as const

const plop = createPlopVariables(variables)

export const guardConst = {
  generatorName: 'guard',
  plop,
  variables
}
