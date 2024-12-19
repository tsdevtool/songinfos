import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    audioUrl: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      require: false,
    },
  },
  { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);
