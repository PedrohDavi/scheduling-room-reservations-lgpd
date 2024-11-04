import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useRef } from "react";

export function CadastroUsuario(){

    const nome = useRef<HTMLInputElement>(null);
    const data_nascimento = useRef<HTMLInputElement>(null);
    const doc_cpf = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const usuario = useRef<HTMLInputElement>(null);
    const senha = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se todas as referências não são nulas antes de acessar os valores
        if (
            nome.current &&
            data_nascimento.current &&
            doc_cpf.current &&
            email.current &&
            usuario.current &&
            senha.current
        ) {
            const dadosUsuario = {
                nome: nome.current.value,
                data_nascimento: data_nascimento.current.value,
                doc_cpf: doc_cpf.current.value,
                email: email.current.value,
                usuario: usuario.current.value,
                senha: senha.current.value,
            };

            try {
                const req = await axios.post("http://localhost:8800/addUsuario", dadosUsuario);
                
                // Limpar os campos após a submissão
                nome.current.value = "";
                data_nascimento.current.value = "";
                doc_cpf.current.value = "";
                email.current.value = "";
                usuario.current.value = "";
                senha.current.value = "";
            } catch (error) {
                console.log("Erro ao cadastrar usuário: ", error);
            }
        } else {
            console.error("Algum campo está nulo.");
        }
    };

    return(

        <Flex
            justifyContent='center'
            alignItems='center'
            w='100%'
            h='100vh'>
            <Flex
                bg='#07012C'
                w='60rem'
                borderRadius='2rem'
                boxShadow='4px 5px 4px 0px rgba(0, 0, 0, 0.50)'
                direction='column'
                alignItems='center'
                justifyContent='center'
                p='2rem'>
                <Flex
                    h='20%'
                    justifyContent='center'
                    alignItems='center'>
                    <Heading>Cadastro de Usuario</Heading>
                </Flex>
                <Box
                    h='80%'
                    w='100%'>
                    <form onSubmit={handleSubmit}>
                        <Box
                            mb='2rem'>
                            <FormControl isRequired>
                                <FormLabel>Nome completo</FormLabel>
                                <Input ref={nome} type='text' />
                            </FormControl>
                        </Box>

                        <Box
                            mb='2rem'>
                            <FormControl isRequired>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <Input ref={data_nascimento} type='date' />
                            </FormControl>
                        </Box>

                        <Box
                            mb='2rem'>
                            <FormControl isRequired>
                                <FormLabel>CPF</FormLabel>
                                <Input ref={doc_cpf} type='text' />
                            </FormControl>
                        </Box>

                        <Flex
                            gap='2rem'>
                            <Box
                                mb='2rem'>
                                <FormControl isRequired>
                                    <FormLabel>E-mail</FormLabel>
                                    <Input ref={email} type='email' />
                                </FormControl>
                            </Box>
                            <Box
                                mb='2rem'>
                                <FormControl isRequired>
                                    <FormLabel>Nome de Usuário</FormLabel>
                                    <Input ref={usuario} type='text' />
                                </FormControl>
                            </Box>
                            <Box
                                mb='2rem'>
                                <FormControl isRequired>
                                    <FormLabel>Senha</FormLabel>
                                    <Input ref={senha} type='password' />
                                </FormControl>
                            </Box>
                        </Flex>

                        <Flex
                            justifyContent='center'
                            alignItems='center'>
                            <Button
                                mt={4}
                                colorScheme='blue'
                                type='submit'>
                                Cadastrar
                            </Button>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </Flex>

    )

}