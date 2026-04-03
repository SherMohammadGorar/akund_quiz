export class CreateQuestionDto {
  question: string;
  options: string[];
  correctAnswer: string;
  quizId: number;
}