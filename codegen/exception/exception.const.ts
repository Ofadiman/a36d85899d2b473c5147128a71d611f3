import { createPlopVariables } from '@ofadiman/plop'

const variables = {
  message: 'message',
  moduleName: 'moduleName',
  name: 'name',
  statusCode: 'statusCode'
} as const

const plop = createPlopVariables(variables)

export const exceptionConst = {
  generatorName: 'exception',
  plop,
  variables
}
