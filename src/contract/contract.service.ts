import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { In, Repository } from 'typeorm';
import { Categories, Certification, CompanyExecutingDataProcessing, CompanyResponsibleForDataProcessing, Contract, Contractsignees, DataCategory, DataSubjectCategory, SpecialDataCategory, Spoc, Thirdparty, TpDataTransfer, TpProcessing, TpSupplier } from './entities/contract.entity';
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
      ...createContractDto.contractSignees.companyExecutingDataProcessing.member1,
      ...createContractDto.contractSignees.companyExecutingDataProcessing.member2,
      ...createContractDto.contractSignees.companyResponsibleForDataProcessing.member1,
      ...createContractDto.contractSignees.companyResponsibleForDataProcessing.member2
    }

    let thirdParty = new Thirdparty();
    thirdParty.TpDataTransfer = new TpDataTransfer();
    thirdParty.TpProcessing = new TpProcessing();
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

    let spoc = new Spoc();
    spoc = {
      id: spoc.id,
      ...createContractDto.spoc.CompanyExecutingDataProcessing,
      ...createContractDto.spoc.CompanyResponsibleForDataProcessing
    }

    let certifications = new Certification();
    certifications = {
      id: certifications.id,
      ...createContractDto.certification
    }

    let categories = new Categories();
    categories.dataCategory = new DataCategory();
    categories.dataSubjectCategory = new DataSubjectCategory();
    categories.specialDataCategory = new SpecialDataCategory();
    categories.dataCategory = {
      id: categories.dataCategory.id,
      ...createContractDto.category.dataCategory
    }
    categories.dataSubjectCategory = {
      id: categories.dataSubjectCategory.id,
      ...createContractDto.category.dataSubjectCategory
    }
    categories.specialDataCategory = {
      id: categories.specialDataCategory.id,
      ...createContractDto.category.specialDataCategory
    }

    // console.log(createContractDto)

    //GET COMPANY
    const company = await this.companyService.findOne(createContractDto.company)
    const newContract = new Contract();
    newContract.companyExecutingDP = companyExecutingDP;
    newContract.companyResponsibleForDP = companyResponsibleForDP;
    newContract.contractSignees = contractsignees;
    newContract.thirdParty = thirdParty;
    newContract.certifications = certifications;
    newContract.spoc = spoc;
    newContract.company = company;
    newContract.citySigned = createContractDto.contractinfo.citySigned;
    newContract.dateSigned = createContractDto.contractinfo.dateSigned;
    newContract.processingPurposes = createContractDto.contractinfo.processingPurposes;
    newContract.categories = categories;

    return await this.contractRepository.save(newContract);
  }

  async findAll() {
    return await this.contractRepository.find({
      relations: {
        companyExecutingDP: true,
        companyResponsibleForDP: true,
        contractSignees: true,
        thirdParty: true,
        certifications: true,
        spoc: true,
        company: true,
        categories: true
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
        companyExecutingDP: true,
        companyResponsibleForDP: true,
        contractSignees: true,
        thirdParty: true,
        certifications: true,
        spoc: true,
        company: true,
        categories: true
      },
    });
  }

  async findOne(id: number) {
    return await this.contractRepository.findOne({
      where: { id: id },
      relations: [
        'companyExecutingDP',
        'companyResponsibleForDP',
        'contractSignees',
        'thirdParty',
        'thirdParty.TpProcessing',
        'thirdParty.TpSupplier',
        'thirdParty.TpDataTransfer',
        'certifications',
        'spoc',
        'company',
        'categories',
        'categories.dataSubjectCategory',
        'categories.dataCategory',
        'categories.specialDataCategory',
      ],
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
