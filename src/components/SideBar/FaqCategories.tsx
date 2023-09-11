import {useState} from "react";
import {
    Icon,
    HStack,
    Text,
    Tabs,
    TabList,
    Tab,
    useColorModeValue,
    Container
} from "@chakra-ui/react";
import {AiTwotoneThunderbolt, AiOutlineCloudServer} from 'react-icons/ai';
import {BiDesktop} from 'react-icons/bi';
import {GiSpiderWeb} from 'react-icons/gi';

const FaqCategories = () => {
    const tabList = [
        {
            name: 'All',
            filterName: '',
            icon: AiTwotoneThunderbolt
        },
        {
            name: 'Web Development',
            filterName: 'development',
            icon: BiDesktop
        },
        {
            name: 'Web Design',
            filterName: 'design',
            icon: GiSpiderWeb
        },
        {
            name: 'Devops',
            filterName: 'devops',
            icon: AiOutlineCloudServer
        }
    ];

    const [isLoading, setIsLoading] = useState(true);
    const items: string[] = ["Product", "Pricing", "Content"];
    return (

        <Tabs variant="soft-rounded" colorScheme="blue" align="center" w="100%">
            <TabList display="flex" flexWrap="wrap" p={4}>
                {tabList.map((tab, index) => (
                    <Tab
                        bg={'gray.100'} _dark={{bg: 'grey.800', color: 'grey.500'}}
                        color={'gray.600'}
                        _selected={{
                            color: 'white',
                            bg: 'teal'
                        }}
                        mr={2}
                        mt={2}
                        key={index}>
                        <HStack spacing={1}>
                            <Icon as={tab.icon}/>
                            <Text>{tab.name}</Text>
                        </HStack>
                    </Tab>
                ))}
            </TabList>
        </Tabs>


    )

}

export default FaqCategories;
