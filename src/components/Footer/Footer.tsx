import {Stack, Link, Image, IconButton, Text, Tooltip, keyframes, useDisclosure, HStack} from '@chakra-ui/react';
import {MdOutlineHelpOutline} from 'react-icons/md';
import ReactLogo from '../../assets/logo192.png';
import Help from "../Help/Help";
import useUserStore from "../../store/userStore";
import {motion} from 'framer-motion'


const animationKeyframes = keyframes`
  0% {
    transform: scale(0.5) rotate(0);
    border-radius: 20%;
  }
  25% {
    transform: scale(1) rotate(0);
    border-radius: 20%;
  }
  50% {
    transform: scale(1) rotate(270deg);
    border-radius: 50%;
  }
  75% {
    transform: scale(1) rotate(270deg);
    border-radius: 50%;
  }
  100% {
    transform: scale(0.5) rotate(0);
    border-radius: 20%;
  }
`;

const animation = `${animationKeyframes} 5s ease-in-out infinite`;

const Footer = () => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const {user} = useUserStore();
    return (
        <Stack
            maxW="5xl"
            marginInline="auto"
            p={8}
            spacing={{base: 8, md: 0}}
            justifyContent="space-between"
            alignItems="center"
            direction={{base: 'column', md: 'row'}}>
            <HStack>
                <Link href="" isExternal>
                    <Image boxSize="30px" objectFit="cover" src={ReactLogo} alt="Logo"/>
                </Link>
                <Text>© 2023 Tuitopedia. All rights reserved</Text>

            </HStack>


            <Stack direction="row" spacing={5} pt={{base: 4, md: 0}} alignItems="center" zIndex={5}
                   hidden={user && user.isAdmin}>
                <Help isOpen={isOpen} onClose={onClose}></Help>
                <Tooltip label='Need Help' fontSize='md' hasArrow bg='cyan.600' placement='top'>
                    <IconButton
                        as={motion.button}
                        animation={animation}

                        onClick={onOpen}
                        isRound={true}
                        variant='solid'
                        colorScheme='purple'
                        aria-label='Done'
                        fontSize='20px'
                        icon={<MdOutlineHelpOutline/>}
                    />
                </Tooltip>
            </Stack>
        </Stack>
    );
};

export default Footer;
