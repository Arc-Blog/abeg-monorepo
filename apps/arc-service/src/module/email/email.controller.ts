import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('email')
export class EmailController {
  constructor(private readonly mailService: EmailService) {}

  @ApiOperation({ summary: '获取邮箱验证码' })
  @Post('/sendCode') // /mail/sendCode
  @UsePipes(ZodValidationPipe)
  async sendEmailCode(@Body() data: CreateEmailDto) {
    return this.mailService.sendEmailCode(data);
  }
}
