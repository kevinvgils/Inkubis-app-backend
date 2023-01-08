import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { Company } from './company/entities/company.entity';
import { ContractController } from './contract/contract.controller';
import { ContractService } from './contract/contract.service';
import { companyExecutingDataProcessing, companyResponsibleForDataProcessing, Contract, contractsignees, thirdparty } from './contract/entities/contract.entity';
import { User } from './user/entities/user.entity';
import { UserController } from './user/user.controller';

import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Contract, companyResponsibleForDataProcessing, companyExecutingDataProcessing, contractsignees, thirdparty])],
  controllers: [UserController, ContractController, CompanyController],
  providers: [UserService, CompanyService, ContractService],
})
export class DataModule {}
