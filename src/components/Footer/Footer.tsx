import {Stack, Link, Image, Button, Text, useDisclosure, HStack} from '@chakra-ui/react';
import {FaHandsHelping} from 'react-icons/fa';
import ReactLogo from '../../assets/logo192.png';
import Help from "../Help/Help";

const Footer = () => {
    const {onOpen, isOpen, onClose} = useDisclosure();
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


            <Stack direction="row" spacing={5} pt={{base: 4, md: 0}} alignItems="center" zIndex={5}>
                <Button onClick={onOpen} variant="outline" colorScheme="teal"
                        rightIcon={<FaHandsHelping/>}>Help?</Button>
                <Help isOpen={isOpen} onClose={onClose}></Help>
            </Stack>
        </Stack>
    );
};

export default Footer;
