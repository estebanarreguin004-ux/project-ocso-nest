import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { TOKEN_NAME } from './Constants/jwt.constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/manager')

  @Post('register/employee/[id]')
  signUp(@Body() createUserDto: CreateUserDto, @Param("id") id: string) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, token, { 
      httpOnly: true,   
      secure: false,     
      sameSite: 'lax',     
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return;
  }
  @Patch('/:email')
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: CreateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
