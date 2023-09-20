import {create} from "zustand";
import User from "../entities/user";

interface UserState {
    user: User;
    addUser: (newUser: User) => void;
    removeUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    user: {} as User,
    addUser: (newUser: User) => {
        set((state) => ({
            user: newUser
        }));
    },
    removeUser: () => {
        set((state) => ({
            user: {} as User
        }));
    }
}));

export default useUserStore;
