import * as React from 'react';
import {
    Container,
    Box,
    chakra,
    Flex,
    Divider,
    TableContainer,
    Table,
    Thead,
    Tbody,
    HStack,
    IconButton,
    Th,
    Link,
    Tr,
    Skeleton,
    Td,
    Text,
    Button, useDisclosure
} from '@chakra-ui/react';

import {BiSolidZoomIn} from "react-icons/bi";
import {TbExternalLink} from "react-icons/tb";
import {VscCommentUnresolved} from 'react-icons/vsc';
import {useEffect, useCallback, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import useUserStore from "../../store/userStore";
import {useAdminMarkedResponded, useAllHelps} from "../../hooks/useHelps";
import useHelpStore from "../../store/helpsStore";
import ModalHelper from "../utils/ModalHelper";

const Helps = () => {
    const pulseBoxes = Array.from(Array(4).keys());
    const {data, isLoading} = useAllHelps();
    const {helps, addHelps} = useHelpStore();
    const [modelContent, setModelContent] = useState('Loading ...');
    const {user, addUser} = useUserStore();
    const helpRespondMarkMutuation = useAdminMarkedResponded();
    const queryClient = useQueryClient();
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
        console.log('called....');
        console.log(data?.data);
        console.log(user);
        if (data && data.data) addHelps(data?.data);
    }, [data?.data, addHelps, user, addUser]);


    if (isLoading || !user || !user.tuitoPediaToken) {
        return <Container maxW="85%" px={5} py={8} mx="auto">
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
    return (
        <Container maxW="5xl" py={10} px={4}>
            <Box border="1px solid" borderColor="gray.400" rounded="lg" boxShadow="lg">
                <Flex justify="left" p={5}>
                    <chakra.h3 fontSize="xl"  id="table-header" fontWeight="bold" textAlign="center">
                        Help Requests
                    </chakra.h3>
                </Flex>
                <Divider/>
                <TableContainer>
                    <Table size="md" variant='striped' colorScheme='gray'>
                        <Thead>
                            <Tr fontWeight="900">
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th w={'20%'}>Message</Th>
                                <Th>Image</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {helps.map((eachHelp) => (
                                <Tr key={eachHelp.id}>
                                    <Td fontSize="sm">
                                        <HStack spacing={2}>
                                            <Text fontWeight={'bold'}>{eachHelp.name}</Text>
                                        </HStack>
                                    </Td>
                                    <Td fontSize="md" fontWeight={'bold'}>{eachHelp.email}</Td>
                                    <Td fontSize="md" fontWeight={'bold'} maxW={'sm'} overflowX='auto'>
                                        <HStack spacing={2} justifyContent={'space-between'}> <Text
                                            isTruncated>{eachHelp.message}</Text>
                                            <IconButton aria-label='Done' mt={3} onClick={() => {
                                                setModelContent(eachHelp.message);
                                                onOpen();
                                            }}
                                                        icon={<BiSolidZoomIn/>}/>
                                            <ModalHelper key={eachHelp.id} modalContent={modelContent}
                                                         onClose={onClose}
                                                         isOpen={isOpen}></ModalHelper>
                                        </HStack>

                                    </Td>
                                    <Td fontSize="md">
                                        <Link color='blue.500' href={eachHelp.imageUrl} isExternal>
                                            Image <TbExternalLink/>
                                        </Link>
                                    </Td>
                                    <Td>
                                        <Box rounded="md">
                                            <HStack spacing={3} justifyContent={'space-between'}>
                                                <Button colorScheme={'pink'}
                                                        leftIcon={<VscCommentUnresolved/>}
                                                        onClick={() => {

                                                            helpRespondMarkMutuation.mutate({data: {id: eachHelp.id}}, {
                                                                onSuccess: (data, variables, context) => {
                                                                    queryClient.invalidateQueries({queryKey: ['helps']})
                                                                }
                                                            })
                                                        }}>
                                                    Mark Resolved
                                                </Button>
                                            </HStack>
                                        </Box>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};


export default Helps;
