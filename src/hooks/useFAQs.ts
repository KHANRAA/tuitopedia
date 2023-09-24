import {useMutation, useQuery} from "@tanstack/react-query";
import {addFaqRequest, getFaqs, updateFAQ} from "../services/faq";
import {useNavigate} from "react-router-dom";

const useAddFaq = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['addFaq'],
        mutationFn: addFaqRequest,
        onSuccess: () => {
            navigate('/')
        }
    });

}


export const useUpdateFaq = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['updateFaq'],
        mutationFn: updateFAQ,
        onSuccess: () => {
            navigate('/')
        }
    });

}
const useAllFaq = () => {
    return useQuery({
        queryKey: ['faqs'],
        queryFn: getFaqs,
        staleTime: 20000,
    });
};


export {useAddFaq, useAllFaq};
