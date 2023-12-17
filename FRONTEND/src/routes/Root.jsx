import { Outlet } from 'react-router-dom';
import { Box,  Flex, Spacer, Switch, Image, useColorMode } from '@chakra-ui/react';


function Root() {
  return (
      <PageRoot />
  );
}

function PageRoot() {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <Box bgColor={""}>
        <Flex align="center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Gobierno_de_Chile_Simplificado.svg"
            alt="Gobierno de chile"
            ml={50}
            boxSize="100px"
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