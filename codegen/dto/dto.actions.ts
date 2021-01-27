import { ActionType } from 'plop'

import { dtoConst } from './dto.const'

export const dtoActions: ActionType[] = [
  {
    path: `src/${dtoConst.plop.moduleName.kebabCase}/dto/${dtoConst.plop.name.kebabCase}.dto.ts`,
    template: require('./templates/[name].dto.template').template,
    type: 'add'
  }
]
