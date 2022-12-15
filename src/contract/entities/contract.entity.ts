import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
