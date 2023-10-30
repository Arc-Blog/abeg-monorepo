import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CredentialsSchema = z.object({
  email: z.string().email().min(1),
  subject: z.string().email().optional(), // .min(1)最小长度为1，意思位不为空
  sign: z.string().optional(),
});

export class CreateEmailDto extends createZodDto(CredentialsSchema) {
  @ApiProperty({ description: '邮箱' })
  // @IsNotEmpty()
  // @IsEmail()
  email: string; // 发送的邮箱

  @ApiProperty({ description: '邮箱' })
  // @IsNotEmpty()
  // @IsEmail()
  subject: string; // 邮箱主体

  @ApiProperty({ description: '邮件签名' })
  // @IsOptional()
  sign: string;
}
