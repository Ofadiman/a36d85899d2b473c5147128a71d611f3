import { paramCase, pascalCase } from 'change-case'
import { Answers } from 'inquirer'
import { ActionType } from 'plop'

import { nestModuleConst } from './nest-module.const'

export const nestModuleActions: ActionType[] = [
  {
    path: `src/${nestModuleConst.plop.name.kebabCase}/${nestModuleConst.plop.name.kebabCase}.module.ts`,
    template: require('./templates/[name].module.template').template,
    type: 'add'
  },
  {
    path: `src/${nestModuleConst.plop.name.kebabCase}/${nestModuleConst.plop.name.kebabCase}.controller.ts`,
    template: require('./templates/[name].controller.template').template,
    type: 'add'
  },
  {
    path: `src/${nestModuleConst.plop.name.kebabCase}/${nestModuleConst.plop.name.kebabCase}.controller.spec.ts`,
    template: require('./templates/[name].controller.spec.template').template,
    type: 'add'
  },
  {
    path: `src/${nestModuleConst.plop.name.kebabCase}/${nestModuleConst.plop.name.kebabCase}.service.ts`,
    template: require('./templates/[name].service.template').template,
    type: 'add'
  },
  {
    path: `src/${nestModuleConst.plop.name.kebabCase}/${nestModuleConst.plop.name.kebabCase}.service.spec.ts`,
    template: require('./templates/[name].service.spec.template').template,
    type: 'add'
  },
  {
    path: `src/${nestModuleConst.plop.name.kebabCase}/${nestModuleConst.plop.name.singularKebabCase}.entity.ts`,
    template: require('./templates/[name].entity.template').template,
    type: 'add'
  },
  {
    path: 'src/app.module.ts',
    transform: (fileContent: string, answers: Answers): string => {
      const appModuleImportArrayRegex = /imports: \[/u
      const name = answers[nestModuleConst.variables.name]
      const pascalCaseName = `${pascalCase(name)}Module`
      const kebabCaseName = paramCase(name)
      const importString = `import { ${pascalCaseName} } from './${kebabCaseName}/${kebabCaseName}.module'`

      const fileContentWithModifiedImportsArray = fileContent.replace(
        appModuleImportArrayRegex,
        (matchedValue: string): string => {
          return `${matchedValue}${pascalCaseName},`
        }
      )

      return `${importString}\n${fileContentWithModifiedImportsArray}`
    },
    type: 'modify'
  }
]
