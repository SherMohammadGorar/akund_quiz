export class CreateAttemptDto {
  quizId: number;

  answers: {
    questionId: number;
    answer: string;
  }[];
}