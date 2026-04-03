import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('question')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  // Teacher adds question
  @Post()
  @Roles('teacher')
  create(@Body() body: any) {
    return this.questionService.create(body);
  }

  // Get all questions
  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  // Get questions by quiz
  @Get('quiz/:quizId')
  findByQuiz(@Param('quizId') quizId: number) {
    return this.questionService.findByQuiz(quizId);
  }

  @Put(':id')
  @Roles('teacher')
  update(@Param('id') id: number, @Body() body: any) {
    return this.questionService.update(id, body);
  }

  @Delete(':id')
  @Roles('teacher')
  remove(@Param('id') id: number) {
    return this.questionService.remove(id);
  }
}
