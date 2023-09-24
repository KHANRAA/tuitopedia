import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addFaqRequest, getFaqs, updateFaqRequest} from "../services/faq";
import {useNavigate} from "react-router-dom";
import useFaqStore from "../store/faqStore";

const useAddFaq = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['addFaq'],
        mutationFn: addFaqRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs']);
            navigate('/')
        }
    });

}


export const useUpdateFaq = () => {
    const {updateFaq} = useFaqStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateFaq'],
        mutationFn: updateFaqRequest,
        onSuccess: (data, variables, context) => {
            updateFaq(data.data);
            console.log('here!...');
            queryClient.invalidateQueries(['faqs']);
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
