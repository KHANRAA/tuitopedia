import {useMutation, useQuery} from "@tanstack/react-query";
import {updateActiveUserRequest, updateAdminUserRequest, getAllUsers} from "../services/users";

const useAllUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        staleTime: 5000
    });

}

const useDeactivateUser = () => {
    return useMutation({
        mutationKey: ['updateUserState'],
        mutationFn: updateActiveUserRequest,
    });

}

const useAlterAdminUser = () => {
    return useMutation({
        mutationKey: ['updateAdmin'],
        mutationFn: updateAdminUserRequest,
    });

}

export {useAllUsers, useDeactivateUser, useAlterAdminUser};
