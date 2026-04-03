/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from '../users/user.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(dto: any, teacherId: number) {
    const teacher = await this.userRepo.findOne({
      where: { id: teacherId },
    });

    if (!teacher) throw new NotFoundException('Teacher not found');

    const quiz = this.quizRepo.create({
      title: dto.title,
      teacher,
    });

    return this.quizRepo.save(quiz);
  }

  findAll() {
    return this.quizRepo.find({ relations: ['questions'] });
  }

  findOne(id: number) {
    return this.quizRepo.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async update(id: number, dto: any) {
    await this.quizRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const quiz = await this.findOne(id);
    if (!quiz) throw new NotFoundException('Quiz not found');
    return this.quizRepo.remove(quiz);
  }

  async findByTeacher(teacherId: number) {
    return this.quizRepo.find({
      where: { teacher: { id: teacherId } },
      relations: ['questions'],
    });
  }
}
