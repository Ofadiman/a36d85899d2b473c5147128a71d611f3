import { ActionType } from 'plop'

import { enumConst } from './enum.const'

export const enumActions: ActionType[] = [
  {
    path: `src/${enumConst.plop.moduleName.kebabCase}/enums/${enumConst.plop.name.kebabCase}.enum.ts`,
    template: require('./templates/[name].template').template,
    type: 'add'
  }
]
