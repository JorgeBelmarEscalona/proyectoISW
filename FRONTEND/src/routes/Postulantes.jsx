import  { useState, useEffect } from 'react';
import {  Input, VStack, Button,  Heading, Box, Link, Flex } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { useBreakpointValue } from "@chakra-ui/react";


// Asumiendo que getPostulantesAprobados está importado de alguna parte


function Postulantes() {
    const [postulantes, setPostulantes] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const inputWidth = useBreakpointValue({ base: "200px", md: "500px" });
    const tableFontSize = useBreakpointValue({ base: 'md', md: 'xl' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/postulante/GET/aprobado');
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setPostulantes(data);
                    } else {
                        console.error('getPostulantesAprobados did not return an array');
                    }
                } else {
                    console.error('Failed to fetch postulantes');
                }
            } catch (error) {
                console.error('An error occurred while fetching postulantes:', error);
            }
        };
    
        fetchData();
    }, []);


    const handleSearchChange = (event) => {
        const value = event.target.value;
        if (/[^\w\s]/gi.test(value)) {
            setError(true);
        } else {
            setError(false);
        }
        setSearch(value);
    };

    const filteredPostulantes = postulantes.filter(postulante => 
        postulante.nombre.toLowerCase().includes(search.toLowerCase()) ||
        postulante.rut.toLowerCase().includes(search.toLowerCase()) ||
        postulante.fechaPostulacion.toLowerCase().includes(search.toLowerCase()) ||
        postulante.subsidio_E.toLowerCase().includes(search.toLowerCase()) 

    );




    return (
        <Flex direction="column" minHeight="100vh">
            <VStack>
                <Input
                    variant="filled"
                    marginTop="50px"
                    placeholder="Buscar postulante"
                    value={search}
                    onInput={handleSearchChange}
                    mx={{ base: "10px", md: "1500px" }}
                    width={inputWidth}
                    size="md"
                    borderColor={error ? 'crimson' : undefined}
                />
                <Box marginTop="50px" maxWidth="100%" overflowX="auto">
                    <Table size="sm" variant="striped">
                        <Thead>
                            <Tr>
                                <Th fontSize={tableFontSize}>Nombre</Th>
                                <Th fontSize={tableFontSize}>RUT</Th>
                                <Th fontSize={tableFontSize}>Fecha de Postulación</Th>
                                <Th fontSize={tableFontSize}>Subsidio E</Th>
                                <Th fontSize={tableFontSize}>Estado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredPostulantes.map((postulante, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <Heading fontSize={tableFontSize}>{postulante.nombre}</Heading>
                                    </Td>
                                    <Td>{postulante.rut}</Td>
                                    <Td>{postulante.fechaPostulacion}</Td>
                                    <Td>{postulante.subsidio_E}</Td>
                                    <Td>
                                        <Heading fontSize={tableFontSize}>{"Aprobado"}</Heading>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>
            <Flex justifyContent="center" alignItems="center">
                <Box marginTop="50px">
                    <Link as={RouterLink} to="/">
                        <Button colorScheme="blue">Volver al inicio</Button>
                    </Link>
                </Box>
            </Flex>
        </Flex>
    );

}

export default Postulantes;