import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from './attempt.entity';
import { AttemptService } from './attempt.service';
import { AttemptController } from './attempt.controller';
import { User } from '../users/user.entity';
import { Quiz } from '../quiz/quiz.entity';
import { Question } from '../question/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt, User, Quiz, Question])],
  providers: [AttemptService],
  controllers: [AttemptController],
})
export class AttemptModule {}
