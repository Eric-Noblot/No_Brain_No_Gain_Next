import mongoose from 'mongoose';

const KEY_MONGOOSE = process.env.KEY_MONGOOSE;
const PSEUDO_MONGOOSE = process.env.PSEUDO_MONGOOSE;
const DB_NAME = process.env.DB_NAME

const connexionString = `mongodb+srv://${PSEUDO_MONGOOSE}:${KEY_MONGOOSE}@cluster0.e4l2f8n.mongodb.net/${DB_NAME}`;

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Already connected to Database');
    return;
  }

  try {
    await mongoose.connect(connexionString, { connectTimeoutMS: 2000 });
    isConnected = true;
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Impossible de connecter la base de données');
  }
}