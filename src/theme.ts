import {extendTheme} from '@chakra-ui/react';
import {withProse} from '@nikolovlazar/chakra-ui-prose'

const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
};
const theme = extendTheme({
    // fonts: {
    //     heading: `'Open Sans', sans-serif`,
    //     body: `'Raleway', sans-serif`,
    // },
    initialColorMode: 'light',
    useSystemColorMode: false,
    components: {
        Form: {
            variants: {
                floating: {
                    container: {
                        _focusWithin: {
                            label: {
                                ...activeLabelStyles
                            }
                        },
                        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                            ...activeLabelStyles
                        },
                        label: {
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            position: "absolute",
                            backgroundColor: "white",
                            textColor: "black",
                            pointerEvents: "none",
                            mx: 3,
                            px: 1,
                            my: 2,
                            transformOrigin: "left top"
                        }
                    }
                }
            }
        }
    },
    colors: {
        discord: '#7289da',
    },
    shadows: {
        largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
    },
    styles: {
        global: {
            html: {
                scrollBehavior: 'smooth',
            },
            body: {
                minHeight: '100vh',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
            },
            '.body': {

                overflowY: 'scroll',
            },
        },
    },
}, withProse({
    baseStyle: {
        h2: {
            fontWeight: 'light',
        },
    },
}),);

export default theme;
