import {useEffect} from "react";
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
import {IoMdContacts} from "react-icons/io";
import {CgFileDocument} from "react-icons/cg";
import {FaUserFriends} from "react-icons/fa";
import {FaPersonCircleQuestion} from "react-icons/fa6";
import {HiOutlineDocumentPlus} from "react-icons/hi2";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import {BiLogOut, BiLogIn} from "react-icons/bi";
import {RiAdminLine} from 'react-icons/ri';
import {useQueries, useQueryClient} from "@tanstack/react-query";
import ReactLogo from "../../assets/logo192.png";
import {getAuthUser, isLoggedInUser, logOut} from "../../services/auth";
import User from "../../entities/user";
import useUserStore from "../../store/userStore";


const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const qyeryClient = useQueryClient();

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
                            {user && !user.tuitoPediaToken && (<MenuItem onClick={() => {
                                if (!location.pathname.includes('auth')) {
                                    navigate('/auth?mode=login')
                                }
                            }}>
                                <Icon as={BiLogIn}/>
                                <Text>Login</Text>
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
                                        <MenuItem onClick={() => {
                                            navigate('/admin/faqs')
                                        }}>
                                            <Icon as={RiAdminLine}/>
                                            <Icon as={CgFileDocument}/>
                                            <Text>Edit/View faqs</Text>

                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            navigate('/admin/helps')
                                        }}>
                                            <Icon as={IoMdContacts}/>
                                            <Icon as={FaPersonCircleQuestion}/>
                                            <Text>Edit/View Queries</Text>

                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            navigate('/admin/addfaq')
                                        }}>

                                            <Icon as={RiAdminLine}/>
                                            <Icon as={HiOutlineDocumentPlus}/>
                                            <Text> Add Faq</Text>

                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            navigate('/admin/users')
                                        }}>
                                            <Icon as={RiAdminLine}/>
                                            <Icon as={FaUserFriends}/>
                                            <Text> Edit/View Users</Text>

                                        </MenuItem>s

                                    </MenuOptionGroup>
                                    <MenuDivider/>
                                </>)}
                            {user && user.tuitoPediaToken && (<MenuItem>
                                <HStack onClick={async () => {
                                    await logOut();
                                    removeUser();
                                    qyeryClient.invalidateQueries(['faqs']);

                                    navigate('/');
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
