import { SrvRecord } from 'dns';
import { Company } from 'src/company/entities/company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class companyResponsibleForDataProcessing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  companyNumber: number;
  @Column()
  legalCountry: boolean;
  @Column()
  address: string;
  @Column()
  zipcode: string;
  @Column()
  city: string;
  @Column()
  countryOfResidence: string;

}

@Entity()
export class companyExecutingDataProcessing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  companyNumber: number;
  @Column()
  legalCountry: boolean;
  @Column()
  address: string;
  @Column()
  zipcode: string;
  @Column()
  city: string;
  @Column()
  countryOfResidence: string;
}

@Entity()
export class contractsignees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameEmployee1CompanyResponsibleForDataProcessing: string;
  @Column()
  jobEmployee1CompanyResponsibleForDataProcessing: string;
  @Column()
  nameEmployee2CompanyResponsibleForDataProcessing: string;
  @Column()
  jobEmployee2CompanyResponsibleForDataProcessing: string;

  nameEmployee1CompanyExecutingDataProcessing: string;
  @Column()
  jobEmployee1CompanyExecutingDataProcessing: string;
  @Column()
  nameEmployee2CompanyExecutingDataProcessing: string;
  @Column()
  jobEmployee2CompanyExecutingDataProcessing: string;
}

@Entity()
export class thirdparty {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameOfExternalSubEmployeeExecutingDataProcessing: string;
  @Column()
  formalCityOfExternalSubEmployeeExecutingDataProcessing: string;
  @Column()
  addressOfExternalSubEmployeeExecutingDataProcessing: string;
  @Column()
  typeOfPersonalDataOfExternalSubEmployeeExecutingDataProcessing: string;
  @Column()
  jobDescriptionOfExternalSubEmployeeExecutingDataProcessing: string;

  @Column()
  nameOfExternalSubEmployeeExecutingData: string;
  @Column()
  formalCityOfExternalSubEmployeeExecutingData: string;
  @Column()
  addressOfExternalSubEmployeeExecutingData: string;
  @Column()
  subscriptionOfSupplyOfExternalSubEmployeeExecutingData: string;
  @Column()
  linkToLegalTermsOfExternalSubEmployeeExecutingData: string;

  @Column()
  legelCountryOfDataTransfer: string;
  @Column()
  nameOfExternalSubEmployeeOfDataTransfer: string;
  @Column()
  reasonForDataTransferOfDataTransfer: string

}

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => companyResponsibleForDataProcessing, {
    cascade: true
  })
  @JoinColumn()
  companyResponsibleForDP: companyResponsibleForDataProcessing;

  @OneToOne(() => companyExecutingDataProcessing, {
    cascade: true
  })
  @JoinColumn()
  companyExecutingDP: companyExecutingDataProcessing;

  @ManyToOne(() => Company, (company) => company.contracts)
  company: Company;
}
