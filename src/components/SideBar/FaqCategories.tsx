import {
    Icon,
    HStack,
    Text,
    Tabs,
    TabList,
    Tab,
} from "@chakra-ui/react";
import {AiOutlineCloudServer} from 'react-icons/ai';
import {BiDesktop} from 'react-icons/bi';
import {GiSpiderWeb} from 'react-icons/gi';
import useFaqStore from "../../store/faqStore";
import useCategoryStore from "../../store/categoryStore";
import useCategoriesStore from "../../store/categoriesStore";

const FaqCategories = () => {
    const {faqs} = useFaqStore();

    const {setCategory} = useCategoryStore();
    const {categories} = useCategoriesStore();
    const getCategoryIcon = (name: string) => {
        switch (name) {
            case 'Quickbooks':
                return BiDesktop;
            case 'question3':
                return AiOutlineCloudServer;
            default:
                return GiSpiderWeb;
        }
    }

    return (

        <Tabs variant="soft-rounded" colorScheme="blue" align="center" w="100%">
            <TabList display="flex" flexWrap="wrap" p={4}>
                {faqs && faqs.length >= 1 && (<Tab
                    bg={'gray.100'} _dark={{bg: 'grey.800', color: 'grey.500'}}
                    color={'gray.600'}
                    _selected={{
                        color: 'white',
                        bg: 'teal'
                    }}
                    mr={2}
                    mt={2}
                    key={'all'}>
                    <HStack spacing={1} onClick={() => setCategory('')}>
                        <Icon as={getCategoryIcon('')}/>
                        <Text>All</Text>
                    </HStack>
                </Tab>)}

                {categories?.map((eachCategory) => (
                    <Tab
                        bg={'gray.100'} _dark={{bg: 'grey.800', color: 'grey.500'}}
                        color={'gray.600'}
                        _selected={{
                            color: 'white',
                            bg: 'teal'
                        }}
                        mr={2}
                        mt={2}
                        key={eachCategory}>
                        <HStack spacing={1} onClick={() => setCategory(eachCategory)}>
                            <Icon as={getCategoryIcon(eachCategory)}/>
                            <Text>{eachCategory}</Text>
                        </HStack>
                    </Tab>
                ))}
            </TabList>
        </Tabs>


    )

}

export default FaqCategories;
