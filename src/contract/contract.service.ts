import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { In, Repository } from 'typeorm';
import { CompanyExecutingDataProcessing, CompanyResponsibleForDataProcessing, Contract, Contractsignees, Thirdparty, TpDataTransfer, TpProcessing, TpSupplier } from './entities/contract.entity';
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
    let companyExecutingDP = new CompanyExecutingDataProcessing();
    companyExecutingDP = {
      id: companyExecutingDP.id,
      ...createContractDto.contractinfo.companyExecutingDataProcessing
    }

    let companyResponsibleForDP = new CompanyResponsibleForDataProcessing();
    companyResponsibleForDP = {
      id: companyResponsibleForDP.id,
      ...createContractDto.contractinfo.companyResponsibleForDataProcessing
    }

    let contractsignees = new Contractsignees()
    contractsignees = {
      id: companyResponsibleForDP.id,
      ...createContractDto.contractsignees.companyExecutingDataProcessing.member1,
      ...createContractDto.contractsignees.companyExecutingDataProcessing.member2,
      ...createContractDto.contractsignees.companyResponsibleForDataProcessing.member1,
      ...createContractDto.contractsignees.companyResponsibleForDataProcessing.member2
    }

    let thirdParty = new Thirdparty();
    thirdParty.TpDataTransfer = new TpDataTransfer();
    thirdParty.TpProcessing = new TpProcessing;
    thirdParty.TpSupplier = new TpSupplier();

    thirdParty.TpDataTransfer = {
      id: thirdParty.TpDataTransfer.id,
      ...createContractDto.thirdparty.dataTransfer
    }

    thirdParty.TpProcessing = {
      id: thirdParty.TpProcessing.id,
      ...createContractDto.thirdparty.externalSubEmployeeExecutingDataProcessing
    }

    thirdParty.TpSupplier = {
      id: thirdParty.TpSupplier.id,
      ...createContractDto.thirdparty.externalSubEmployeeExecutingDatathirdPartySuppliersProcessing
    }

    // console.log(createContractDto)

    //GET COMPANY
    const company = await this.companyService.findOne(createContractDto.company)
    const newContract = new Contract();
    newContract.companyExecutingDP = companyExecutingDP;
    newContract.companyResponsibleForDP = companyResponsibleForDP;
    newContract.contractSignees = contractsignees;
    newContract.thirdParty = thirdParty;
    newContract.company = company;

    console.log(newContract)
    
    return 'Test'
    // return await this.contractRepository.save(newContract);
  }

  async findAll() {
    return await this.contractRepository.find();
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
