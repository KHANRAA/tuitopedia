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
import useCategoriesStore from "../../store/categoriesStore";
import useUserStore from "../../store/userStore";

const FAQContainer = () => {
    const textColor = useColorModeValue('gray.500', 'gray.200');
    const [isOpen, setIsOpen] = useState(false);
    const [opedId, setOpenid] = useState('');
    const [selectedCategory, setCategory] = useState('');
    const {data, isLoading, isError, error} = useAllFaq();
    const {addFaq, removeFaq, faqs} = useFaqStore();
    const {category} = useCategoryStore();
    const {setCategories} = useCategoriesStore();
    const {user} = useUserStore();
    useEffect(() => {
        if (data && data.data) {
            addFaq(data?.data);
            // eslint-disable-next-line array-callback-return
            data?.data.map((eachFaq) => {
                setCategories(eachFaq.category)
            })
        }
        setCategory(category);
    }, [data, addFaq, removeFaq, category]);


    const toggleOpen = (faqId: string) => {
        setIsOpen(!isOpen);
        setOpenid(faqId)
    };
    return (
        <>
            {(isLoading || faqs.length === 0) && (<FAQSkeleton/>)}
            {!isLoading && (<>
                <FaqCategories/>
                <Container maxW="8xl" p={{base: 5, md: 5}}>
                    <VStack spacing={8}>
                        {faqs.map((eachFaq: Faq) => (
                            <chakra.div onClick={() => toggleOpen(eachFaq.id)} key={eachFaq.id} width="90%">
                                <Box hidden={category !== '' && eachFaq.category !== selectedCategory}>
                                    <HStack
                                        p={4}
                                        rounded="xl"
                                        borderWidth="2px"
                                        textAlign="left"
                                        align="start"
                                        spacing={4}
                                        cursor="pointer"
                                        _hover={{shadow: 'lg'}}
                                    >
                                        <VStack align="start" justify="flex-start">
                                            <VStack spacing={1} align="start">
                                                <HStack justifyContent={'space-between'}>
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
                                                    <Tag key={eachFaq.category} size="sm" colorScheme="gray">
                                                        {eachFaq.category}
                                                    </Tag>
                                                    <Tag key={eachFaq.category + '_admin'} size="sm" colorScheme="red"
                                                         hidden={!user || !user.isAdmin || eachFaq.isActive}>
                                                        Admin Only
                                                    </Tag>
                                                </HStack>

                                                {!isOpen && (
                                                    <Prose fontSize="sm" color={textColor} noOfLines={{base: 3}}
                                                           dangerouslySetInnerHTML={{__html: Parser(eachFaq.content).toString()}}/>
                                                )}

                                                {isOpen && opedId === eachFaq.id && (
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
