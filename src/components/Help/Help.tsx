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
    useColorModeValue,
    VStack,
    Stack,
    Avatar,
    AvatarBadge,
    IconButton,
    ModalFooter, Center,
} from "@chakra-ui/react";


import {BsPerson} from 'react-icons/bs';
import {SmallCloseIcon} from '@chakra-ui/icons'
import {MdEmail, MdOutlineEmail} from 'react-icons/md';

import React, {useState} from "react";
import FileUpload from "../utils/FileUpload";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const Help = ({isOpen, onClose}: Props) => {
    const [image, setImage] = useState<any>([]);
    const handleChangeImage = (files: any) => {
        setImage(files)
    }


    return (

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'
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
                    <Box
                        bg={useColorModeValue('grey.400', 'gray.700')}
                        borderRadius="md"
                        p={8}
                        color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                        shadow="base">
                        <VStack spacing={4}>
                            <FormControl variant="floating" isRequired>
                                <FormLabel>Name</FormLabel>

                                <InputGroup>
                                    <InputLeftElement>
                                        <BsPerson/>
                                    </InputLeftElement>
                                    <Input type="text" name="name" placeholder="Your Name"/>
                                </InputGroup>
                            </FormControl>

                            <FormControl variant="floating" isRequired>
                                <FormLabel>Email</FormLabel>

                                <InputGroup>
                                    <InputLeftElement>
                                        <MdOutlineEmail/>
                                    </InputLeftElement>
                                    <Input type="email" name="email" placeholder="Your Email"/>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="userName">
                                <FormLabel></FormLabel>


                                        <FileUpload maxFiles={1} allowMultiple={false} fileTypes={['image/jpeg', 'image/png']}
                                                    fileId={'fileId'} setFileId={()=>{}}/>

                            </FormControl>

                            <FormControl variant="floating" isRequired>
                                <FormLabel>Message</FormLabel>

                                <Textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows={6}
                                    resize="none"
                                />
                            </FormControl>

                            <Button
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

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}

export default Help;
