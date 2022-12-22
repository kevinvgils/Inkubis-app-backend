import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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
