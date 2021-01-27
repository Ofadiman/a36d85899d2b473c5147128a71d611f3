import { setupPlop } from '@ofadiman/plop'
import { NodePlopAPI } from 'plop'

import { dtoConfig } from './codegen/dto/dto.config'
import { dtoConst } from './codegen/dto/dto.const'
import { enumConfig } from './codegen/enum/enum.config'
import { enumConst } from './codegen/enum/enum.const'
import { exceptionConfig } from './codegen/exception/exception.config'
import { exceptionConst } from './codegen/exception/exception.const'
import { guardConfig } from './codegen/guard/guard.config'
import { guardConst } from './codegen/guard/guard.const'
import { nestModuleConfig } from './codegen/nest-module/nest-module.config'
import { nestModuleConst } from './codegen/nest-module/nest-module.const'
import { typeConfig } from './codegen/type/type.config'
import { typeConst } from './codegen/type/type.const'

export default function plopGenerator(plop: NodePlopAPI): void {
  plop.setGenerator(nestModuleConst.generatorName, nestModuleConfig)
  plop.setGenerator(enumConst.generatorName, enumConfig)
  plop.setGenerator(guardConst.generatorName, guardConfig)
  plop.setGenerator(exceptionConst.generatorName, exceptionConfig)
  plop.setGenerator(dtoConst.generatorName, dtoConfig)
  plop.setGenerator(typeConst.generatorName, typeConfig)

  setupPlop(plop)
}
