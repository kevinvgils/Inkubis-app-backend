import { Contract } from 'src/contract/entities/contract.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: boolean;

  @OneToMany(() => Contract, (contract) => contract.company)
  contracts: Contract[];
}
