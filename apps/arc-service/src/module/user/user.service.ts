import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { arc_user as UserModel } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  /**
   * 账号密码注册
   * @param createUser - 前端传入数据
   */
  async register(createUser: CreateUserDto): Promise<UserModel> {
    console.log(createUser);
    const data = {
      username: createUser.username,
      nickname: createUser.nickname,
      password: createUser.password,
      email: createUser.email,
      phone: createUser.phone,
      role: createUser.role,
    };

    return await this.prismaService.arc_user.create({ data });
  }
}
