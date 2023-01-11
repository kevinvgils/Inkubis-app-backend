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
        };
        public contractsignees: {
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
        public processingpurposes: { processingPurposes: string; };
        public certification: { certifications: string; achievedCertifications: string; overhauls: string; };
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
        public spoc: {
          CompanyResponsibleForDataProcessing: { name: string; jobDescription: string; email: string; phone: string; mobile: string; },
          CompanyExecutingDataProcessing: { name: string; jobDescription: string; email: string; phone: string; mobile: string; }
        };
        company: number;

      }


