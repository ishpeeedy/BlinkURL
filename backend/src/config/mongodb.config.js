import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.bgGreen(chalk.bold('MongoDB connected')));
  } catch (error) {
    console.error(
      chalk.bgRed(chalk.hex('#b31c60ff').bold('MongoDB connection error:')),
      error
    );
  }
};

export default connectDB;
