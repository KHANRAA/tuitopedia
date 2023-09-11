import {Center, Image} from "@chakra-ui/react";
import DefaultSearchAsset from "../../assets/search-on-web.png";
import FaqAsset from "../../assets/question.svg"

const FAQBanner = () => {
    return (

        <Center>
            <Image src={DefaultSearchAsset} boxSize={60} objectFit={"contain"}/>
            <Image src={FaqAsset} boxSize={60} objectFit={"contain"}/>
        </Center>

    )
}

export default FAQBanner;
