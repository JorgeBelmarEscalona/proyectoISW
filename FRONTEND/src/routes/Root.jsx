import { Outlet } from 'react-router-dom';
import { Box, Button, Container, Heading, Text, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';

function Root() {
  return (
      <PageRoot />
  );
}

function PageRoot() {

  const [showDetails, setShowDetails] = useState(false);

  return (
    <nav>
      <Container>
      <Box bgColor={""}>
        <Flex align="center">
          <Heading color={""}>Subsidio</Heading>
          <IconButton 
            icon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />} 
            onClick={() => setShowDetails(!showDetails)}
          />
        </Flex>
        {showDetails && (
          <Box mt={2}>
            <Flex align="center">
              <Text>Soy un Texto de prueba</Text>
              <Spacer />
              <Button >Boton generico</Button>
            </Flex>
          </Box>
        )}
      </Box>
      </Container>
      <Outlet />
    </nav>
  );
}

export default Root;