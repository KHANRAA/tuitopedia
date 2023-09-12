import {useEffect, useState} from 'react';
import {
    chakra,
    Container,
    HStack,
    Box,
    VStack,
    Text,
    Tag,
    Image,
    useColorModeValue
} from '@chakra-ui/react';
import {useAllFaq} from "../../hooks/useFAQs";
import Faq from "../../entities/faq";
import {Prose} from '@nikolovlazar/chakra-ui-prose'
import Parser from 'html-react-parser';
import FAQSkeleton from "./FAQSkeleton";
import FaqCategories from "../SideBar/FaqCategories";
import useFaqStore from "../../store/faqStore";
import useCategoryStore from "../../store/categoryStore";

const FAQContainer = () => {
    const textColor = useColorModeValue('gray.500', 'gray.200');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setCategory] = useState('');
    const {data, isLoading, isError, error} = useAllFaq();
    const {addFaq, removeFaq, faqs} = useFaqStore();
    const {category} = useCategoryStore();

    useEffect(() => {
        if (data && data.data) {
            addFaq(data?.data);
        }
        setCategory(category);
    }, [data, addFaq, removeFaq, category]);


    const toggleOpen = () => setIsOpen(!isOpen);
    if (isError) {
        // todo add toast
    }
    return (
        <>
            {isLoading && (<FAQSkeleton/>)}
            {!isLoading && (<>
                <FaqCategories/>
                <Container maxW="6xl" p={{base: 5, md: 5}}>
                    <VStack spacing={8}>
                        {faqs.map((eachFaq: Faq) => (
                            <chakra.div onClick={toggleOpen} key={eachFaq.id}>
                                <Box hidden={category !== '' && eachFaq.category !== selectedCategory}>
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
                                </Box>
                            </chakra.div>
                        ))}
                    </VStack>
                </Container></>)}
        </>
    );
};

export default FAQContainer;
