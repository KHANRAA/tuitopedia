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
import {useAddFaq, useAllFaq, useUpdateFaq} from "../../hooks/useFAQs";
import {AxiosError} from "axios";
import useCategoriesStore from "../../store/categoriesStore";
import useFaqStore from "../../store/faqStore";
import Faq from "../../entities/faq";
import Parser from "html-react-parser";
import {useQueryClient} from "@tanstack/react-query";


interface Props {
    faqData: Faq;
    isEdit: boolean;
}


const fromSchema = z.object({
    title: z.string().min(5).max(200),
    content: z.string().min(10).max(20000),
    imageId: z.string().min(24, {message: 'Please select  at least 1 image... '}).optional().or(z.literal('')),
    category: z.string().min(1, {message: "Please select at least one category"}),
});


type FormValues = z.infer<typeof fromSchema>;


const FAQ = (props: Props) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const [faqId, setFaqId] = useState('');
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isValid},
        watch,
        setValue
    } = useForm<FormValues>({
        resolver: zodResolver(fromSchema)
    });
    const {data} = useAllFaq();
    const addMututaion = useAddFaq();
    const updateMutation = useUpdateFaq();
    const [fileId, setFileId] = useState('');
    const {addFaq} = useFaqStore();
    const {setCategories} = useCategoriesStore();
    useEffect(() => {
        if (props.isEdit) {
            setFaqId(props.faqData.id);
            setValue('title', props.faqData.title, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
            setValue('content', Parser(props.faqData.content).toString(), {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
            setValue('imageId', props.faqData.id, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
            setValue('category', props.faqData.category, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
        }
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
        if (props.isEdit) {
            updateMutation.mutate({data: {...values, id: faqId}});
            if (updateMutation.isError && updateMutation.error instanceof AxiosError) {
                console.log(updateMutation.isError);
                toast({
                    title: 'Something went wrong ',
                    description: updateMutation.error.response?.data.data.message || 'Something unexpected ...',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        } else {
            addMututaion.mutate({data: {...values}});
            if (addMututaion.isError && addMututaion.error instanceof AxiosError) {
                console.log(updateMutation.isError);
                toast({
                    title: 'Something went wrong ',
                    description: addMututaion.error.response?.data.data.message || 'Something unexpected ...',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
        queryClient.invalidateQueries(['faqs']);
    };


    return (
        <Box>
            <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        {props.isEdit ? 'Edit Faq' : 'Add new FAQ'}
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue( 'whiteAlpha.900','gray.700')}
                    boxShadow={'lg'}
                    p={5}>
                    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>

                            <FormControl variant="floating" id="title" isInvalid={!!errors.title}>

                                <Input id="title" {...register('title')} type="text"
                                       placeholder=" "></Input>
                                <FormLabel backgroundColor={useColorModeValue('white', 'gray.700')}>Provide Title For
                                    NEW FAQ</FormLabel>
                                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="image" isInvalid={!!errors.imageId}>
                                <FormLabel backgroundColor={useColorModeValue('white', 'gray.700')}>Upload
                                    Image</FormLabel>
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
                                <FormLabel backgroundColor={useColorModeValue('white', 'gray.700')}>Write your
                                    FAQ!</FormLabel>
                                <QuillEditor id='faqEditor' inputRef={ref} placeholder=" "
                                             value={editorContent}
                                             onChange={onEditorStateChange}/>
                                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl variant="floating" id="category" isInvalid={!!errors.category}>
                                <Select variant='outline'  {...register('category')}>
                                    <option key="General" hidden={categories.length > 0} selected
                                            value="General">General
                                    </option>
                                    {categories.map((eachCategory) =>
                                        <option key={eachCategory} value={eachCategory}>{eachCategory}</option>
                                    )}
                                </Select>
                                <FormLabel backgroundColor={useColorModeValue('white', 'gray.700')}>Select
                                    Category!</FormLabel>
                                <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    isDisabled={!isValid}
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


export default FAQ;
