import { useRouteError } from 'react-router-dom';

import { Box, Image } from '@chakra-ui/react';

const ErrorPage = () => {
  const error = useRouteError();

  /**
   * Este mensaje de error, está pensado para los desarrolladores.
   * En un entorno de producción, no se debería mostrar este mensaje o almenos
   * no de esta forma.
   */
  console.error({
    status: error.status,
    statusText: error.statusText,
    message: error.message ? error.message : 'No message',
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Box>
        <h1>Oops!</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
        <Image src="https://i.pinimg.com/564x/24/ea/74/24ea74ca6e25174ec0a9b52795a390f3.jpg" alt="Error Image" />
      </Box>
    </Box>
  );
};

export default ErrorPage;