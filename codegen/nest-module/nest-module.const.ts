import { createPlopVariable, createPlopVariables } from '@ofadiman/plop'

const variables = {
  name: 'name'
} as const

const plop = createPlopVariables(variables, {
  name: {
    singularCamelCase: createPlopVariable(variables.name, 'singular', 'camelCase'),
    singularKebabCase: createPlopVariable(variables.name, 'singular', 'kebabCase'),
    singularPascalCase: createPlopVariable(variables.name, 'singular', 'pascalCase'),
    singularSnakeCase: createPlopVariable(variables.name, 'singular', 'snakeCase')
  }
})

export const nestModuleConst = {
  generatorName: 'nest-module',
  plop,
  variables
}
