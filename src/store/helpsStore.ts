import {create} from "zustand";
import Help from "../entities/help";
import {useAllHelps} from "../hooks/useHelps";

interface HelpState {
    helps: Help[];
    addHelps: (newHelp: Help[]) => void;
    removeHelps: (id: string) => void;
    reset: () => void;
}

const useHelpStore = create<HelpState>((set) => ({
    helps: [],
    addHelps: (newHelps: Help[]) => {
        set(() => ({
            helps: [...newHelps],
        }));
    },
    removeHelps: (id) => {
        set((state) => ({
            helps: state.helps.filter((eachHelp) => eachHelp.id === id),
        }));
    },
    getHelps: async () => {
        set(() => ({}))
    },
    reset: () => {
        set(() => ({
            helps: [],
        }));
    },
}));

export default useHelpStore;
