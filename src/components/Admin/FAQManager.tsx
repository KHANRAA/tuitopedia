import * as React from "react";
import {
    Avatar,
    Box, Button, Center,
    chakra,
    Container,
    Divider,
    Flex, HStack, Link,
    Skeleton,
    Table,
    TableContainer,
    Tbody, Td, Text,
    Th,
    Thead,
    Tr, useDisclosure
} from "@chakra-ui/react";
import Parser from "html-react-parser";
import FAQ from './FAQ';
import useUserStore from "../../store/userStore";
import {TbExternalLink} from "react-icons/tb";
import {GrValidate} from "react-icons/gr";
import {useAllFaq} from "../../hooks/useFAQs";
import {useEffect, useState} from "react";
import {LuFileEdit} from "react-icons/lu";
import {FaTrash} from "react-icons/fa6";
import ModalHelper from "../utils/ModalHelper";
import useFaqStore from "../../store/faqStore";
import Faq, {getDummyFaq} from "../../entities/faq";

const FAQManager = () => {
    const pulseBoxes = Array.from(Array(4).keys());
    const [faq, setFaq] = useState<Faq>(getDummyFaq);
    const {faqs, addFaq, removeFaq} = useFaqStore();
    const {data, isLoading, isError, error} = useAllFaq();
    const {user} = useUserStore();
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
        if (data && data.data) {
            addFaq(data?.data);
        }
    }, [data, addFaq, removeFaq]);


    if (!user || !user.tuitoPediaToken) {
        return <Container maxW="8xl%" px={5} py={8} mx="auto">
            <Box as="section" bg="white" borderRadius="md" border="1px solid #E2E4E6" width="100%">
                {pulseBoxes.map((id, index) => {
                    return (
                        <Box
                            borderBottom={pulseBoxes.length - 1 === index ? 'none' : '1px solid #E2E4E6'}
                            width="100%"
                            p="3"
                            key={index}
                        >
                            <Skeleton height="15vh" borderRadius="5px" width="100%"/>
                        </Box>
                    );
                })}
            </Box>
        </Container>
    }

    return (<Container maxW="8xl" py={10} px={4}>
        <Box border="1px solid" borderColor="gray.400" rounded="lg" boxShadow="lg">
            <Flex justify="left" p={2}>
                <chakra.h3 fontSize="xl" id="table-header" fontWeight="bold" textAlign="center">
                    FAQs
                </chakra.h3>
            </Flex>
            <Divider/>
            <TableContainer>
                <Table size="lg" variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr fontWeight="900" justifyContent={'space-between'}>
                            <Th w={'50%'}><Center>Title</Center></Th>
                            <Th w={'10%'}><Center>Content</Center></Th>
                            <Th>Image</Th>
                            <Th maxW={'sm'}>Category</Th>
                            <Th maxW={'sm'}>IsActive</Th>
                            <Th><Center>Actions</Center></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faqs.map((eachFaq) => (
                            <Tr key={eachFaq.id} justifyContent={'space-around'}>
                                <Td fontSize="sm" maxW={'sm'} overflowX={'auto'}>
                                    <Text fontWeight={'bold'} isTruncated noOfLines={1}>{eachFaq.title}</Text>
                                </Td>
                                <Td fontSize="md" fontWeight={'bold'} maxW={'sm'} overflowX='auto'>
                                    <Text isTruncated>{Parser(eachFaq.content).toString()}</Text>
                                </Td>
                                <Td fontSize="sm">
                                    <HStack spacing={0}>
                                        <Avatar src={eachFaq.imageUrl}/>
                                        <Link color='blue.500' href={eachFaq.imageUrl} isExternal><TbExternalLink/>
                                        </Link>
                                    </HStack>
                                </Td>
                                <Td fontSize="sm">
                                    <Text fontSize={'sm'}> {eachFaq.category}</Text>
                                </Td>
                                <Td fontSize="sm">
                                    <HStack spacing={2}>
                                        <Avatar bg={eachFaq.isActive ? 'green.500' : 'red.500'}
                                                icon={<GrValidate fontSize='1.2rem'/>}/>
                                    </HStack>
                                </Td>
                                <Td>
                                    <HStack spacing={2}>
                                        <Box rounded="md">
                                            <HStack spacing={3} justifyContent={'space-between'}>
                                                <Button colorScheme={'orange'}
                                                        leftIcon={<LuFileEdit/>} onClick={() => {
                                                    setFaq(eachFaq);
                                                    onOpen();
                                                }}>
                                                    Modify
                                                </Button>
                                                <ModalHelper key={eachFaq.id} size={'lg'} overlayClickEnabled={false}
                                                             childComponent={<FAQ isEdit={true} faqData={faq}/>}
                                                             onClose={onClose}
                                                             isOpen={isOpen}></ModalHelper>
                                            </HStack>
                                        </Box>
                                        <Box rounded="md">
                                            <HStack spacing={3} justifyContent={'space-between'}>
                                                <Button colorScheme={'red'}
                                                        leftIcon={<FaTrash/>}>
                                                    Delete
                                                </Button>
                                            </HStack>
                                        </Box>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    </Container>)
}


export default FAQManager;
