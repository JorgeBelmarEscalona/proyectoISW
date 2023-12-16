import  { useState, useEffect } from 'react';
import {  Input, VStack, Button,  Heading } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link } from 'react-router-dom';


// Asumiendo que getPostulantesAprobados está importado de alguna parte


function Postulantes() {
    const [postulantes, setPostulantes] = useState([]);
    const [search, setSearch] = useState('');


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
            <Input placeholder="Buscar postulantes" value={search} onChange={handleSearchChange} />
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>RUT</Th>
                        <Th>Fecha de Postulación</Th>
                        <Th>Subsidio E</Th>
                        <Th>Estado</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredPostulantes.map((postulante, index) => (
                        <Tr key={index}>
                            <Td><Heading fontSize='xl'>{postulante.nombre}</Heading></Td>
                            <Td>{postulante.rut}</Td>
                            <Td>{postulante.fechaPostulacion}</Td>
                            <Td>{postulante.subsidio_E}</Td>
                            <Td><Heading fontSize='xl'>{"Aprobado"}</Heading></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Link to="/">
                <Button colorScheme="blue">Volver al inicio</Button>
            </Link>
        </VStack>
    </div>
    );
}

export default Postulantes;