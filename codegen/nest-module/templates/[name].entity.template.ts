import { nestModuleConst } from '../nest-module.const'

export const template = `import { Entity } from 'typeorm'

import { Base } from '../database/utils/base.entity'

@Entity({ name: '${nestModuleConst.plop.name.snakeCase}' })
export class ${nestModuleConst.plop.name.singularPascalCase} extends Base {}
`
