import { axiosInstance } from "@/lib/aixos";
import { create } from "zustand";
import { Album, Song, Stats } from "../types";
import toast from 'react-hot-toast'

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  featureSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeatureSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id:string)=> Promise<void>;
  deleteAlbum: (id:string)=> Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featureSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0,
  },

  deleteSong: async(id)=>{
    set({isLoading: true, error: null})
    try {
      await axiosInstance.delete(`/api/admin/songs/${id}`);
      set(state =>({
        songs: state.songs.filter(song=>song._id!==id)
      }))
      toast.success("Delete successfully")
    } catch (error:any) {
      toast.error("Error deleting song: ", error)
    }finally{
      set({isLoading: false})
    }
  },
  deleteAlbum:async(id)=>{
    set({isLoading: true, error: null})
    try {
      await axiosInstance.delete(`/api/admin/albums/${id}`);
      set(state=>({
        albums: state.albums.filter((album)=>album._id !== id),
        songs: state.songs.map((song)=>song.albumId === state.albums.find((a) => a._id === id)?.title?{...song, album: null}: song)
      }));
      toast.success("Album deleted successfully")
    } catch (error:any) {
      toast.error("Error deleting album: ", error)
    }finally{
      set({isLoading: false})
    }
  },
  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/songs");
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/stats");
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
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
  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeatureSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/songs/featured");
      set({ featureSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
