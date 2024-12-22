import { axiosInstance } from '@/lib/aixos';
import {create} from 'zustand';

interface ChatStore{
    users: any[],
    fetchUsers:()=>Promise<void>,
    isLoading: boolean,
    error: string|null
}

export const useChatStore = create<ChatStore>((set)=>({
    users:[],
    isLoading: true,
    error: null,
    fetchUsers: async()=> {
        try {
            const response = await axiosInstance.get("/api/users");
            set({users: response.data})
        } catch (error:any) {
        set({error: error.response.data.message})
        }finally{
            set({isLoading:false})
        }
    },
}))