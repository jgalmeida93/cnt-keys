import mongoose from 'mongoose'

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

export default connectMongoDB;
