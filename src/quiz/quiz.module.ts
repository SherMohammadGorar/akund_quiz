import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { User } from '../users/user.entity';
import { Question } from '../question/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, User, Question])],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule { }
