import { ActionType } from 'plop'

import { exceptionConst } from './exception.const'

export const exceptionActions: ActionType[] = [
  {
    path: `src/${exceptionConst.plop.moduleName.kebabCase}/exceptions/${exceptionConst.plop.name.kebabCase}.exception.ts`,
    template: require('./templates/[name].exception.template').template,
    type: 'add'
  }
]
