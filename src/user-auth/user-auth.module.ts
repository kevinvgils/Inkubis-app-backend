import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { User } from 'src/user/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuth], 'authConnection'),
    TypeOrmModule.forFeature([User, Company]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
