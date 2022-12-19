import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Company } from 'src/company/entities/company.entity';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto): Promise<any> {

    return this.contractService.create(createContractDto.option1, createContractDto.option2, createContractDto.option3, createContractDto.companyId);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
