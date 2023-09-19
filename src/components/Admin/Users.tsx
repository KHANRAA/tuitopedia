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
    Th,
    Badge,
    Tr,
    Skeleton,
    Td,
    Text,
    Button, AvatarBadge, Avatar, WrapItem
} from '@chakra-ui/react';

import {TiUserDelete} from 'react-icons/ti';
import {GiShieldDisabled} from 'react-icons/gi';
import {useAllUsers, useAlterAdminUser, useDeactivateUser} from '../../hooks/useUsers';
import {useEffect} from "react";
import useUsersStore from "../../store/usersStore";
import {useQueryClient} from "@tanstack/react-query";
import useUserStore from "../../store/userStore";

const Users = () => {
    const pulseBoxes = Array.from(Array(4).keys());
    const {data, isLoading, isError, error} = useAllUsers();
    const {users, addUsers, updateActiveUser, updateAdminUser} = useUsersStore();
    const {user} = useUserStore();
    const userAdminMutation = useAlterAdminUser();
    const userActiveMutation = useDeactivateUser();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data && data.data) addUsers(data?.data);
    }, [data, addUsers]);


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
            <Box border="1px solid" borderColor="gray.400" rounded="lg" boxShadow="lg" overflow="hidden">
                <Flex justify="left" p={5}>
                    <chakra.h3 fontSize="xl" fontWeight="bold" textAlign="center">
                        TuitoPedia Users
                    </chakra.h3>
                </Flex>
                <Divider/>
                <TableContainer>
                    <Table size="md" colorScheme='gray'>
                        <Thead>
                            <Tr fontWeight="900">
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((eachUser) => (
                                <Tr key={eachUser.id} hidden={eachUser.id === user.id}>
                                    <Td fontSize="sm">
                                        <HStack spacing={2}>
                                            <WrapItem>
                                                <Avatar bg='green.500' size='sm' name={eachUser.name}
                                                        src={eachUser.avatarImageUrl}> <AvatarBadge boxSize='1.25em'
                                                                                                    bg='green.500'/></Avatar>
                                            </WrapItem>
                                            <Text fontWeight={'bold'}>{eachUser.name}</Text>
                                        </HStack>
                                    </Td>
                                    <Td fontSize="md" fontWeight={'bold'}>{eachUser.email}</Td>
                                    <Td fontSize="md"><Badge
                                        rounded="full"
                                        p="2px 8px"
                                        colorScheme={eachUser.role === 'admin' ? 'red' : 'teal'}
                                        as="button"
                                        onClick={() => {
                                        }}>
                                        {eachUser.role}
                                    </Badge></Td>
                                    <Td>
                                        <Box rounded="md">
                                            <HStack spacing={3} justifyContent={'space-between'}>
                                                <Button colorScheme={eachUser.isActive ? 'gray.800' : 'green'}
                                                        textColor={eachUser.isActive ? 'black' : 'white'}
                                                        variant={eachUser.isActive ? 'outline' : 'solid'}
                                                        leftIcon={<TiUserDelete/>} onClick={() => {

                                                    userActiveMutation.mutate({data: {id: eachUser.id, isActive: !eachUser.isActive}}, {
                                                        onSuccess: (data, variables, context) => {
                                                            updateActiveUser(!eachUser.isActive, eachUser.id);
                                                            queryClient.invalidateQueries({queryKey: ['users']})
                                                        }
                                                    })
                                                }}>
                                                    {eachUser.isActive ? 'Deactivate User' : 'Activate User'}
                                                </Button>
                                                <Button colorScheme={eachUser.role === 'admin' ? 'teal' : 'red'}
                                                        leftIcon={<GiShieldDisabled/>}
                                                        onClick={() => {

                                                            userAdminMutation.mutate({data: {id: eachUser.id, isAdmin: (eachUser.role !== 'admin')}}, {
                                                                onSuccess: (data, variables, context) => {
                                                                    updateAdminUser(data.role, eachUser.id);
                                                                    queryClient.invalidateQueries({queryKey: ['users']})
                                                                }
                                                            })
                                                        }}>
                                                    {eachUser.role === 'admin' ? 'Make User' : 'Make Admin'}
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


export default Users;
