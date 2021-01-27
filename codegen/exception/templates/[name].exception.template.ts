import { exceptionConst } from '../exception.const'

export const template = `import { HttpException } from '@nestjs/common'

export class ${exceptionConst.plop.name.pascalCase}Exception extends HttpException {
  public constructor() {
    super('${exceptionConst.plop.message.unmodified}', ${exceptionConst.plop.statusCode.unmodified})
  }
}
`
