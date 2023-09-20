import React, {useEffect, useState, useRef} from 'react';
import {
    Box, Button,
    FormControl,
    FormLabel,
    Heading,
    Select,
    Input,
    Stack, FormErrorMessage, Container, useColorModeValue, useToast
} from "@chakra-ui/react";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import QuillEditor from "../utils/QuillEditor";
import FileUpload from "../utils/FileUpload";
import {useAddFaq, useAllFaq} from "../../hooks/useFAQs";
import {AxiosError} from "axios";
import useCategoriesStore from "../../store/categoriesStore";
import useFaqStore from "../../store/faqStore";

const fromSchema = z.object({
    title: z.string().min(5).max(200),
    content: z.string().min(10).max(20000),
    imageId: z.string().min(24, {message: 'Please select  at least 1 image... '}),
    category: z.string().min(1, {message: "Please select at least one category"}),
});


type FormValues = z.infer<typeof fromSchema>;


const Faq = () => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        watch,
        setValue
    } = useForm<FormValues>({
        resolver: zodResolver(fromSchema)
    });
    const {data} = useAllFaq();
    const {mutate, error, isError} = useAddFaq();
    const [fileId, setFileId] = useState('');
    const {addFaq} = useFaqStore();
    const {setCategories} = useCategoriesStore();
    useEffect(() => {
        register("content", {required: true, minLength: 11});
        setValue("imageId", fileId);
        if (data && data.data) {
            addFaq(data?.data);
            // eslint-disable-next-line array-callback-return
            data?.data.map((eachFaq) => {
                setCategories(eachFaq.category)
            })
        }
    }, [register, fileId, setValue, data]);

    const ref = useRef<HTMLInputElement>(null);

    const onEditorStateChange = (editorState: string) => {
        setValue("content", editorState);
    };

    const {categories} = useCategoriesStore();


    const editorContent = watch("content");

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        console.log(values);

        mutate({data: {...values}});
        if (isError && error instanceof AxiosError) {
            console.log(error);
            toast({
                title: 'Something went wrong ',
                description: error.response?.data.data.message || 'Something unexpected ...',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    };


    return (
        <Box>
            <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Add new FAQ
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={5}>

                    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>

                            <FormControl variant="floating" id="title" isInvalid={!!errors.title}>

                                <Input id="title" {...register('title')} type="text"
                                       placeholder=" "></Input>
                                <FormLabel>Provide Title For NEW FAQ</FormLabel>
                                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="image" isInvalid={!!errors.imageId}>
                                <FormLabel>Upload Image</FormLabel>
                                <Input id="imageUrl" {...register('imageId')}
                                       type="text"
                                       value={fileId}
                                       hidden={true}
                                />
                                <FileUpload maxFiles={1} allowMultiple={false} fileTypes={['image/jpeg', 'image/png']}
                                            fileId={fileId} setFileId={setFileId} path={'upload'}/>
                                <FormErrorMessage>{errors.imageId?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="description" isInvalid={!!errors.content}>
                                <FormLabel>Write your FAQ!</FormLabel>
                                <QuillEditor id='faqEditor' inputRef={ref} placeholder=" "
                                             value={editorContent}
                                             onChange={onEditorStateChange}/>
                                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl variant="floating" id="category" isInvalid={!!errors.category}>
                                <Select  variant='outline'  {...register('category')}>
                                    {categories.map((eachCategory) =>
                                        <option key={eachCategory} value={eachCategory}>{eachCategory}</option>
                                    )}
                                </Select>
                                <FormLabel>Select Category!</FormLabel>
                                <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    isLoading={isSubmitting}
                                    type="submit"
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Submit
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>

                </Box>
            </Stack>
        </Box>
    )
}


export default Faq;
