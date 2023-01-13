import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Company } from 'src/company/entities/company.entity';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(UserAuth, 'authConnection')
    private authRepository: Repository<UserAuth>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        companies: true,
      },
    });
  }

  async findOne(id: number) {
    console.log(id);
    return await this.userRepository.findOne({
      relations: {
        companies: true,
      },
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!id || !UpdateUserDto) {
      throw new HttpException(
        'Check if the request body is correct',
        HttpStatus.BAD_REQUEST,
      );
    }

    const companiesToAdd = await this.companyRepository.find({
      where: {
        id: In(updateUserDto.companies),
      },
    });

    const user = await this.userRepository.findOne({ where: { id: id } });
    const authUser = await this.authRepository.findOne({
      where: { emailAddress: user.emailAddress },
    });
    authUser.emailAddress = updateUserDto.emailAddress;
    await this.authRepository.save(authUser);

    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.emailAddress = updateUserDto.emailAddress;
    user.role = updateUserDto.role;
    user.companies = companiesToAdd;
    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addCompanyToUser(userId: number, companies: number[]) {
    if (!userId || !companies) {
      throw new HttpException(
        'Specify the userId or the companyIds',
        HttpStatus.BAD_REQUEST,
      );
    }

    const companiesToAdd = await this.companyRepository.find({
      where: {
        id: In(companies),
      },
    });

    const user = await this.userRepository.findOne({ where: { id: userId } });

    user.companies = companiesToAdd;
    return await this.userRepository.save(user);
  }
}
