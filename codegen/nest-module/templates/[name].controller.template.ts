import { nestModuleConst } from '../nest-module.const'

export const template = `import { Controller } from '@nestjs/common'

import { ${nestModuleConst.plop.name.pascalCase}Service } from './${nestModuleConst.plop.name.kebabCase}.service'

@Controller('${nestModuleConst.plop.name.kebabCase}')
export class ${nestModuleConst.plop.name.pascalCase}Controller {
  public constructor(private readonly ${nestModuleConst.plop.name.camelCase}Service: ${nestModuleConst.plop.name.pascalCase}Service) {}
}
`
