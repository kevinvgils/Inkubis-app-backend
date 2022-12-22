import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { UserAuth } from './entities/user-auth.entity';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post()
  create(@Body() createUserAuthDto: CreateUserAuthDto) {
    return this.userAuthService.register(createUserAuthDto);
  }

  @Post('login')
  async login(@Body() credentials: UserAuth): Promise<any> {
    try {
      const tokenToVerify = await this.userAuthService.generateToken(
        credentials.emailAddress,
        credentials.password,
      );
      const user = await this.userAuthService.verifyToken(tokenToVerify);
      return {
        id: user.id,
        emailAddress: user.email,
        token: tokenToVerify,
      };
    } catch (e) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
