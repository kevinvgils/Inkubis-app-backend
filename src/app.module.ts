import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ContractModule } from './contract/contract.module';
import { Contract } from './contract/entities/contract.entity';
import { Company } from './company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'inkubis',
      entities: [User, Contract, Company],
      synchronize: true,
    }),
    UserModule,
    CompanyModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
