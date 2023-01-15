import { Company } from "src/company/entities/company.entity";

export class CreateContractDto {
    public id: number;
 

    
       public contractinfo: {
          companyResponsibleForDataProcessing: {
            name: string;
            companyNumber: number;
            legalCountry: boolean;
            address: string;
            zipcode: string;
            city: string;
            countryOfResidence: string;
          };
          companyExecutingDataProcessing: {
            name: string;
            companyNumber: number;
            legalCountry: boolean;
            address: string;
            zipcode: string;
            city: string;
            countryOfResidence: string;
          };
          dateSigned: string;
          citySigned: string;
          processingPurposes: string;
        };
        public contractSignees: {
          companyResponsibleForDataProcessing: { 
            member1: {
              nameEmployee1ResponsibleForDP: string,
              jobEmployee1ResponsibleForDP: string,
            }; 
            member2: {
              nameEmployee2ResponsibleForDP: string,
              jobEmployee2ResponsibleForDP: string,
            }; 
          };
          companyExecutingDataProcessing: { 
            member1: {
              nameEmployee1ExecutingDP: string,
              jobEmployee1ExecutingDP: string,
            }; 
            member2: {
              nameEmployee2ExecutingDP: string,
              jobEmployee2ExecutingDP: string,
            }; 
           };
        };
        public certifications: {
          certifications:string;
          achievedCertifications: string;
          overhauls: string;
        };
        public thirdparty: {
          externalSubEmployeeExecutingDataProcessing: {
            name: string;
            formalCity: string;
            address: string;
            typeProcessingPersonalData: string;
            jobDescription: string;
          };
          externalSubEmployeeExecutingDatathirdPartySuppliersProcessing: {
            name: string;
            formalCity: string;
            address: string;
            descriptionOfSupply: string;
            linkToLegalTerms: string;
          };
          dataTransfer: {
            legalCountry: string;
            nameOfExternalSubEmployee: string;
            reasonForDataTransfer: string;
          }
        };
        public category: {
          dataSubjectCategory: {
            potentialOrFormerCustomers: false,
            applicantsAndFormerEmployeesInterns: false,
            potentialIndependentAdvisors: false,
            potentialFormerSuppliers: false,
            potentialBusinessPartners: false,
            minors: false,
            otherCategory: false
          },
          dataCategory: {
            identificationData: false,
            nationalRegistryNumber: false,
            communicationsData: false,
            relationalData: false,
            professionalData: false,
            locationData: false,
            financialData: false,
            financialAndInsuranceProducts: false,
            stigmatizationOrIsolationData: false,
            lifestyleAndHabits: false,
            loginData: false,
            identityFraudData: false,
            specialLegalDutyOfConfidentialityAndProfessionalSecrecyData: false,
            contractualData: false,
            imageOrSoundRecording: false,
            otherCategory: false
          },
          specialDataCategory: {
            racialOrEthnicData: false,
            geneticData: false,
            trafficRecordsAndPersonalData: false
          }
        };
        public spoc: {
          CompanyResponsibleForDataProcessing: {
            nameR: string;
            jobDescR: string;
            emailR: string;
            phoneR: string;
            mobileR: string;
          },
          CompanyExecutingDataProcessing:
          { nameE: string;
            jobDescE: string;
            emailE: string;
            phoneE: string;
            mobileE: string;
          }
        };
        company: number;

      }


