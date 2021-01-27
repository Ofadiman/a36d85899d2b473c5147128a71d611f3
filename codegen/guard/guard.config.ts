import { composeValidators, PlopGeneratorConfig } from '@ofadiman/plop'

import { readDirs } from '../read-dirs'
import { guardActions } from './guard.actions'
import { guardConst } from './guard.const'

export const guardConfig: PlopGeneratorConfig = {
  actions: guardActions,
  description: 'Generate a guard.',
  prompts: [
    {
      message: 'Guard name:',
      name: guardConst.variables.name,
      type: 'input',
      validate: composeValidators()
    },
    {
      choices: readDirs('src'),
      message: 'Guard directory:',
      name: guardConst.variables.moduleName,
      type: 'list'
    }
  ]
}
