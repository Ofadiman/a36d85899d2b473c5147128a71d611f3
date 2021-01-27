import { nestModuleConst } from '../nest-module.const'

export const template = `import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ${nestModuleConst.plop.name.singularPascalCase} } from './${nestModuleConst.plop.name.singularKebabCase}.entity'

@Injectable()
export class ${nestModuleConst.plop.name.pascalCase}Service {
  public constructor(@InjectRepository(${nestModuleConst.plop.name.singularPascalCase}) private readonly ${nestModuleConst.plop.name.camelCase}Repository: Repository<${nestModuleConst.plop.name.singularPascalCase}>) {}
}
`
