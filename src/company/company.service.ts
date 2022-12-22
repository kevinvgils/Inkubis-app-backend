import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/contract/entities/contract.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async create(companyName: string) {
    return await this.companyRepository.insert({
      name: companyName,
    });
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  /*async getAllData(data: customer_data): Promise<customer_data[]> {
    return await this.pdfRepository.find();
}*/

  async findOne(id: number) {
    return await this.companyRepository.findOne({
      where: { id: id },
      relations: {
        contracts: true,
      },
    });
  }

  async update(companyId: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyRepository.update(companyId, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companyRepository.delete(id);
  }
}
