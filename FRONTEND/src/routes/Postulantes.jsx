import  { useState, useEffect } from 'react';
import { VStack, Input } from '@chakra-ui/react';
// Asumiendo que getPostulantesAprobados está importado de alguna parte
import { getPostulantesAprobados } from '../api';

function Postulantes() {
    const [postulantes, setPostulantes] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPostulantesAprobados();
            if (response.state === 'Success' && Array.isArray(response.data)) {
                setPostulantes(response.data);
            } else {
                console.error('getPostulantesAprobados did not return an array');
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
        postulante.status.name.toLowerCase().includes(search.toLowerCase()) ||
        new Date(postulante.dateSubmitted).toLocaleDateString().includes(search)
    );

    return (
        <div>
            <VStack>
                <Input placeholder="Busqueda de postulantes" value={search} onChange={handleSearchChange} />
                {filteredPostulantes.map((postulante, index) => (
                    <div key={index}>
                        <h2>{postulante.nombre}</h2>
                        <p>{postulante.rut}</p>
                        <p>{postulante.status.name}</p>
                        <p>{new Date(postulante.dateSubmitted).toLocaleDateString()}</p>
                    </div>
                ))}
            </VStack>
        </div>
    );
}

export default Postulantes;