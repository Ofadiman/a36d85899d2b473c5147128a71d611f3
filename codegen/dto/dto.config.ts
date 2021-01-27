import { composeValidators, PlopGeneratorConfig } from '@ofadiman/plop'

import { readDirs } from '../read-dirs'
import { dtoActions } from './dto.actions'
import { dtoConst } from './dto.const'

export const dtoConfig: PlopGeneratorConfig = {
  actions: dtoActions,
  description: 'Generate a dto.',
  prompts: [
    {
      message: 'Dto name:',
      name: dtoConst.variables.name,
      type: 'input',
      validate: composeValidators()
    },
    {
      choices: readDirs('src'),
      message: 'Dto directory:',
      name: dtoConst.variables.moduleName,
      type: 'list'
    }
  ]
}
