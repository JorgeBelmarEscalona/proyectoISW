 const crearPostulante = async (postulante) => {
    console.log("postulante",postulante);
    try {
        const response = await fetch('http://146.83.198.35:1662/postulante/postulante/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postulante),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
  };

  export default crearPostulante