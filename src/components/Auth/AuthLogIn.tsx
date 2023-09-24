import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useToast,
    Text,
    Link as ReactLink,
    useColorModeValue, Container, FormErrorMessage, InputRightElement, InputGroup, FormHelperText,
} from "@chakra-ui/react";
import {useState} from "react";
import {AxiosError} from "axios";
import z from "zod";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSignIn} from "../../hooks/useAuth";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";


const signInSchema = z.object({
    email: z.string().email().min(5),
    password: z
        .string()
        .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
        .regex(new RegExp(".*[a-z].*"), "One lowercase character")
        .regex(new RegExp(".*\\d.*"), "One number")
        .regex(
            new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
            "One special character"
        ).min(6, {message: "Password must be at least 6 characters"}),
}).required();

type SignInData = z.infer<typeof signInSchema>;

const AuthLogin = () => {
    const toast = useToast();

    const [showPassword, setShowPassword] = useState(false);
    const {register, formState: {errors, isDirty, isValid}, handleSubmit} = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
        mode: 'onChange'
    },)
    const {mutate, isLoading, isError, error} = useSignIn();
    const onSubmit: SubmitHandler<SignInData> = (values) => {
        mutate({data: {...values, returnSecureToken: true}});
        if (isError && error instanceof AxiosError) {
            toast({
                title: 'Something went wrong while Signing In ',
                description: error.response?.data?.data.message || 'Something unexpected ...',
                status: 'error',
                position: 'bottom-right',
                duration: 3000,
                isClosable: true,
            })
        }

    }

    return (
        <Flex
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Start a journey with us</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Container as="form" method='post' onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl variant="floating" id="email" isInvalid={!!errors.email}>
                                <Input type="email" {...register('email')} placeholder=" "/>
                                <FormLabel backgroundColor={useColorModeValue('white', 'gray.700')}>Email
                                    address</FormLabel>
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl variant="floating" id="password" isInvalid={!!errors.password}>

                                <InputGroup>
                                    <Input id="password"  {...register("password")}
                                           type={showPassword ? 'text' : 'password'} placeholder=" "/>
                                    <FormLabel
                                        backgroundColor={useColorModeValue('white', 'gray.700')}>Password</FormLabel>
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                        </Button>
                                    </InputRightElement>

                                </InputGroup>
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>

                            <Stack spacing={10}>
                                <Button
                                    type="submit"
                                    colorScheme='teal'
                                    isLoading={isLoading}
                                    isDisabled={!isValid}
                                    color={'white'}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    First time here ? <ReactLink color={'blue.400'} href={'?mode=signup'}>Sign Up
                                </ReactLink>
                                </Text>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Stack>
        </Flex>
    )


}

export default AuthLogin;
