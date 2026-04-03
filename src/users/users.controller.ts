import {
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) { }

  // Only teacher can view all users
  @Get()
  @Roles('teacher')
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('teachers')
  @Roles('teacher')
  getTeachers() {
    return this.usersService.findTeachers();
  }

  @Get('students')
  @Roles('teacher')
  getStudents() {
    return this.usersService.findStudents();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @Roles('teacher')
  deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
