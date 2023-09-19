import {useMutation, useQuery} from "@tanstack/react-query";
import {addFaqRequest, getFaqs} from "../services/faq";

const useAddFaq = () => {
    return useMutation({
        mutationKey: ['addFaq'],
        mutationFn: addFaqRequest,
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
