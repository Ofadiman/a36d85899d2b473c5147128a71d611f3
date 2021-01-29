import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common'

import { AuthService } from './auth.service'
import { PublicRoute } from './decorators/public-route.decorator'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoginResponseDto } from './dto/login-response.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { ExcludePasswordHashInterceptor } from './interceptors/exclude-password-hash.interceptor'
import { UserRequest } from './types/user-request.type'

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
  public async login(@Req() request: UserRequest): Promise<LoginResponseDto> {
    return this.authService.login(request.user)
  }
}
