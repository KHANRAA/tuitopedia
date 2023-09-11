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
    Button,
    useColorModeValue, AvatarBadge, IconButton, Avatar, WrapItem
} from '@chakra-ui/react';
import User from "../../entities/user";

import {TiUserDelete} from 'react-icons/ti';
import {GiShieldDisabled} from 'react-icons/gi';

import {useEffect} from "react";
import {useGetUser} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

interface Network {
    name: string;
    visotors: string;
    visotorsRatio: string;
}

const networks: User[] = [
    {
        id: "test",
        name: 'Abc',
        email: 'test@example.com',
        avatarUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
        role: 'user',
        isActive: true
    },
    {
        id: "def",
        name: 'Abc',
        email: 'test@example.com',
        avatarUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
        role: 'user',
        isActive: true
    },
    {
        id: "geh",
        name: 'Abc',
        email: 'test@example.com',
        avatarUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
        role: 'user',
        isActive: false
    },

];

const Users = () => {
    const navigate = useNavigate();
    // const {data, isLoading, isError} = useGetUser();
    //
    // useEffect(() => {
    //     console.log('here ....');
    //     console.log(data);
    //     console.log(data?.role);
    //     // @ts-ignore
    //     if (!data || !data.role || !data.role === 'admin') {
    //         navigate('/');
    //     }
    //
    // }, []);
    return (
        <Container maxW="5xl" py={10} px={4}>
            <Box border="1px solid" borderColor="gray.400" rounded="lg" boxShadow="lg" overflow="hidden">
                <Flex justify="left" p={5}>
                    <chakra.h3 fontSize="xl" fontWeight="bold" textAlign="center">
                        Users
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
                            {networks.map((network, index) => (
                                <Tr key={index}>
                                    <Td fontSize="sm">
                                        <HStack spacing={2}>
                                            <WrapItem>
                                                <Avatar bg='green.500' size='sm' name='Kent Dodds'
                                                        src='https://bit.ly/kent-c-dodds'> <AvatarBadge boxSize='1.25em'
                                                                                                        bg='green.500'/></Avatar>
                                            </WrapItem>
                                            <Text>{network.name}</Text>
                                        </HStack>
                                    </Td>
                                    <Td fontSize="sm">{network.email}</Td>
                                    <Td fontSize="sm"><Badge
                                        rounded="full"
                                        p="2px 8px"
                                        colorScheme={network.role === 'user' ? 'green' : 'blue'}
                                        as="button"
                                        onClick={() => {
                                        }}
                                    >
                                        {network.role}
                                    </Badge></Td>
                                    <Td>
                                        <Box rounded="md">
                                            <HStack spacing={2}>
                                                <Button colorScheme='red' leftIcon={<TiUserDelete/>}>
                                                    Delete
                                                </Button>
                                                <Button colorScheme='yellow' leftIcon={<GiShieldDisabled/>}>
                                                    Disable
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
