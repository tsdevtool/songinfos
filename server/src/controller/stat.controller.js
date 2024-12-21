import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";
export const getStats = async (req, res, next) => {
  try {
    //O day se co 2 cach lam va cach 2 cach toi uu hon
    // const totalSongs = await Song.countDocuments();
    // const totalAlbums =await Album.countDocuments();
    // const totalUsers = await User.countDocuments();

    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        //Su dung Promise de thuc hien song song nhieu tac vu bat dong bo nham tang hieu suat, Promise.all nhan vao cac Promise va cho tat chung hoan thanh ket qua se tra ve thu tu mang theo dung thu tu duoc liet ke
        Song.countDocuments(), //Dem tong so bai hat
        User.countDocuments(), //Dem tong so user
        Album.countDocuments(), //Dem tong so album
        Song.aggregate([
          //Dem so nghe si doc nhat
          {
            $unionWith: {
              //Hop nhat collection song
              coll: "albums", //va hop nhat voi du lieu tu collection albums
              pipeline: [], //Khong thay doi du lieu tu albums
            },
          },
          {
            $group: {
              //Gom cac tai lieu truong artist
              _id: "$artist",
            },
          },
          {
            $count: "count", //Dem so luong nhom duoc tao ra
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtist: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
