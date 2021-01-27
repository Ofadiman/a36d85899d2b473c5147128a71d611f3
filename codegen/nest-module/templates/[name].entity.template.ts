import { nestModuleConst } from '../nest-module.const'

export const template = `import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: '${nestModuleConst.plop.name.snakeCase}' })
export class ${nestModuleConst.plop.name.singularPascalCase} {
  @PrimaryGeneratedColumn()
  public id: number
}
`
