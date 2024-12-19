import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
//De co duoc env thi can goi no va su dung lop dotenv
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
