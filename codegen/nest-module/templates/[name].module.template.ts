import { nestModuleConst } from '../nest-module.const'

export const template = `import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ${nestModuleConst.plop.name.singularPascalCase} } from './${nestModuleConst.plop.name.singularKebabCase}.entity'
import { ${nestModuleConst.plop.name.pascalCase}Controller } from './${nestModuleConst.plop.name.kebabCase}.controller'
import { ${nestModuleConst.plop.name.pascalCase}Service } from './${nestModuleConst.plop.name.kebabCase}.service'

@Module({
  controllers: [${nestModuleConst.plop.name.pascalCase}Controller],
  exports: [${nestModuleConst.plop.name.pascalCase}Service],
  imports: [TypeOrmModule.forFeature([${nestModuleConst.plop.name.singularPascalCase}])],
  providers: [${nestModuleConst.plop.name.pascalCase}Service]
})
export class ${nestModuleConst.plop.name.pascalCase}Module {}
`
