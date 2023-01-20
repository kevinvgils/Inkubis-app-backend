import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    firstName: string = '';
    lastName: string = '';
    emailAddress: string = '';
    role: UserRole;
    companies: number[] = [];
}
