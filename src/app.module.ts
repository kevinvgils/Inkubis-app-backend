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
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserAuth } from './user-auth/entities/user-auth.entity';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'inkubis-auth',
      entities: [UserAuth],
      name: 'authConnection',
      synchronize: true,
    }),
    UserModule,
    CompanyModule,
    ContractModule,
    UserAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
