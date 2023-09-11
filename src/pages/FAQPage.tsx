import {Grid, GridItem, Box} from '@chakra-ui/react';
import FaqCategories from "../components/SideBar/FaqCategories";
import FAQContainer from "../components/FAQContainer/FAQContainer";
import FAQBanner from "../components/FAQContainer/FAQBanner";

const HomePage = () => {
    return (
        <Grid templateAreas={{
            base: `"main"`,
            lg: `"main"`

        }}
              templateColumns={{
                  lg: `1fr`
              }}
              gap='1'
        >
            <GridItem area="main">
                <Box paddingLeft={5} paddingEnd={5}>
                    <FAQBanner/>
                    <FAQContainer/>
                </Box>
            </GridItem>
        </Grid>


    )
}

export default HomePage;
