import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Quiz } from '../quiz/quiz.entity';

@Entity()
export class Attempt {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  student: User = new User();

  @ManyToOne(() => Quiz, { eager: true })
  quiz: Quiz = new Quiz();

  @Column()
  score!: number;
}
