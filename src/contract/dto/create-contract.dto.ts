import { Company } from "src/company/entities/company.entity";

export class CreateContractDto {
    public id: number;
    public option1: boolean;
    public option2: boolean;
    public option3: boolean;
    public companyId: Company;


}
