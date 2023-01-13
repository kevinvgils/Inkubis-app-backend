import { MinLength, MaxLength, Matches } from 'class-validator';
import { Contract } from 'src/contract/entities/contract.entity';
import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Company {
  @Index(['name', 'kvkNumber'], { unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(4, { message: 'Company name is too short' })
  @MaxLength(20, { message: 'Company name is too long' })
  @Column(require)
  name: string;

  @MinLength(3, { message: 'Country is too short' })
  @MaxLength(40, { message: 'Country is too long' })
  @Column(require)
  country: string;

  @MinLength(5, { message: 'Zipcode is too short' })
  @MaxLength(7, { message: 'Zipcode is too long' })
  @Matches(new RegExp(/^\d{4} ?[a-z]{2}$/i))
  @Column(require)
  zipcode: string;

  @MinLength(3, { message: 'Address is too short' })
  @MaxLength(50, { message: 'Address is too long' })
  @Column(require)
  address: string;

  @MaxLength(25, { message: 'City is too long' })
  @MinLength(3, { message: 'City is too short' })
  @Column(require)
  city: string;

  @Matches(new RegExp(/[0-9]{3} [0-9 ]{3} [0-9]{3}/g), {
    message: 'Kvknumber should contain the following pattern: (123 456 789)',
  })
  @Column(require)
  kvkNumber: string;

  @Column()
  imageURL: string;

  @OneToMany(() => Contract, (contract) => contract.company)
  contracts: Contract[];
}
