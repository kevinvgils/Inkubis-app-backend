import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { UserAuth } from './entities/user-auth.entity';
import { compare, hash } from 'bcrypt';
import { JwtPayload, verify, sign, Secret } from 'jsonwebtoken';
import { User, UserRole } from 'src/user/entities/user.entity';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuth, 'authConnection')
    private authRepository: Repository<UserAuth>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserAuthDto: CreateUserAuthDto, token: string) {
    await this.checkIsAdmin(token['role'])

    if (
      !createUserAuthDto.emailAddress ||
      !createUserAuthDto.password ||
      !createUserAuthDto.role
    ) {
      return 'No emailaddress, password or role';
    }

    if (createUserAuthDto.role !== UserRole.ADMIN) {
      if (createUserAuthDto.role !== UserRole.SALES) {
        return 'Role must be admin or sales';
      }
    }

    const hashedPw = await hash(createUserAuthDto.password, 10);
    await this.authRepository.insert({
      emailAddress: createUserAuthDto.emailAddress,
      password: hashedPw,
    });
    await this.userRepository.insert({
      emailAddress: createUserAuthDto.emailAddress,
      firstName: createUserAuthDto.firstName,
      lastName: createUserAuthDto.lastName,
      role: createUserAuthDto.role,
    });
    return 'New user added';
  }

  async generateToken(email: string, password: string): Promise<string> {
    console.log(process.env.JWT_SECRET);
    const identity = await this.authRepository.findOne({
      where: {
        emailAddress: email,
      },
    });

    if (!identity || !(await compare(password, identity.password)))
      throw new Error('user not authorized');

    const user = await this.userRepository.findOne({
      where: {
        emailAddress: email,
      },
    });

    return new Promise((resolve, reject) => {
      try {
        const token = sign({ email, id: user?.id, role: user?.role }, 'secretstring');
        resolve(token);
      } catch (e) {
        reject(e);
      }
    });
  }

  async verifyToken(token: string): Promise<string | JwtPayload> {
    token = token.replace('Bearer ', '');
    return new Promise((resolve, reject) => {
      verify(token, 'secretstring', (err, payload) => {
        if (err) reject(err);
        else resolve(payload!);
      });
    });
  }

  async checkIsAdmin(userRole: string): Promise<boolean> {
    if(userRole !== 'admin') {
      throw new HttpException(`You must have the role 'admin' to perform this action`, HttpStatus.UNAUTHORIZED)
    } else {
      return true;
    }
  }
}
