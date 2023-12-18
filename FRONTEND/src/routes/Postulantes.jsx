import  { useState, useEffect } from 'react';
import {  Input, VStack, Button, Box, Link, Flex, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialog } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import { useBreakpointValue } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";


// Asumiendo que getPostulantesAprobados está importado de alguna parte


function Postulantes() {
    const [ postulantes, setPostulantes] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const inputWidth = useBreakpointValue({ base: "200px", md: "500px" });
    const tableFontSize = useBreakpointValue({ base: 'md', md: 'xl' });
    const [sortField, setSortField] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    const postulantesAprobados = postulantes.filter(postulante => postulante.aprobado_B).length;
    const [totalPostulantes, setTotalPostulantes] = useState(0);
    const porcentajeAprobados = ((postulantesAprobados / totalPostulantes) * 100).toFixed(2);
    const [ClickedName, setClickedName] = useState(false);
    const [ClickedRut, setClickedRut] = useState(false);
    const [ClickedFecha, setClickedFecha] = useState(false);
    const [showName, setShowName] = useState(true);
    const [showRut, setShowRut] = useState(true);
    const [showFecha, setShowFecha] = useState(true);
    const navigate = useNavigate();
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://146.83.198.35:1662/postulante/GET/aprobado');
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

        const fetchTotalPostulantes = async () => {
            try {
              const response = await fetch('http://146.83.198.35:1662/postulante/postulante');
              if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                  setTotalPostulantes(data.length);
                } else {
                  console.error('Endpoint did not return an array');
                }
              } else {
                console.error('Failed to fetch total postulantes');
              }
            } catch (error) {
              console.error('Failed to fetch total postulantes', error);
            }
          };

        fetchTotalPostulantes();
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
    
    const handleSort = (field) => {
        setSortField(field);
    };


    const filteredPostulantes = useMemo(() => {
    if (!search) {
        return postulantes;
        }
        return postulantes.filter((postulante) =>postulante.nombre.toLowerCase().includes(search.toLowerCase()) ||
    postulante.rut.toLowerCase().includes(search.toLowerCase()) ||
    postulante.fechaPostulacion.toLowerCase().includes(search.toLowerCase()) ||
    postulante.subsidio_E.toLowerCase().includes(search.toLowerCase()) ||
    (search.toLowerCase() === "aprobado" && postulante.aprobado_B) ||
    (search.toLowerCase() === "rechazado" && !postulante.aprobado_B)
    );
        }, [search, postulantes]);


    const sortedPostulantes = useMemo(() => {
        if (sortField === null) {
            return filteredPostulantes;
        }
        return [...filteredPostulantes].sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
        }, [sortField, filteredPostulantes]);


    const exportPDF = () => {
        const doc = new jsPDF();
        const table = document.getElementById('my-table');
        autoTable(doc, { html: table });
        doc.save('PostulantesAprobados.pdf');
        };

        const filtroNombre = () => {
            if(!ClickedName){
                setClickedName(true);
                setClickedRut(false);
                setClickedFecha(false);
                setShowName(true);
                setShowRut(false);
                setShowFecha(false);
            }else{
                setClickedName(false);
                setClickedRut(false);
                setClickedFecha(false);
                setShowName(true);
                setShowRut(true);
                setShowFecha(true);
            } 
        };
        const filtroRut = () => {
            if(!ClickedRut){
                setClickedRut(true);
                setClickedName(false);
                setClickedFecha(false);
                setShowName(false);
                setShowFecha(false);
                setShowRut(true);
            }else{
                setClickedRut(false);
                setClickedName(false);
                setClickedFecha(false);
                setShowName(true);
                setShowFecha(true);
                setShowRut(true);
            } 
        };
    
        const filtroFecha = () => {
            if(!ClickedFecha){
                setClickedFecha(true);
                setClickedName(false);
                setClickedRut(false);
                setShowRut(false);
                setShowName(false);
                setShowFecha(true);
            }else{
                setClickedFecha(false);
                setClickedName(false);
                setClickedRut(false);
                setShowRut(true);
                setShowName(true);
                setShowFecha(true);
            } 
        };


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

                <Flex>
                <Button size="sm" onClick={filtroNombre} marginTop="10px" marginRight="5px">
                    {ClickedName ? ' Mostrar todos los campos' : 'Mostrar por nombre'}
                </Button>
                <Button size="sm" onClick={filtroRut} marginTop="10px" marginRight="5px">
                    {ClickedRut ? 'Mostrar todos los campos' : ' Mostrar por RUT '}
                </Button>
                <Button size="sm" onClick={filtroFecha} marginTop="10px">
                    {ClickedFecha ? 'Mostrar todos los campos' : ' Mostrar por fecha '}
                </Button>
                <Button size="sm" colorScheme= "blue" marginTop="10px" marginLeft="5px" onClick={() => navigate("/postulantes")}>Ver Postulaciones</Button>
                </Flex>

                <Box marginTop="50px" maxWidth="100%" overflowX="auto">
                    <Table id="my-table" size="sm" variant="striped">
                        <Thead>
                            <Tr>
                               {showName && (
                                    <Th fontSize={tableFontSize}>
                                    <Button variant="link" onClick={() => handleSort('nombre')}>Nombre</Button>
                                    </Th>
                                )}
                                {showRut && (
                                    <Th fontSize={tableFontSize}>
                                    <Button variant="link" onClick={() => handleSort('rut')}>RUT</Button>
                                    </Th>
                                )}
                                {showFecha && (
                                    <Th fontSize={tableFontSize}>
                                    <Button variant="link" onClick={() => handleSort('fechaPostulacion')}>Fecha</Button>
                                    </Th>
                                )}
                                 <Th fontSize={tableFontSize}>
                                    <Button variant="link" onClick={() => handleSort('subsidio_E')}>Subsidio</Button>
                                </Th>
                                <Th fontSize={tableFontSize}>
                                    <Button variant="link" onClick={() => handleSort('aprobado_B')}>Estado</Button>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sortedPostulantes.map((postulante, index) => (
                                <Tr key={index}>
                                    {showName && <Td>{postulante.nombre}</Td>}
                                    {showRut && <Td>{postulante.rut}</Td>}
                                    {showFecha && <Td>{postulante.fechaPostulacion}</Td>}
                                    <Td>{postulante.subsidio_E}</Td>
                                    <Td>
                                        {postulante.aprobado_B ? "Aprobado" : "Rechazado"}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>
            <Flex justifyContent="center" alignItems="center">
                <Box marginTop="50px" display="flex" justifyContent="center">
                    <Link as={RouterLink} to="/">
                        <Button colorScheme="blue">Volver al inicio</Button>
                    </Link>
                    <Button colorScheme="blue" onClick={exportPDF} marginLeft={"100px"} >Generar PDF</Button>
                  
                    <Button colorScheme="blue" onClick={() => setIsOpen(true)} marginLeft={"100px"} >Ver estadísticas</Button>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Estadísticas de Postulantes
                            </AlertDialogHeader>

                            <AlertDialogBody>
                            El porcentaje de postulantes aprobados es {porcentajeAprobados}%.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cerrar
                            </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Box>
            </Flex>
        </Flex>
    );

}

export default Postulantes;