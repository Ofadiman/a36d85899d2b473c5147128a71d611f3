import { ActionType } from 'plop'

import { guardConst } from './guard.const'

export const guardActions: ActionType[] = [
  {
    path: `src/${guardConst.plop.moduleName.kebabCase}/guards/${guardConst.plop.name.kebabCase}.guard.ts`,
    template: require('./templates/[name].template').template,
    type: 'add'
  }
]
