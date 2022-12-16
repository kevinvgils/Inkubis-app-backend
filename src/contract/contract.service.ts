import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class ContractService {
  constructor(@InjectRepository(Contract) private contractRepository: Repository<Contract>) { }


  async create(option1: boolean, option2: boolean, option3: boolean, companyId: Company) {
    //return 'This action adds a new contract';
    return await this.contractRepository.insert({
    option1: option1,
    option2: option2,
    option3: option3,
    company: companyId
    });
  }

  
  

  findAll() {
    return `This action returns all contract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
