import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  emailAddress: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
