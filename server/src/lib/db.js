import mongoose from "mongoose";

//Ket noi voi co so du lieu
export const connectDB = async () => {
  try {
    //Dung ham mongoose.connect() de connect toi db trong mongo
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    //In thong bao khi thanh cong
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    //Dung tien trinh khi ket noi that bai
    console.log("Failed to connect to MongoDB", error);
    process.exit(1); //1 is failure, 0 is success
  }
};
