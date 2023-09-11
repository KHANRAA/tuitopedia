import {useState} from 'react';
import {
    chakra,
    Container,
    HStack,
    VStack,
    Text,
    Tag,
    Image,
    useColorModeValue, useToast
} from '@chakra-ui/react';
import {useAllFaq} from "../../hooks/useFAQs";
import Faq from "../../entities/faq";
import {Prose} from '@nikolovlazar/chakra-ui-prose'
import Parser from 'html-react-parser';
import FAQSkeleton from "./FAQSkeleton";
import FaqCategories from "../SideBar/FaqCategories";

const FAQContainer = () => {
    const textColor = useColorModeValue('gray.500', 'gray.200');
    const [isOpen, setIsOpen] = useState(false);
    const {data, isLoading, isError, error} = useAllFaq();

    const toggleOpen = () => setIsOpen(!isOpen);
    if (isError) {
        // todo add toast
    }

    return (
        <>
            {isLoading && (<FAQSkeleton/>)}
            {!isLoading && (<>
                <FaqCategories data={data?.data} isLoading={isLoading}/>
                <Container maxW="6xl" p={{base: 5, md: 5}}>
                    <VStack spacing={8}>
                        {data?.data.map((eachFaq: Faq) => (
                            <chakra.div onClick={toggleOpen} key={eachFaq.id}>
                                <HStack
                                    p={4}
                                    rounded="xl"
                                    borderWidth="1px"
                                    textAlign="left"
                                    align="start"
                                    spacing={4}
                                    cursor="pointer"
                                    _hover={{shadow: 'lg'}}
                                >
                                    <VStack align="start" justify="flex-start">
                                        <VStack spacing={1} align="start">
                                            <HStack justifyContent="space-between">
                                                <Image
                                                    src={eachFaq.imageUrl}
                                                    width={33}
                                                    height={33}
                                                    rounded="md"
                                                    objectFit="cover"
                                                    alt="cover image"
                                                />
                                                <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                                                    {eachFaq.title}
                                                </Text>
                                                <HStack spacing="1">
                                                    <Tag key={eachFaq.category} size="sm" colorScheme="gray">
                                                        {eachFaq.category}
                                                    </Tag>
                                                </HStack>
                                            </HStack>

                                            {!isOpen && (
                                                <Prose fontSize="sm" color={textColor} noOfLines={{base: 3}}
                                                       dangerouslySetInnerHTML={{__html: Parser(eachFaq.content).toString()}}/>
                                            )}

                                            {isOpen && (
                                                <Prose fontSize="sm" color={textColor}
                                                       dangerouslySetInnerHTML={{__html: Parser(eachFaq.content).toString()}}/>
                                            )}
                                        </VStack>
                                    </VStack>
                                </HStack>
                            </chakra.div>
                        ))}
                    </VStack>
                </Container></>)}
        </>
    );
};

export default FAQContainer;
