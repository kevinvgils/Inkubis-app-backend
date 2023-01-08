import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Repository } from 'typeorm';
import { companyExecutingDataProcessing, companyResponsibleForDataProcessing, Contract, contractsignees, thirdparty } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    @InjectRepository(companyResponsibleForDataProcessing)
    private companyResponsibleForDataProcessing: Repository<companyResponsibleForDataProcessing>,
    @InjectRepository(companyExecutingDataProcessing)
    private companyExecutingDataProcessing: Repository<companyExecutingDataProcessing>,
    @InjectRepository(contractsignees)
    private contractSignees: Repository<contractsignees>,
    @InjectRepository(thirdparty)
    private thirdParty: Repository<thirdparty>
  ) {}

  async create(createContractDto: CreateContractDto) {
    //return 'This action adds a new contract';
    
    await this.companyResponsibleForDataProcessing.insert(createContractDto.contractinfo.companyResponsibleForDataProcessing);
    
    //await this.contractSignees.insert(createContractDto.contractsignees);
    //await this.thirdParty.insert(createContractDto.thirdparty);
    return await this.companyExecutingDataProcessing.insert(createContractDto.contractinfo.companyExecutingDataProcessing);
  }

  async findAll() {
    return await this.contractRepository.find();
  }

  async findOne(id: number) {
    return await this.contractRepository.findOne({
      where: { id: id },
      relations: {
        company: true,
      },
    });
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    //const updateContractDto = new UpdateContractDto
    return await this.contractRepository.update(id, updateContractDto);
  }

  async remove(id: number) {
    return await this.contractRepository.delete(id);
  }
}
