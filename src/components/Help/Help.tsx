import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    Box,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    useToast,
    useColorModeValue,
    VStack, Center, FormErrorMessage,
} from "@chakra-ui/react";

import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {BsPerson} from 'react-icons/bs';
import {MdOutlineEmail} from 'react-icons/md';

import FileUpload from "../utils/FileUpload";
import {useAddHelp} from "../../hooks/useHelps";
import {useQueryClient} from "@tanstack/react-query";

const formSchema = z.object({
    name: z.string().min(4, {message: 'Please Provide full name'}).max(60),
    email: z.string().email().min(5),
    imageId: z.string().min(24, {message: 'Please select at-least 1 image ...'}).max(24, {message: 'Please select at-least 1 image ...'}),
    message: z.string().min(10, {message: 'We need some more details!'}).max(1024, {message: 'Please reduce the message  size...'})
}).required();

interface Props {
    isOpen: boolean;
    onClose: () => void;
}


type FormValues = z.infer<typeof formSchema>;

const Help = ({isOpen, onClose}: Props) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const [fileId, setFileId] = useState('');
    const {handleSubmit, register, watch, setValue, formState: { errors}} = useForm<FormValues>({resolver: zodResolver(formSchema)})
    const useAddHelpMutution = useAddHelp();

    useEffect(() => {
        setValue("imageId", fileId);
    }, [register, fileId, setValue]);


    const onSubmit: SubmitHandler<FormValues> = (values) => {

        useAddHelpMutution.mutate({data: {...values}}, {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries({queryKey: ['helps']})
            },
            onError: (error, variables, context) => {
                console.log(error);
                toast({
                    title: 'Something went wrong ',
                    description: 'Something unexpected ...',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        })

    }

    return (

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
                <ModalHeader>
                    <Center>
                        <Heading
                            fontSize={{
                                base: '2xl',
                                md: '3xl',
                            }}>
                            Get in Touch
                        </Heading>
                    </Center>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={5}>
                    <Box as="form" onSubmit={handleSubmit(onSubmit)}
                         bg={useColorModeValue('grey.400', 'gray.700')}
                         borderRadius="md"
                         p={8}
                         color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                         shadow="base">
                        <VStack spacing={4}>
                            <FormControl variant="floating" id="name" isInvalid={!!errors.name}>

                                <InputGroup>
                                    <InputLeftElement>
                                        <BsPerson/>
                                    </InputLeftElement>
                                    <Input {...register('name')} type="text" name="name"
                                           placeholder=" "/>
                                </InputGroup>
                                <FormLabel>Provide Your Name!</FormLabel>
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl variant="floating" id="email" isInvalid={!!errors.email}>

                                <InputGroup>
                                    <InputLeftElement>
                                        <MdOutlineEmail/>
                                    </InputLeftElement>
                                    <Input {...register('email')} type="email" name="email" placeholder=" "/>
                                </InputGroup>
                                <FormLabel>Provide your Email!</FormLabel>
                            </FormControl>
                            <FormControl id="issueImageId" isInvalid={!!errors.imageId}>
                                <Input id="imageUrl" {...register('imageId')}
                                       type="text"
                                       value={fileId}
                                       hidden={true}
                                />

                                <FormLabel>Upload Image</FormLabel>
                                <FileUpload maxFiles={1} allowMultiple={false} fileTypes={['image/jpeg', 'image/png']}
                                            fileId={fileId} setFileId={setFileId} path={'contact/upload'}/>
                                <FormErrorMessage>{errors.imageId?.message}</FormErrorMessage>

                            </FormControl>

                            <FormControl variant="floating" id="message" isInvalid={!!errors.message}>
                                <Textarea {...register('message')}
                                          name="message"
                                          placeholder=" "
                                          rows={6}
                                          resize="block"
                                />
                                <FormLabel>Please provide the issue in brief!</FormLabel>
                                <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                bg="blue.400"
                                color="white"
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                width="full">
                                Send Message
                            </Button>
                        </VStack>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}

export default Help;
