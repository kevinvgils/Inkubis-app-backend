/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res, HttpStatus, Get, Param, Put, Delete } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";


@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto, @Res() response) {
    try {
      const newCompany = await this.companyService.create(createCompanyDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Company has been ceeated successfully',
        newCompany,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Company not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const companies = await this.companyService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All companies have been found successfully!',
        companies,
      });
    } catch (err) {
      return response.status(err.response).json(err.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() response) {
    try {
      const company = await this.companyService.findOne(id);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Company found successfully!', company });
    } catch (err) {
      return response.status(err.response).json(err.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Res() response,
  ) {
    try {
      const company = await this.companyService.update(id, updateCompanyDto);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Updated company successfully!' });
    } catch (err) {
      console.log(err)
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Company not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() response) {
    try {
      const company = await this.companyService.remove(id);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Deleted company successfully!' });
    } catch (err) {
      return response.status(err.response).json(err.message);
    }
  }
}
