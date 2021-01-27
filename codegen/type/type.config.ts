import { composeValidators, PlopGeneratorConfig } from '@ofadiman/plop'

import { readDirs } from '../read-dirs'
import { typeActions } from './type.actions'
import { typeConst } from './type.const'

export const typeConfig: PlopGeneratorConfig = {
  actions: typeActions,
  description: 'Generate a/an type.',
  prompts: [
    {
      message: 'Type name:',
      name: typeConst.variables.name,
      type: 'input',
      validate: composeValidators()
    },
    {
      choices: readDirs('src'),
      message: 'Type directory:',
      name: typeConst.variables.moduleName,
      type: 'list'
    }
  ]
}
