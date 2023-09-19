import {Stack, Link, Image, IconButton, Text, Tooltip, useDisclosure, HStack} from '@chakra-ui/react';
import {MdOutlineHelpOutline} from 'react-icons/md';
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
                <Help isOpen={isOpen} onClose={onClose}></Help>
                <Tooltip label='Need Help' fontSize='md' hasArrow bg='orange.600' placement='top'>
                    <IconButton
                        onClick={onOpen}
                        isRound={true}
                        variant='solid'
                        colorScheme='green'
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
