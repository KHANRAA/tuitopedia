import {extendTheme, theme as defaultTheme} from '@chakra-ui/react';
import {withProse} from '@nikolovlazar/chakra-ui-prose'
import type { GlobalStyleProps} from "@chakra-ui/theme-tools";
import {mode} from '@chakra-ui/theme-tools';


const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
};
const theme = extendTheme({
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
        ...defaultTheme.colors,
        gray: {
            50: '#f9f9f9',
            100: '#ededed',
            200: '#d3d3d3',
            300: '#b3b3b3',
            400: '#a0a0a0',
            500: '#898989',
            600: '#6c6c6c',
            700: '#202020',
            800: '#121212',
            900: '#111'
        },
        defaultAccent: {
            50: '#e3f2fc',
            100: '#ddf2ff',
            200: '#abd2fc',
            300: '#5daafc',
            400: '#1a85ff',
            500: '#006be6',
            600: '#0053b4',
            700: '#003b82',
            800: '#002451',
            900: '#000d21'
        },
        accent: {
            // See src/components/Accent.tsx for CSS variable definition
            50: 'var(--colors-accent-50)',
            100: 'var(--colors-accent-100)',
            200: 'var(--colors-accent-200)',
            300: 'var(--colors-accent-300)',
            400: 'var(--colors-accent-400)',
            500: 'var(--colors-accent-500)',
            600: 'var(--colors-accent-600)',
            700: 'var(--colors-accent-700)',
            800: 'var(--colors-accent-800)',
            900: 'var(--colors-accent-900)'
        }
    },
    shadows: {
        largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
    },
    styles: {
        global: (props: GlobalStyleProps) => ({
            body: {
                fontFamily: 'body',
                color: mode('gray.800', 'whiteAlpha.900')(props),
                bg: mode('white', 'gray.800')(props),
                lineHeight: 'tall',
            },
            '*::placeholder': {
                color: mode('gray.400', 'whiteAlpha.400')(props),
            },
            '*, *::before, &::after': {
                borderColor: mode('gray.200', 'whiteAlpha.300')(props),
                wordWrap: 'break-word',
            }, '.mdx-prose': {
                h1: {
                    fontSize: 'xl',
                    mb: '4',
                },
                p: {
                    fontSize: 'sm',
                    lineHeight: '1.4',
                },
            },
        }),
    },
}, withProse({
    baseStyle: {
        h2: {
            fontWeight: 'light',
        },
    },
}),);

export default theme;
