/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Quiz } from '../quiz/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,

    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,
  ) { }

  async create(dto: any) {
    const quiz = await this.quizRepo.findOne({
      where: { id: dto.quizId },
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    const question = this.questionRepo.create({
      question: dto.question,
      options: dto.options,
      correctAnswer: dto.correctAnswer,
      quiz,
    });

    return this.questionRepo.save(question);
  }

  findAll() {
    return this.questionRepo.find({ relations: ['quiz'] });
  }

  findByQuiz(quizId: number) {
    return this.questionRepo.find({
      where: { quiz: { id: quizId } },
    });
  }

  async update(id: number, dto: any) {
    await this.questionRepo.update(id, dto);
    return this.questionRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const question = await this.questionRepo.findOne({
      where: { id },
    });
    if (!question) throw new NotFoundException('Question not found');
    return this.questionRepo.remove(question);
  }
}
