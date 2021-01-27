import { composeValidators, PlopGeneratorConfig } from '@ofadiman/plop'

import { readDirs } from '../read-dirs'
import { enumActions } from './enum.actions'
import { enumConst } from './enum.const'

export const enumConfig: PlopGeneratorConfig = {
  actions: enumActions,
  description: 'Generate an enum.',
  prompts: [
    {
      message: 'Enum name:',
      name: enumConst.variables.name,
      type: 'input',
      validate: composeValidators()
    },
    {
      choices: readDirs('src'),
      message: 'Enum directory:',
      name: enumConst.variables.moduleName,
      type: 'list'
    }
  ]
}
