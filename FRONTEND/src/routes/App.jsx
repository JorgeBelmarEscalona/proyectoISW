import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Image } from "@chakra-ui/react";


function App() {
  const navigate = useNavigate();

  return (
    <Center h="100vh">
      <Flex direction="column" justify="center" align="center" maxWidth="400px" margin="0 auto">
        <Box textAlign="center">
          <Image src="https://www.reddeproteccion.cl/js/theme/img/home/family.svg" alt="Logo" marginTop="10px" />
          <Heading mb={4}>¡Postula Ahora!</Heading>
          <Flex justify="center">
            <Button colorScheme="blue" borderRadius="md" onClick={() => navigate("/postular")}>
              Postular
            </Button>
            <Button marginLeft={"10px"} borderRadius="md" onClick={() => navigate("/postulantesA")}>
              Ver Postulaciones Aprobadas
            </Button>
            <Button marginLeft={"10px"} borderRadius="md" onClick={() => navigate("/postulantes")}>
              Ver Postulaciones
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
}

export default App;