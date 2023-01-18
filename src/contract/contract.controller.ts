import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Company } from 'src/company/entities/company.entity';
import { Roles } from 'src/user-auth/role.decorator';
import { RolesGuard } from 'src/user-auth/role.guard';
import { InjectToken } from 'src/user-auth/token.decorator';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@UseGuards(RolesGuard)
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async create(@InjectToken() token, @Body() createContractDto: CreateContractDto): Promise<any> {
    return await this.contractService.create(createContractDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.contractService.findAll();
  }

  @Get("user")
  findAllForUser(@InjectToken() token: any) {
    return this.contractService.findAllForUser(token.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
