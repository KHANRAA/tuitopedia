import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAllUsers} from "../services/users";

const useAllUsers = () => {
    const navigate = useNavigate();
    return useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        staleTime: 5000
    });

}

export {useAllUsers};
