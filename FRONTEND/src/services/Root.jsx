import axios from 'axios';

import  { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Función para realizar la consulta
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/postulante/GET/aprobado');
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llamada a la función para realizar la consulta cuando el componente se monta
    fetchData();
  }, []);

  return (
    <div>
      <h1>Datos:</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
