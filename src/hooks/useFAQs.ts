import {useMutation, useQuery} from "@tanstack/react-query";
import {addFaqRequest, getFaqs} from "../services/faq";
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

const useAllFaq = () => {
    return useQuery({
        queryKey: ['faqs'],
        queryFn: getFaqs,
        staleTime: 20000,
    });
};


export {useAddFaq, useAllFaq};
