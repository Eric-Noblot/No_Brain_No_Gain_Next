import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String },
  password: { type: String }
});

// Pour éviter "OverwriteModelError" pendant le hot-reload en dev
export const User = models.User || mongoose.model<IUser>('User', userSchema);