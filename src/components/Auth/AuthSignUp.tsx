import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    InputGroup,
    HStack,
    Link as ReactLink,
    InputRightElement,
    FormErrorMessage,
    useColorModeValue, Container, useToast,
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useState} from "react";
import {z} from 'zod';
import {AxiosError} from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAuthSignUp} from "../../hooks/useAuth";

const formSchema = z.object({
    firstName: z.string().min(2, {message: "First name is required."}).max(30),
    lastName: z.string().min(2, {message: "Last name is required."}).max(60),
    email: z.string().email({message: "Email is required."}).min(5, {message: "Email is required."}),
    password: z
        .string()
        .min(6, {message: "Password must be at least 6 characters"}),
    passwordConfirmation: z
        .string()
        .min(1, {message: "You must confirm your password"}),


}).refine(
    ({password, passwordConfirmation}) => password === passwordConfirmation,
    {
        message: "Passwords must match",
        path: ["passwordConfirmation"],
    }
);

type FormValues = z.infer<typeof formSchema>;
const Auth = () => {
    const toast = useToast();

    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    });
    const {mutate, isLoading, isError, error} = useAuthSignUp();


    const onSubmit: SubmitHandler<FormValues> = (values) => {
        console.log(values);
        const userData: any = {};
        userData.name = values.firstName + ' ' + values.lastName;
        userData.email = values.email;
        userData.password = values.passwordConfirmation;
        userData.returnSecureToken = true;


        mutate({data: userData});
        if (isError && error instanceof AxiosError) {
            console.log(error);
            toast({
                title: 'Something went wrong ',
                description: error.response?.data.data.message || 'Something unexpected ...',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }

    };
    return (


        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={1}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Sign up
                </Heading>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Container as="form" method='post' onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>

                        <HStack>

                                <FormControl variant="floating" id="firstName" isInvalid={!!errors.firstName}>

                                    <Input id="firstName" {...register("firstName")} placeholder="First Name" type="text"/>
                                    <FormLabel>First Name</FormLabel>
                                    <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                                </FormControl>


                                <FormControl variant="floating" id="lastName" isInvalid={!!errors.lastName}>

                                    <Input id="lastName" {...register("lastName")} placeholder="Last Name" type="text"/>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                                </FormControl>

                        </HStack>
                        <FormControl variant="floating" id="email" isInvalid={!!errors.email}>

                            <Input id="email" {...register("email")} placeholder="Email" type="email"/>
                            <FormLabel>Email address</FormLabel>
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl variant="floating" id="password" isInvalid={!!errors.password}>

                            <InputGroup>
                                <Input id="password"  {...register("password")}
                                       type={showPassword ? 'text' : 'password'}
                                       placeholder="********"/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                                <FormLabel>Password</FormLabel>

                            </InputGroup>
                            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl variant="floating" id="passwordConfirmation"
                                     isInvalid={!!errors.passwordConfirmation}>

                            <InputGroup>
                                <Input id="passwordConfirmation" placeholder="********"
                                       type="password"
                                       {...register("passwordConfirmation")}/>

                            </InputGroup>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormErrorMessage>{errors.passwordConfirmation?.message}</FormErrorMessage>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>

                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <ReactLink color={'green.400'}
                                                           href={'?mode=login'}>Login</ReactLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Stack>

    )


}
export default Auth;