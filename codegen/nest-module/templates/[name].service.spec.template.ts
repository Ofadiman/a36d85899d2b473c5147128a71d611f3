import { nestModuleConst } from '../nest-module.const'

export const template = `import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { ${nestModuleConst.plop.name.singularPascalCase} } from './${nestModuleConst.plop.name.singularKebabCase}.entity'
import { ${nestModuleConst.plop.name.pascalCase}Service } from './${nestModuleConst.plop.name.kebabCase}.service'

describe('${nestModuleConst.plop.name.pascalCase}Service', () => {
  let ${nestModuleConst.plop.name.camelCase}Service: ${nestModuleConst.plop.name.pascalCase}Service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ${nestModuleConst.plop.name.pascalCase}Service,
        {
          provide: getRepositoryToken(${nestModuleConst.plop.name.singularPascalCase}),
          useValue: {}
        }
      ]
    }).compile()

    ${nestModuleConst.plop.name.camelCase}Service = module.get<${nestModuleConst.plop.name.pascalCase}Service>(${nestModuleConst.plop.name.pascalCase}Service)
  })

  test('should be defined', () => {
    expect(${nestModuleConst.plop.name.camelCase}Service).toBeDefined()
  })
})
`
