import mongoose, { Schema, Document, models } from 'mongoose';

export interface IQuiz extends Document {
  marvel: number;
  animaux: number;
  book: number;
  cartoon : number;
}

const quizSchema = new Schema<IQuiz>({
  marvel: { type: Number },
  animaux: { type: Number },
  book: { type: Number },
  cartoon: { type: Number }, 
});

// Pour éviter "OverwriteModelError" pendant le hot-reload en dev
export const Quiz = models.Quiz || mongoose.model<IQuiz>('Quiz', quizSchema);