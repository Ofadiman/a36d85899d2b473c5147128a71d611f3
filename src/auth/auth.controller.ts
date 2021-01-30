import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common'

import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { GetUser } from './decorators/get-user.decorator'
import { PublicRoute } from './decorators/public-route.decorator'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginResponseDto } from './dto/login-response.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { ExcludePasswordHashInterceptor } from './interceptors/exclude-password-hash.interceptor'

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register-user')
  @HttpCode(HttpStatus.CREATED)
  @PublicRoute()
  public async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.authService.registerUser(registerUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ExcludePasswordHashInterceptor)
  public async login(@GetUser() user: User): Promise<LoginResponseDto> {
    return this.authService.login(user)
  }
}
