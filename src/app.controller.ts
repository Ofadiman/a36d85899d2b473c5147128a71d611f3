import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('/health-check')
  public healthCheck(): string {
    return 'The app is running!'
  }
}
