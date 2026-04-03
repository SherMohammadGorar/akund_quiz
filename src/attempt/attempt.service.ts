/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attempt } from './attempt.entity';
import { User } from '../users/user.entity';
import { Quiz } from '../quiz/quiz.entity';
import { Question } from '../question/question.entity';

@Injectable()
export class AttemptService {
  constructor(
    @InjectRepository(Attempt)
    private attemptRepo: Repository<Attempt>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,

    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  async submitAttempt(dto: any, studentId: number) {
    const student = await this.userRepo.findOne({
      where: { id: studentId },
    });

    if (!student) throw new NotFoundException('Student not found');

    const quiz = await this.quizRepo.findOne({
      where: { id: dto.quizId },
      relations: ['questions'],
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    let score = 0;

    // answers format:
    // [{ questionId: 1, answer: "A" }]
    for (const ans of dto.answers) {
      const question = quiz.questions.find((q) => q.id === ans.questionId);

      if (question && question.correctAnswer === ans.answer) {
        score++;
      }
    }

    const attempt = this.attemptRepo.create({
      student,
      quiz,
      score,
    });

    return this.attemptRepo.save(attempt);
  }

  findAll() {
    return this.attemptRepo.find();
  }

  findMyAttempts(studentId: number) {
    return this.attemptRepo.find({
      where: { student: { id: studentId } },
    });
  }
}
