import {Box, useColorModeValue} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const LayOut = () => {
    return (
        <Box>

            <NavBar/>
            <Box bg={useColorModeValue('white', 'gray.800')}>
                <Outlet/>
                <Footer/>
            </Box>

        </Box>

    )
}

export default LayOut
