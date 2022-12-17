import { Injectable } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { UserAuth } from './entities/user-auth.entity';
import { compare, hash } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserAuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @InjectRepository(UserAuth, 'authConnection')
    private authRepository: Repository<UserAuth>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserAuthDto: CreateUserAuthDto) {
    if (!createUserAuthDto.emailAddress || !createUserAuthDto.password) {
      return 'No emailaddress or password';
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
    });
    return 'This action adds a new userAuth';
  }

  findAll() {
    return `This action returns all userAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAuth`;
  }

  update(id: number, updateUserAuthDto: UpdateUserAuthDto) {
    return `This action updates a #${id} userAuth`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAuth`;
  }
}
