import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Permission as PrismaPermission, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Permission } from './enums/permission.enum';
import * as bcrypt from 'bcrypt';

const permissionMapping = {
  [Permission.Admin]: PrismaPermission.admin,
  [Permission.Standard]: PrismaPermission.standard,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, permission, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const prismaPermission = permissionMapping[permission];

    const userRetorno = await this.prisma.user.create({
      data: { ...rest, password: hashedPassword, permission: prismaPermission },
    });

    return userRetorno;
  }

  async findAll({ page = 1, orderBy = 'name', orderDirection = 'asc' }): Promise<User[]> {
    const take = 10;
    const skip = (page - 1) * take;

    const users = await this.prisma.user.findMany({
      take,
      skip,
      orderBy: {
        [orderBy]: orderDirection === 'asc' ? 'asc' : 'desc',
      },
  });

  return users;
}

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, phone, permission } = updateUserDto;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: name || user.name,
        phone: phone || user.phone,
        permission: permissionMapping[permission] || user.permission,
      },
    });

    return updatedUser;
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
