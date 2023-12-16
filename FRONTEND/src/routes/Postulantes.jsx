import { useState, useEffect } from 'react';
import { getPostulanteAprobado } from "../services/postulante.service.js";
import { Badge, Box, Button, Heading, Input, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


const Forms = () => {
    const [forms, setForms] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPostulanteAprobado();
            if (response.state === 'Success' && Array.isArray(response.data)) {
                setForms(response.data);
            } else {
                console.error('getForms did not return an array');
            }
        };

        fetchData();
    }, []);

  

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredForms = forms.filter(form => 
        form.nombre.toLowerCase().includes(search.toLowerCase()) ||
        form.rut.toLowerCase().includes(search.toLowerCase()) ||
        form.status.name.toLowerCase().includes(search.toLowerCase()) ||
        new Date(form.dateSubmitted).toLocaleDateString().includes(search)
    );

    return (
        <div>
            <VStack>
            <Input placeholder="Busqueda de postulantes" value={search} onChange={handleSearchChange} />
            <Box>
                {filteredForms.map((form, index) => (
                <div key={index}>
                    <Box>
                    <Heading>{form.rut}</Heading>
                    <p>{form.nombre}</p>
                    <Badge colorScheme="blue">Estado: {form.status.name}</Badge>
                  
                    </Box>
                </div>
            ))}
            </Box>
            <Button onClick={(()=> navigate('/'))}>volver al inicio</Button>
            </VStack>
        </div>
    );
};

export default Forms;