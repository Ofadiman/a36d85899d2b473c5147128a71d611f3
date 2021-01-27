import { composeValidators, PlopGeneratorConfig, requireInput } from '@ofadiman/plop'

import { readDirs } from '../read-dirs'
import { exceptionActions } from './exception.actions'
import { exceptionConst } from './exception.const'

export const exceptionConfig: PlopGeneratorConfig = {
  actions: exceptionActions,
  description: 'Generate an exception.',
  prompts: [
    {
      message: 'Exception name:',
      name: exceptionConst.variables.name,
      type: 'input',
      validate: composeValidators()
    },
    {
      message: 'Message:',
      name: exceptionConst.variables.message,
      type: 'input',
      validate: composeValidators(requireInput('Message is required!'))
    },
    {
      message: 'Status code:',
      name: exceptionConst.variables.statusCode,
      type: 'input',
      validate: composeValidators(requireInput('Status code is required!'))
    },
    {
      choices: readDirs('src'),
      message: 'Exception directory:',
      name: exceptionConst.variables.moduleName,
      type: 'list'
    }
  ]
}
