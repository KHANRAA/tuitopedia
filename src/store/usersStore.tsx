import create from "zustand";

import User from "../entities/user";

interface UsersState {
    users: User[];
    addUsers: (newUsers: User[]) => void;
    removeUser: (id: string) => void;
    updateUser: (userData: User) => void;
}

const useUsersStore = create<UsersState>((set) => ({
    users: [],
    addUsers: (newUsers: User[]) => {
        set((state) => ({
            users: [...newUsers],
        }));
    },
    removeUser: (id: string) => {
        set((state) => ({
            users: state.users.filter((eachFaq) => eachFaq.id !== id),
        }));
    },
    updateUser: (userData: User) => {
        set((state) => ({
            users: state.users.map((eachUser) => eachUser.id === userData.id ? userData : eachUser)
        }));
    },
}));

export default useUsersStore;
