import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register-user')
  @HttpCode(HttpStatus.CREATED)
  public async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.authService.registerUser(registerUserDto)
  }
}
