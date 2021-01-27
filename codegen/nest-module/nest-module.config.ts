import { composeValidators, PlopGeneratorConfig } from '@ofadiman/plop'

import { nestModuleActions } from './nest-module.actions'
import { nestModuleConst } from './nest-module.const'

export const nestModuleConfig: PlopGeneratorConfig = {
  actions: nestModuleActions,
  description: 'Generate a nest module.',
  prompts: [
    {
      message: 'Nest module name:',
      name: nestModuleConst.variables.name,
      type: 'input',
      validate: composeValidators()
    }
  ]
}
