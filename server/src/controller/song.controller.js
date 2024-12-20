import { Song } from "../models/song.model.js";
export const getAllSong = async (req, res, next) => {
  try {
    //Lay cac thong tin cac bai hat theo mo hinh tu nhung bai hat moi nhat den bai hat duoc tao ra cu hon
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    console.log("Error getAllSong", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    //Dung ham lay 6 bai hat ngau nhien - aggreagate
    const songs = await Song.aggregate({
      $sample: {
        size: 6,
      },
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        imageUrl: 1,
        audioUrl: 1,
      },
    });

    res.json(songs);
  } catch (error) {
    console.log("Error getFeaturedSongs");
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate({
      $sample: {
        size: 4,
      },
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        imageUrl: 1,
        audioUrl: 1,
      },
    });

    res.json(songs);
  } catch (error) {
    console.log("Error getMadeForYouSongs");
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate({
      $sample: {
        size: 4,
      },
      $project: {
        _id: 1,
        title: 1,
        artist: 1,
        imageUrl: 1,
        audioUrl: 1,
      },
    });

    res.json(songs);
  } catch (error) {
    console.log("Error getTrendingSongs");
    next(error);
  }
};
