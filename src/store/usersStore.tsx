import create from "zustand";

import User from "../entities/user";

interface UsersState {
    users: User[];
    addUsers: (newUsers: User[]) => void;
    removeUser: (id: string) => void;
    updateAdminUser: (role: string, id: string) => void;
    updateActiveUser: (isActive: boolean, id: string) => void;
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
    updateAdminUser: (updateRole, id) => {
        set((state) => ({
            users: state.users.map((eachUser) => {
                if (eachUser.id === id) eachUser.role = updateRole;
                return eachUser
            })
        }));
    },
    updateActiveUser: (isActive, id) => {
        set((state) => ({
            users: state.users.map((eachUser) => {
                if (eachUser.id === id) eachUser.isActive = isActive;
                return eachUser
            })
        }));
    }
}));

export default useUsersStore;
