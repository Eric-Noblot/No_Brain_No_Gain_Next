import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  salt : string;
  marvel: number;
  animaux: number;
  book: number;
  cartoon : number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required : true },
  email: { type: String, required : true },
  password: { type: String, required : true },
  salt: { type: String, required: true }, 
  marvel: { type: Number, required: false  },
  animaux: { type: Number, required: false  },
  book: { type: Number, required: false  },
  cartoon: { type: Number, required: false  }, 
});

// Pour éviter "OverwriteModelError" pendant le hot-reload en dev
export const User = models.User || mongoose.model<IUser>('User', userSchema);