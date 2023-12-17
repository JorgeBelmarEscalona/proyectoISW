import  { useState, useEffect } from 'react';
import {  Input, VStack, Button,  Heading, Box } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useBreakpointValue } from "@chakra-ui/react";


// Asumiendo que getPostulantesAprobados está importado de alguna parte


function Postulantes() {
    const [postulantes, setPostulantes] = useState([]);
    const [search, setSearch] = useState('');
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
        setSearch(event.target.value);
    };

    const filteredPostulantes = postulantes.filter(postulante => 
        postulante.nombre.toLowerCase().includes(search.toLowerCase()) ||
        postulante.rut.toLowerCase().includes(search.toLowerCase()) ||
        postulante.fechaPostulacion.toLowerCase().includes(search.toLowerCase()) ||
        postulante.subsidio_E.toLowerCase().includes(search.toLowerCase()) 

    );




    return (
        <div>
            <VStack>
                <Input
                    placeholder="Buscar postulantes"
                    value={search}
                    onChange={handleSearchChange}
                    mx={{ base: "10px", md: "100px" }}
                    width={inputWidth}
                    size="md"
                />
                <Box maxWidth="100%" overflowX="auto">
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
                <Link to="/">
                    <Button colorScheme="blue">Volver al inicio</Button>
                </Link>
            </VStack>
        </div>
    );

}

export default Postulantes;