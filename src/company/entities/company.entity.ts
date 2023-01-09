import { Contract } from 'src/contract/entities/contract.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  zipcode: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  kvkNumber: string;

  @Column()
  imageURL: string;

  @OneToMany(() => Contract, (contract) => contract.company)
  contracts: Contract[];
}
