import {HStack, Button, useColorMode} from "@chakra-ui/react";
import {BsSun, BsMoonStarsFill} from 'react-icons/bs'

const ColorModeSwitch = () => {
    const {toggleColorMode, colorMode} = useColorMode();

    return (
        <HStack>

            <Button
                aria-label="Toggle Color Mode"
                onClick={toggleColorMode}
                _focus={{boxShadow: 'none'}}
                w="none">
                {colorMode === 'light' ? <BsMoonStarsFill/> : <BsSun/>}
            </Button>
        </HStack>
    )
}

export default ColorModeSwitch;
