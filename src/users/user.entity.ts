import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role!: Role;
}
