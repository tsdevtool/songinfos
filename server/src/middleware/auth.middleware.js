import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  //Neu khong xac dinh duoc nguoi dung thi thong bao loi
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }

  //Neu xac thuc duoc nguoi dung thi co the bat dau buoc tiep theo
  next();
};

//Kiem tra nguoi dung co phai la quan tri vien hay khong
export const requireAdmin = async (req, res, next) => {
  try {
    //Lay thong tin nguoi dung hien tai
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden - you must be an admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Interval server error", error });
  }
};
