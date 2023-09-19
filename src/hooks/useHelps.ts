import {useMutation, useQuery} from "@tanstack/react-query";
import {addHelpRequest, hetAllHelps, updateAdminResponded} from "../services/help";
const useAddHelp = () => {
    return useMutation({
        mutationKey: ['addHelp'],
        mutationFn: addHelpRequest,
    });
}

const useAllHelps = () => {
    return useQuery({
        queryKey: ['helps'],
        queryFn: hetAllHelps,
        staleTime: 5000,
    });
};


const useAdminMarkedResponded = () => {
    return useMutation({
        mutationKey: ['updateHelpResponded'],
        mutationFn: updateAdminResponded,
    });

}

export {useAddHelp, useAllHelps, useAdminMarkedResponded};
