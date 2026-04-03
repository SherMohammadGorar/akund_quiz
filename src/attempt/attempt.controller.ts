import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AttemptService } from './attempt.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('attempt')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttemptController {
  constructor(private attemptService: AttemptService) {}

  // Student submits quiz
  @Post()
  @Roles('student')
  submit(@Body() body: any, @Req() req: any) {
    return this.attemptService.submitAttempt(body, req.user.userId);
  }

  // Teacher can see all attempts
  @Get()
  @Roles('teacher')
  getAll() {
    return this.attemptService.findAll();
  }

  // Student sees own attempts
  @Get('my')
  @Roles('student')
  getMy(@Req() req: any) {
    return this.attemptService.findMyAttempts(req.user.userId);
  }
}