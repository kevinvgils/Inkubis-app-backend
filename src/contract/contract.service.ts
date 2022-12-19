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


  async create(createCompanyDto: CreateContractDto) {
    //return 'This action adds a new contract';
    return await this.contractRepository.insert(createCompanyDto);
  }

  
  

  async findAll() {
    return await this.contractRepository.find();
  }

  async findOne(id: number) {
    return await this.contractRepository.findOne({
      where: { id: id },
      relations: {
        company: true
      },
    });
  
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    //const updateContractDto = new UpdateContractDto
    return await this.contractRepository.update(
      id,
      updateContractDto
      );
  }

  async remove(id: number) {
    return await this.contractRepository.delete(id);
  }
}
