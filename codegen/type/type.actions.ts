import { ActionType } from 'plop'

import { typeConst } from './type.const'

export const typeActions: ActionType[] = [
  {
    path: `src/${typeConst.plop.moduleName.kebabCase}/types/${typeConst.plop.name.kebabCase}.type.ts`,
    template: require('./templates/[name].template').template,
    type: 'add'
  }
]
