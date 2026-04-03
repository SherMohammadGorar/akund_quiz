import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { AttemptModule } from './attempt/attempt.module';

@Module({
  imports: [AuthModule, UsersModule, QuizModule, QuestionModule, AttemptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
