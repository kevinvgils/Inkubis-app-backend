import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private userService: UserService
  ) {}

  async create(company: any): Promise<any> {
    return await this.companyRepository.save(
      this.companyRepository.create(company),
    );
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.companyRepository.find();
    if (!companies || companies.length == 0) {
      throw new NotFoundException(`Companies Data Not Found`);
    }
    return companies;
  }

  async findAllForUser(userId: number) {
    let user = await this.userService.findOne(userId);
    console.log(user)
    let companyIds = [];
    user.companies.forEach(company => {
      companyIds.push(company.id)
    });
    return await this.companyRepository.find({
      where: { id: In(companyIds) },
    })
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: {id: id} });

    if (!company) {
      throw new NotFoundException(`Company #${id} not found`);
    }

    return company;
  }

  async update(id: string, data: any): Promise<any> {
    return await this.companyRepository.update(+id, data);
  }

  async remove(id: number): Promise<any> {
    return await this.companyRepository
      .createQueryBuilder()
      .delete()
      .from(Company)
      .where('id = :id', { id })
      .execute();
  }
}
