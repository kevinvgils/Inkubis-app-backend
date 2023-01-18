import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Put, UseGuards } from '@nestjs/common/decorators';
import { AddCompanyUserDto } from './dto/add-company-user.dto';
import { RolesGuard } from 'src/user-auth/role.guard';
import { Roles } from 'src/user-auth/role.decorator';
import { InjectToken } from 'src/user-auth/token.decorator';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put('self')
  updateSelf(@InjectToken() token, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateSelf(token.id, updateUserDto);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Put('companies')
  addCompanyToUser(@Body() companiesToAdd: AddCompanyUserDto) {
    return this.userService.addCompanyToUser(
      companiesToAdd.userId,
      companiesToAdd.companyIds,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
