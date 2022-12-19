import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SALES = 'sales',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  emailAddress: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SALES,
  })
  role: UserRole;
}
