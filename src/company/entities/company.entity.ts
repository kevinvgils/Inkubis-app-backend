import { Contract } from 'src/contract/entities/contract.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Contract, (contract) => contract.company)
  contracts: Contract[];

  @ManyToMany(() => User, (users: User) => users.companies)
  users: User[];
}
