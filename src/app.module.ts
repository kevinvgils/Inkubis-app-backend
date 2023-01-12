import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { Categories, Certification, CompanyExecutingDataProcessing, CompanyResponsibleForDataProcessing, Contract, Contractsignees, DataCategory, DataSubjectCategory, SpecialDataCategory, Spoc, Thirdparty, TpDataTransfer, TpProcessing, TpSupplier } from './contract/entities/contract.entity';
import { Company } from './company/entities/company.entity';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UserAuth } from './user-auth/entities/user-auth.entity';
import { TokenMiddleware } from './user-auth/token.middleware';
import { DataModule } from './data.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'inkubis',
      entities: [User, Contract, CompanyResponsibleForDataProcessing, CompanyExecutingDataProcessing, Contractsignees, Thirdparty, Company, TpDataTransfer, TpProcessing, TpSupplier, Certification, Spoc, Categories, SpecialDataCategory, DataSubjectCategory, DataCategory],
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
    DataModule,
    UserAuthModule,
    RouterModule.register([
      {
        path: 'auth-api',
        module: UserAuthModule,
      },
      {
        path: 'data-api',
        module: DataModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude({ path: 'auth-api/user-auth/login', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
