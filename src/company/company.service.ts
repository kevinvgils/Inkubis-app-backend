import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/contract/entities/contract.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) { }

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
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
        contracts: true
      },
    });
  
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
