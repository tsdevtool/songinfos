import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    //Kiem tra xem nguoi dung da co chua
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      //Tao moi user
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    //Tao moi thanh cong tra ve thong bao thanh cong
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    res.status(500).json({ message: "Interval server error", error });
  }
};
