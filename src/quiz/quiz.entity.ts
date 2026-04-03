/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../question/question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne(() => User, { eager: true })
  teacher!: User;

  @OneToMany(() => Question, (q) => q.quiz, {
    cascade: true,
  })
  questions!: Question[];
}
