import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    name: string,
    email: string,
  }
}
@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  authorize(@Req() request: AuthRequest) {
    const { name, email } = request.user
    return { name, email };
  }
}
