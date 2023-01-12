import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { In, Repository } from 'typeorm';
import { companyExecutingDataProcessing, companyResponsibleForDataProcessing, Contract, contractsignees, thirdparty } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    private companyService: CompanyService,
    private userService: UserService
  ) {}

  async create(createContractDto: CreateContractDto) {
    let companyExecutingDP = new companyExecutingDataProcessing();
    companyExecutingDP.address = createContractDto.contractinfo.companyExecutingDataProcessing.address
    companyExecutingDP.city = createContractDto.contractinfo.companyExecutingDataProcessing.city
    companyExecutingDP.companyNumber = createContractDto.contractinfo.companyExecutingDataProcessing.companyNumber
    companyExecutingDP.countryOfResidence = createContractDto.contractinfo.companyExecutingDataProcessing.countryOfResidence
    companyExecutingDP.legalCountry = createContractDto.contractinfo.companyExecutingDataProcessing.legalCountry
    companyExecutingDP.name = createContractDto.contractinfo.companyExecutingDataProcessing.name
    companyExecutingDP.zipcode = createContractDto.contractinfo.companyExecutingDataProcessing.zipcode

    let companyResponsibleForDP = new companyResponsibleForDataProcessing();
    companyResponsibleForDP.address = createContractDto.contractinfo.companyResponsibleForDataProcessing.address
    companyResponsibleForDP.city = createContractDto.contractinfo.companyResponsibleForDataProcessing.city
    companyResponsibleForDP.companyNumber = createContractDto.contractinfo.companyResponsibleForDataProcessing.companyNumber
    companyResponsibleForDP.countryOfResidence = createContractDto.contractinfo.companyResponsibleForDataProcessing.countryOfResidence
    companyResponsibleForDP.legalCountry = createContractDto.contractinfo.companyResponsibleForDataProcessing.legalCountry
    companyResponsibleForDP.name = createContractDto.contractinfo.companyResponsibleForDataProcessing.name
    companyResponsibleForDP.zipcode = createContractDto.contractinfo.companyResponsibleForDataProcessing.zipcode

    //GET COMPANY
    const company = await this.companyService.findOne(createContractDto.company)
    const newContract = new Contract();
    newContract.companyExecutingDP = companyExecutingDP;
    newContract.companyResponsibleForDP = companyResponsibleForDP;
    newContract.company = company
    
    return await this.contractRepository.save(newContract);
  }

  async findAll() {
    return await this.contractRepository.find({
      relations: {
        company: true,
        companyExecutingDP: true,
        companyResponsibleForDP: true
      },
    });
  }

  async findAllForUser(userId: number) {
    const user = await this.userService.findOne(userId);
    let usersCompanies = []
    user.companies.forEach(c => {
      usersCompanies.push(c.id)
    });
    return await this.contractRepository.find({
      where: { company: In(usersCompanies)},
      relations: {
        company: true,
        companyExecutingDP: true,
        companyResponsibleForDP: true
      }
    });
  }

  async findOne(id: number) {
    return await this.contractRepository.findOne({
      where: { id: id },
      relations: {
        company: true,
        companyExecutingDP: true,
        companyResponsibleForDP: true
      },
    });
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    //const updateContractDto = new UpdateContractDto
    // return await this.contractRepository.update(id, updateContractDto);
    return 'Deletes contract'
  }

  async remove(id: number) {
    return await this.contractRepository.delete(id);
  }
}
