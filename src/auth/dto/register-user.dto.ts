import { IsEmail, IsString, Length } from 'class-validator'

export class RegisterUserDto {
  @IsEmail()
  public email: string

  @IsString()
  @Length(4, 20)
  public firstName: string

  @IsString()
  @Length(4, 20)
  public lastName: string

  @IsString()
  @Length(4, 20)
  public username: string

  @IsString()
  @Length(4, 20)
  public password: string
}
