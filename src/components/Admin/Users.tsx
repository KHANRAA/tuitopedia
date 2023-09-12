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
    Td,
    Text,
    Button, AvatarBadge, Avatar, WrapItem
} from '@chakra-ui/react';
import User from "../../entities/user";

import {TiUserDelete} from 'react-icons/ti';
import {GiShieldDisabled} from 'react-icons/gi';

import {useNavigate} from "react-router-dom";
import {useAllUsers} from '../../hooks/useUsers';
import {useEffect} from "react";
import useUsersStore from "../../store/usersStore";

const Users = () => {
    const navigate = useNavigate();
    const {users, addUsers} = useUsersStore();
    const {data, isLoading, isError, error} = useAllUsers();
    useEffect(() => {
        if (data && data.data) addUsers(data?.data);
    }, [data, addUsers]);

    return (
        <Container maxW="5xl" py={10} px={4}>
            <Box border="1px solid" borderColor="gray.400" rounded="lg" boxShadow="lg" overflow="hidden">
                <Flex justify="left" p={5}>
                    <chakra.h3 fontSize="xl" fontWeight="bold" textAlign="center">
                        TuitoPedia User
                    </chakra.h3>
                </Flex>
                <Divider/>
                <TableContainer>
                    <Table size="md">
                        <Thead>
                            <Tr fontWeight="900">
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((eachUser,) => (
                                <Tr key={eachUser.id}>
                                    <Td fontSize="sm">
                                        <HStack spacing={2}>
                                            <WrapItem>
                                                <Avatar bg='green.500' size='sm' name={eachUser.name}
                                                        src={eachUser.avatarUrl}> <AvatarBadge boxSize='1.25em'
                                                                                               bg='green.500'/></Avatar>
                                            </WrapItem>
                                            <Text>{eachUser.name}</Text>
                                        </HStack>
                                    </Td>
                                    <Td fontSize="sm">{eachUser.email}</Td>
                                    <Td fontSize="sm"><Badge
                                        rounded="full"
                                        p="2px 8px"
                                        colorScheme={eachUser.role === 'admin' ? 'green' : 'blue'}
                                        as="button"
                                        onClick={() => {
                                        }}
                                    >
                                        {eachUser.role}
                                    </Badge></Td>
                                    <Td>
                                        <Box rounded="md">
                                            <HStack spacing={2}>
                                                <Button colorScheme='red' leftIcon={<TiUserDelete/>}>
                                                    Delete User
                                                </Button>
                                                <Button colorScheme='yellow' leftIcon={<GiShieldDisabled/>}>
                                                    Disable User
                                                </Button>
                                            </HStack>
                                        </Box>
                                    </Td>s
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
