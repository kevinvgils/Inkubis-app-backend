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
export class CompanyResponsibleForDataProcessing {
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
export class CompanyExecutingDataProcessing {
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
export class Contractsignees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameEmployee1ResponsibleForDP: string;
  @Column()
  jobEmployee1ResponsibleForDP: string;
  @Column()
  nameEmployee2ResponsibleForDP: string;
  @Column()
  jobEmployee2ResponsibleForDP: string;
  @Column()
  nameEmployee1ExecutingDP: string;
  @Column()
  jobEmployee1ExecutingDP: string;
  @Column()
  nameEmployee2ExecutingDP: string;
  @Column()
  jobEmployee2ExecutingDP: string;
}

@Entity()
export class TpProcessing {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  formalCity: string;
  @Column()
  address: string;
  @Column()
  typeProcessingPersonalData: string;
  @Column()
  jobDescription: string;
}

@Entity()
export class TpSupplier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  formalCity: string;
  @Column()
  address: string;
  @Column()
  descriptionOfSupply: string;
  @Column()
  linkToLegalTerms: string;
}

@Entity()
export class TpDataTransfer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  legalCountry: string;
  @Column()
  nameOfExternalSubEmployee: string;
  @Column()
  reasonForDataTransfer: string;
}

@Entity()
export class Thirdparty {

  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => TpProcessing, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  TpProcessing: TpProcessing;

  @OneToOne(() => TpSupplier, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  TpSupplier: TpSupplier;

  @OneToOne(() => TpDataTransfer, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  TpDataTransfer: TpDataTransfer;

}

@Entity()
export class Certification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  certifications: string;
  @Column()
  achievedCertifications: string;
  @Column()
  overhauls: string;
}

@Entity()
export class Spoc {
  @PrimaryGeneratedColumn()
  id: number;
  //E = ExecutingDataProcessing
  @Column()
  nameE: string;
  @Column()
  jobDescE: string;
  @Column()
  emailE: string;
  @Column()
  phoneE: string;
  @Column()
  mobileE: string;

  //R = ResponsibleDataProcessing
  @Column()
  nameR: string;
  @Column()
  jobDescR: string;
  @Column()
  emailR: string;
  @Column()
  phoneR: string;
  @Column()
  mobileR: string;
}

@Entity()
export class DataSubjectCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  potentialOrFormerCustomers: boolean;
  @Column()
  applicantsAndFormerEmployeesInterns: boolean;
  @Column()
  potentialIndependentAdvisors: boolean;
  @Column()
  potentialFormerSuppliers: boolean;
  @Column()
  potentialBusinessPartners: boolean;
  @Column()
  minors: boolean;
  @Column()
  otherCategory: boolean;
}

@Entity()
export class DataCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  identificationData: boolean;
  @Column()
  nationalRegistryNumber: boolean;
  @Column()
  communicationsData: boolean;
  @Column()
  relationalData: boolean;
  @Column()
  professionalData: boolean;
  @Column()
  locationData: boolean;
  @Column()
  financialData: boolean;
  @Column()
  financialAndInsuranceProducts: boolean;
  @Column()
  stigmatizationOrIsolationData: boolean;
  @Column()
  lifestyleAndHabits: boolean;
  @Column()
  loginData: boolean;
  @Column()
  identityFraudData: boolean;
  @Column()
  specialLegalDutyOfConfidentialityAndProfessionalSecrecyData: boolean;
  @Column()
  contractualData: boolean;
  @Column()
  imageOrSoundRecording: boolean;
  @Column()
  otherCategory: boolean;
}

@Entity()
export class SpecialDataCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  racialOrEthnicData: boolean;
  @Column()
  geneticData: boolean;
  @Column()
  trafficRecordsAndPersonalData: boolean;
}

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => DataSubjectCategory, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  dataSubjectCategory: DataSubjectCategory;
  
  @OneToOne(() => DataCategory, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  dataCategory: DataCategory;

  @OneToOne(() => SpecialDataCategory, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  specialDataCategory: SpecialDataCategory;
}

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CompanyResponsibleForDataProcessing, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  companyResponsibleForDP: CompanyResponsibleForDataProcessing;

  @OneToOne(() => CompanyExecutingDataProcessing, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  companyExecutingDP: CompanyExecutingDataProcessing;

  @OneToOne(() => Contractsignees, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  contractSignees: Contractsignees;

  @OneToOne(() => Thirdparty, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  thirdParty: Thirdparty;

  @OneToOne(() => Certification, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  certifications: Certification;

  
  @OneToOne(() => Spoc, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  spoc: Spoc;

  @OneToOne(() => Categories, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  categories: Categories;

  @Column()
  dateSigned: string;

  @Column()
  citySigned: string;

  @Column()
  processingPurposes: string;

  @ManyToOne(() => Company, (company) => company.contracts)
  company: Company;
}
