import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose is connected");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

export default connectDB;
