import { Album } from "../models/album.model.js";
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.log("Error getAllAlbums", error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumsId } = req.params;

    //dung populate de goi nhung bai hat vao
    const album = await Album.findById(albumsId).populate("songs");
    if (!album) {
      return res.status(404).json({ message: "Album is not found" });
    }

    res.status(200).json(album);
  } catch (error) {
    console.log("Error getAlbumById");
    next(error);
  }
};
