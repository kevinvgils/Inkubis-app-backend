import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      ...createContractDto.certifications
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

    console.log(newContract);

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
    if (!id || !UpdateContractDto) {
      throw new HttpException(
        'Check if the request body is correct',
        HttpStatus.BAD_REQUEST,
      );
    }

    const contract = await this.findOne(id);

    // ContractInfo
    contract.companyResponsibleForDP.name = updateContractDto.contractinfo.companyResponsibleForDataProcessing.name;
    contract.companyResponsibleForDP.companyNumber = updateContractDto.contractinfo.companyResponsibleForDataProcessing.companyNumber;
    contract.companyResponsibleForDP.legalCountry = updateContractDto.contractinfo.companyResponsibleForDataProcessing.legalCountry;
    contract.companyResponsibleForDP.address = updateContractDto.contractinfo.companyResponsibleForDataProcessing.address;
    contract.companyResponsibleForDP.zipcode = updateContractDto.contractinfo.companyResponsibleForDataProcessing.zipcode;
    contract.companyResponsibleForDP.city = updateContractDto.contractinfo.companyResponsibleForDataProcessing.city;
    contract.companyResponsibleForDP.countryOfResidence = updateContractDto.contractinfo.companyResponsibleForDataProcessing.countryOfResidence;

    contract.companyExecutingDP.name = updateContractDto.contractinfo.companyExecutingDataProcessing.name;
    contract.companyExecutingDP.companyNumber = updateContractDto.contractinfo.companyExecutingDataProcessing.companyNumber;
    contract.companyExecutingDP.legalCountry = updateContractDto.contractinfo.companyExecutingDataProcessing.legalCountry;
    contract.companyExecutingDP.address = updateContractDto.contractinfo.companyExecutingDataProcessing.address;
    contract.companyExecutingDP.zipcode = updateContractDto.contractinfo.companyExecutingDataProcessing.zipcode;
    contract.companyExecutingDP.city = updateContractDto.contractinfo.companyExecutingDataProcessing.city;
    contract.companyExecutingDP.countryOfResidence = updateContractDto.contractinfo.companyExecutingDataProcessing.countryOfResidence;

    contract.dateSigned = updateContractDto.contractinfo.dateSigned;
    contract.citySigned = updateContractDto.contractinfo.citySigned;
    contract.processingPurposes = updateContractDto.contractinfo.processingPurposes;

    // ContractSignees
    contract.contractSignees.nameEmployee1ResponsibleForDP = updateContractDto.contractSignees.companyResponsibleForDataProcessing.member1.nameEmployee1ResponsibleForDP;
    contract.contractSignees.jobEmployee1ResponsibleForDP = updateContractDto.contractSignees.companyResponsibleForDataProcessing.member1.jobEmployee1ResponsibleForDP;
    contract.contractSignees.nameEmployee2ResponsibleForDP = updateContractDto.contractSignees.companyResponsibleForDataProcessing.member2.nameEmployee2ResponsibleForDP;
    contract.contractSignees.jobEmployee2ResponsibleForDP = updateContractDto.contractSignees.companyResponsibleForDataProcessing.member2.jobEmployee2ResponsibleForDP;

    contract.contractSignees.nameEmployee1ExecutingDP = updateContractDto.contractSignees.companyExecutingDataProcessing.member1.nameEmployee1ExecutingDP;
    contract.contractSignees.jobEmployee1ExecutingDP = updateContractDto.contractSignees.companyExecutingDataProcessing.member1.jobEmployee1ExecutingDP;
    contract.contractSignees.nameEmployee2ExecutingDP = updateContractDto.contractSignees.companyExecutingDataProcessing.member2.nameEmployee2ExecutingDP;
    contract.contractSignees.jobEmployee2ExecutingDP = updateContractDto.contractSignees.companyExecutingDataProcessing.member2.jobEmployee2ExecutingDP;

    // Certification
    contract.certifications.certifications = updateContractDto.certifications.certifications;
    contract.certifications.achievedCertifications = updateContractDto.certifications.achievedCertifications;
    contract.certifications.overhauls = updateContractDto.certifications.overhauls;

    // ThirdParty
    contract.thirdParty.TpProcessing.name = updateContractDto.thirdparty.externalSubEmployeeExecutingDataProcessing.name;
    contract.thirdParty.TpProcessing.formalCity = updateContractDto.thirdparty.externalSubEmployeeExecutingDataProcessing.formalCity;
    contract.thirdParty.TpProcessing.address = updateContractDto.thirdparty.externalSubEmployeeExecutingDataProcessing.address;
    contract.thirdParty.TpProcessing.typeProcessingPersonalData = updateContractDto.thirdparty.externalSubEmployeeExecutingDataProcessing.typeProcessingPersonalData;
    contract.thirdParty.TpProcessing.jobDescription = updateContractDto.thirdparty.externalSubEmployeeExecutingDataProcessing.jobDescription;

    contract.thirdParty.TpSupplier.name = updateContractDto.thirdparty.externalSubEmployeeExecutingDatathirdPartySuppliersProcessing.name;
    contract.thirdParty.TpSupplier.formalCity = updateContractDto.thirdparty.externalSubEmployeeExecutingDatathirdPartySuppliersProcessing.formalCity;
    contract.thirdParty.TpSupplier.address = updateContractDto.thirdparty.externalSubEmployeeExecutingDatathirdPartySuppliersProcessing.address;
    contract.thirdParty.TpSupplier.descriptionOfSupply = updateContractDto.thirdparty.externalSubEmployeeExecutingDatathirdPartySuppliersProcessing.descriptionOfSupply;
    contract.thirdParty.TpSupplier.linkToLegalTerms = updateContractDto.thirdparty.externalSubEmployeeExecutingDatathirdPartySuppliersProcessing.linkToLegalTerms;

    // Category
    contract.categories.dataSubjectCategory.potentialOrFormerCustomers = updateContractDto.category.dataSubjectCategory.potentialOrFormerCustomers;
    contract.categories.dataSubjectCategory.applicantsAndFormerEmployeesInterns = updateContractDto.category.dataSubjectCategory.applicantsAndFormerEmployeesInterns;
    contract.categories.dataSubjectCategory.potentialIndependentAdvisors = updateContractDto.category.dataSubjectCategory.potentialIndependentAdvisors;
    contract.categories.dataSubjectCategory.potentialFormerSuppliers = updateContractDto.category.dataSubjectCategory.potentialFormerSuppliers;
    contract.categories.dataSubjectCategory.potentialBusinessPartners = updateContractDto.category.dataSubjectCategory.potentialBusinessPartners;
    contract.categories.dataSubjectCategory.minors = updateContractDto.category.dataSubjectCategory.minors;
    contract.categories.dataSubjectCategory.otherCategory = updateContractDto.category.dataSubjectCategory.otherCategory;

    contract.categories.dataCategory.identificationData = updateContractDto.category.dataCategory.identificationData;
    contract.categories.dataCategory.nationalRegistryNumber = updateContractDto.category.dataCategory.nationalRegistryNumber;
    contract.categories.dataCategory.communicationsData = updateContractDto.category.dataCategory.communicationsData;
    contract.categories.dataCategory.relationalData = updateContractDto.category.dataCategory.relationalData;
    contract.categories.dataCategory.professionalData = updateContractDto.category.dataCategory.professionalData;
    contract.categories.dataCategory.locationData = updateContractDto.category.dataCategory.locationData;
    contract.categories.dataCategory.financialData = updateContractDto.category.dataCategory.financialData;
    contract.categories.dataCategory.financialAndInsuranceProducts = updateContractDto.category.dataCategory.financialAndInsuranceProducts;
    contract.categories.dataCategory.stigmatizationOrIsolationData = updateContractDto.category.dataCategory.stigmatizationOrIsolationData;
    contract.categories.dataCategory.lifestyleAndHabits = updateContractDto.category.dataCategory.lifestyleAndHabits;
    contract.categories.dataCategory.loginData = updateContractDto.category.dataCategory.loginData;
    contract.categories.dataCategory.identityFraudData = updateContractDto.category.dataCategory.identityFraudData;
    contract.categories.dataCategory.specialLegalDutyOfConfidentialityAndProfessionalSecrecyData = updateContractDto.category.dataCategory.specialLegalDutyOfConfidentialityAndProfessionalSecrecyData;
    contract.categories.dataCategory.contractualData = updateContractDto.category.dataCategory.contractualData;
    contract.categories.dataCategory.imageOrSoundRecording = updateContractDto.category.dataCategory.imageOrSoundRecording;
    contract.categories.dataCategory.otherCategory = updateContractDto.category.dataCategory.otherCategory;

    contract.categories.specialDataCategory.racialOrEthnicData = updateContractDto.category.specialDataCategory.racialOrEthnicData;
    contract.categories.specialDataCategory.geneticData = updateContractDto.category.specialDataCategory.geneticData;
    contract.categories.specialDataCategory.trafficRecordsAndPersonalData = updateContractDto.category.specialDataCategory.trafficRecordsAndPersonalData;

    // Spoc
    contract.spoc.nameR = updateContractDto.spoc.CompanyResponsibleForDataProcessing.nameR;
    contract.spoc.jobDescR = updateContractDto.spoc.CompanyResponsibleForDataProcessing.jobDescR;
    contract.spoc.emailR = updateContractDto.spoc.CompanyResponsibleForDataProcessing.emailR;
    contract.spoc.phoneR = updateContractDto.spoc.CompanyResponsibleForDataProcessing.phoneR;
    contract.spoc.mobileR = updateContractDto.spoc.CompanyResponsibleForDataProcessing.mobileR;

    contract.spoc.nameE = updateContractDto.spoc.CompanyExecutingDataProcessing.nameE;
    contract.spoc.jobDescE = updateContractDto.spoc.CompanyExecutingDataProcessing.jobDescE;
    contract.spoc.emailE = updateContractDto.spoc.CompanyExecutingDataProcessing.emailE;
    contract.spoc.phoneE = updateContractDto.spoc.CompanyExecutingDataProcessing.phoneE;
    contract.spoc.mobileE = updateContractDto.spoc.CompanyExecutingDataProcessing.mobileE;

    return await this.contractRepository.save(contract);
  }

  async remove(id: number) {
    return await this.contractRepository.delete(id);
  }
}
