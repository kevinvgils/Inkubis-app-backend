import { UserRole } from 'src/user/entities/user.entity';

export class CreateUserAuthDto {
  firstName = '';
  lastName = '';
  emailAddress = '';
  password = '';
  role: UserRole;
  companies: number[] = [];
}
