import create from "zustand";
import Help from "../entities/help";

interface HelpState {
    helps: Help[];
    addHelps: (newHelp: Help[]) => void;
    removeHelps: (id: string) => void;
}

const useHelpStore = create<HelpState>((set) => ({
    helps: [],
    addHelps: (newHelps: Help[]) => {
        set((state) => ({
            helps: [...newHelps],
        }));
    },
    removeHelps: (id) => {
        set((state) => ({
            helps: state.helps.filter((eachHelp) => eachHelp.id === id),
        }));
    }
}));

export default useHelpStore;
