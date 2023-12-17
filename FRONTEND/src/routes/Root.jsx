import { Outlet } from 'react-router-dom';
import { Box,  Flex, Spacer, Switch, Image, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Root() {
  return (
      <PageRoot />
  );
}


function PageRoot() {
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();

  const handleImageClick = () => {
    navigate('/');
  };

  return (
    <nav>
      <Box bgColor={""}>
        <Flex align="center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Gobierno_de_Chile_Simplificado.svg"
            alt="Gobierno de chile"
            ml={50}
            boxSize="100px"
            onClick={handleImageClick}
          />
           <Image
            src="https://www.reddeproteccion.cl/js/theme/img/redproteccion/logos/logo-rps-claro.svg"
            alt="Red de proteccion social"
            ml={50}
            boxSize="100px"
            onClick={handleImageClick}
          />
          <Spacer />
          <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} size="lg" mr={50} />
        </Flex>
      </Box>
      <Outlet />
    </nav>
  );
}

export default Root;