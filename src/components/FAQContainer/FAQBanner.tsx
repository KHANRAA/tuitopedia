import {Center, Image} from "@chakra-ui/react";
import DefaultSearchAsset from "../../assets/business-discussion.png";
import FaqAsset from "../../assets/question.svg"
import useFaqStore from "../../store/faqStore";

const FAQBanner = () => {
    const {faqs} = useFaqStore();
    return (

        <Center>
            <Image hidden={faqs.length !== 0} src={FaqAsset} boxSize={80} objectFit={"contain"}/>
            <Image hidden={faqs.length === 0} src={DefaultSearchAsset} boxSize={80} objectFit={"contain"}/>
        </Center>

    )
}

export default FAQBanner;
