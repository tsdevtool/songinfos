import { axiosInstance } from "@/lib/aixos";
import { create } from "zustand";
import { Album, Song } from "../types";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;

  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    //data fetch logic...
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/api/albums");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
