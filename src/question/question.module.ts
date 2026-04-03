import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Quiz } from '../quiz/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Quiz])],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
