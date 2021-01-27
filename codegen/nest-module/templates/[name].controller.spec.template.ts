import { nestModuleConst } from '../nest-module.const'

export const template = `import { Test, TestingModule } from '@nestjs/testing'

import { ${nestModuleConst.plop.name.pascalCase}Controller } from './${nestModuleConst.plop.name.kebabCase}.controller'

describe('${nestModuleConst.plop.name.pascalCase}Controller', () => {
  let ${nestModuleConst.plop.name.camelCase}Controller: ${nestModuleConst.plop.name.pascalCase}Controller

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [${nestModuleConst.plop.name.pascalCase}Controller]
    }).compile()

    ${nestModuleConst.plop.name.camelCase}Controller = module.get<${nestModuleConst.plop.name.pascalCase}Controller>(${nestModuleConst.plop.name.pascalCase}Controller)
  })

  it('should be defined', () => {
    expect(${nestModuleConst.plop.name.camelCase}Controller).toBeDefined()
  })
})
`
