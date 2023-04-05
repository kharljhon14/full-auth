import mongoose from 'mongoose';

if (!process.env.MONGO_URI) throw new Error('Please add the database URl in .env file');

const DATABASE_URL: string = process.env.MONGO_URI;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) cached = globalWithMongoose.mongoose = { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(DATABASE_URL, options)
      .then((mongoose) => {
        console.log('connected to DB');
        return mongoose;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
