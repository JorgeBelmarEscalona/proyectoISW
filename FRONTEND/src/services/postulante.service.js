import axios from "./root.service";

export const getPostulanteAprobado = async () => {
    try {
        const response = await axios.get('postulantesA/');
        const { status, data } = response;
        console.log(data); // Log the data to see what the server is returning
        if (status === 200 && Array.isArray(data.data)) {
            return { state: 'Success', data: data.data };
        } else {
            console.error('Server did not return an array');
            return { state: 'Error' };
        }
    } catch (error) {
        console.error(error);
        return { state: 'Error' };
    }
};
