import { Company } from 'src/company/entities/company.entity';
// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option1: boolean;

  @Column()
  option2: boolean;

  @Column()
  option3: boolean;

  @ManyToOne(() => Company, (company) => company.contracts)
  company: Company;
}
