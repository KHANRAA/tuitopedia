import {useEffect, useState} from "react";
import {
    Box,
    HStack,
    Image,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    MenuOptionGroup,
    Center,
    Button,
    MenuDivider, Icon
} from "@chakra-ui/react";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import {BiLogOut, BiLogIn} from "react-icons/bi";
import {RiAdminLine} from 'react-icons/ri';
import {useQueries} from "@tanstack/react-query";
import ReactLogo from "../../assets/logo192.png";
import {getAuthUser, isLoggedInUser, logOut} from "../../services/auth";
import User from "../../entities/user";
import useUserStore from "../../store/userStore";


const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedInStatus, authStatus] = useQueries({
        queries: [
            {queryKey: ['isLoggedIn'], queryFn: isLoggedInUser, staleTime: 2000},
            {queryKey: ['user'], queryFn: getAuthUser, staleTime: 2000}
        ]
    });
    const {user, addUser, removeUser} = useUserStore();
    useEffect(() => {
        addUser(authStatus.data || {} as User)
    }, [authStatus.data]);

    if (isLoggedInStatus.isLoading || authStatus.isLoading) {
        return null;
    }

    return (
        <Box>
            < HStack justifyContent="space-between" padding={5}>
                <Link to="/">

                    <HStack>
                        <Image src={ReactLogo} boxSize="30px" objectFit="cover"/>
                        <Text fontSize={'1.5rem'} color={'#434190'} marginLeft={'0.5'} fontWeight={600}
                              fontFamily={'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto'}>tuitopedia</Text>
                    </HStack>
                </Link>
                <HStack>
                    <ColorModeSwitch/>

                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'sm'}
                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                            />
                        </MenuButton>
                        <MenuList alignItems={'center'}>
                            {user && !user.tuitoPediaToken && (<MenuItem>
                                <HStack onClick={() => {
                                    if (!location.pathname.includes('auth')) {
                                        navigate('/auth')
                                    }
                                }}>

                                    <Icon as={BiLogIn}/>
                                    <Text>Login</Text>
                                </HStack>
                            </MenuItem>)}
                            {user && user.isAdmin && (
                                <>
                                    <br/>
                                    <Center>
                                        <p>{user.name}</p>
                                    </Center>
                                    <br/>
                                    <MenuDivider/>
                                    <MenuOptionGroup defaultValue='asc' title='Admin' type='radio'>
                                        <MenuItem>
                                            <HStack>
                                                <NavLink to={'/admin/addfaq'}>
                                                    <Icon as={RiAdminLine}/>
                                                    Add Faq</NavLink>
                                            </HStack>

                                        </MenuItem>
                                        <MenuItem>
                                            <HStack>
                                                <NavLink to={'/admin/users'}>
                                                    <Icon as={RiAdminLine}/>
                                                    Edit/View Users</NavLink>
                                            </HStack>

                                        </MenuItem>

                                    </MenuOptionGroup>
                                    <MenuDivider/>
                                </>)}
                            {user && user.tuitoPediaToken && (<MenuItem>
                                <HStack onClick={async () => {
                                    await logOut();
                                    removeUser();
                                    navigate(0);
                                }}>
                                    <Icon as={BiLogOut}/>
                                    <Text>Logout</Text>
                                </HStack>
                            </MenuItem>)}
                        </MenuList>
                    </Menu>
                </HStack>
            </HStack>
        </Box>
    )

}

export default NavBar;
