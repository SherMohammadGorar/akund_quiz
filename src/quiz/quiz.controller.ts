import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('quiz')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizController {
  constructor(private quizService: QuizService) {}

  // Teacher creates quiz
  @Post()
  @Roles('teacher')
  create(@Body() body: any, @Req() req: any) {
    return this.quizService.create(body, req.user.userId);
  }

  // Student & Teacher can view all quizzes
  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get('my')
  @Roles('teacher')
  myQuizzes(@Req() req: any) {
    return this.quizService.findByTeacher(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quizService.findOne(id);
  }

  @Put(':id')
  @Roles('teacher')
  update(@Param('id') id: number, @Body() body: any) {
    return this.quizService.update(id, body);
  }

  @Delete(':id')
  @Roles('teacher')
  remove(@Param('id') id: number) {
    return this.quizService.remove(id);
  }
}