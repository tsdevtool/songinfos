import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true, //1 nguoi dung chi co 1 id duy nhat
    },
  },
  { timestamps: true } //Tu dong tao createdAt va updatedAt
);

/**
 * Vi mongodb va clerk la 2 dich vu khac nhau vi the nen khi ai do xac thuc voi clerk chung ta can lay thong tin nguoi dung do va luu thong tin vao co so du lieu cua chung ta va chung ta can biet id  tu do biet nguoi nao dang tuong tac
 *
 */

//Tao mo hinh cho User theo luoc do da duoc tao va xuat ra de su dung
export const User = mongoose.model("User", userSchema);
