import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {addFaqRequest, getFaqs} from "../services/faq";

const useAddFaq = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['addFaq'],
        mutationFn: addFaqRequest,
        onSuccess: (data, variables, context) => {
            const faq = data.data;
        },
    });

}

const useAllFaq = () => {
    return useQuery({
        queryKey: ['faqs'],
        queryFn: getFaqs,
        staleTime: 2000,
    });
};


export {useAddFaq, useAllFaq};
