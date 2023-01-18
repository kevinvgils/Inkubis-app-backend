import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
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
    return await this.companyRepository.find({
      where: { id: userId },
    })
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });

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
