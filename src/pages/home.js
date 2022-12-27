import React from 'react'
import { Box, Button, Center, Divider, Heading, Img, SimpleGrid, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { FaArrowRight, FaFileSignature, FaHandsHelping, FaHeadset } from 'react-icons/fa'
import { Feature } from '../chakra'
// import { ColorModeSwitcher } from '../components/color-mode-switcher/color-mode-switcher'
const Home = () => {
  const navigate = useNavigate();
  return (

    <Box 
      id="home"
      as="section" 
      bg="brand.base" 
      p="2"
    >
      <Box 
        maxW={['xl','5xl']} 
        mx="auto" 
      >
        <Stack 
          p={["2", "4"]} 
          m="auto" 
          spacing={['2', '4', '4']} 
          direction={['column', 'column', 'row']}
        >
          <Box maxW={{ lg: 'lg' }}>
            <Heading
              size="xl"
              mt={["2", "2", "4"]}
              fontWeight="extrabold"
              letterSpacing="normal"
              lineHeight="2rem"
            >
              Can't get enough boxing?
            </Heading>
            <Heading>
              Here you go.
            </Heading>

            <Text 
              lineHeight="1.4rem"
              fontSize="lg" 
              mt="1" 
              pr="4"
              color='fsl-body-text'
              maxW={["85%", "60%", "80%"]}
            >
              Score fights and compete with other boxing fans. Play with a group- live and in real-time!
            </Text>
            <Button
              onClick={() => navigate('/learn-more')}
              className="group"
              mt={["4"]}
              mb="2"
              size={["lg", "lg"]}
              px="8"
              fontSize="1.2rem"
              fontWeight="bold"
              h="14"
              // bg="brand.100"
              iconSpacing="3"
              colorScheme="solid"
              rightIcon={
                <Box
                  as={FaArrowRight}
                  fontSize="1.2rem"
                  transition="transform 0.2s"
                  _groupHover={{ transform: 'translateX(2px)' }}
                />
              }
            >
              Learn more
            </Button>
          </Box>
          <Center 
            flex="1 0 60%" 
            shadow="lg" 
            maxW={{ lg: 'xl' }}
          >
            <Img
              borderRadius="5"
              objectFit="cover"
              w="full"
              h="full"
              htmlWidth="576px"
              htmlHeight="420px"
              src="home_page_2.jpg"
              alt="Person on phone scoring a fight"
            />
          </Center>
        </Stack>
        <Divider my={["8"]} 
          opacity={1} 
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '12', md: '8' }}>
          <Feature title="Score Fights" icon={<FaHandsHelping />}>
            Create a group and score fights together- live and in real time!
          </Feature>
          <Feature title="Win Prizes" icon={<FaHeadset />}>
            Win prizes for making correct pre-fight and in-fight predictions.
          </Feature>
          <Feature title="Contribute" icon={<FaFileSignature />}>
            Score fights and contribute to real-time, crowd-sourced boxing analytics. 
          </Feature>
        </SimpleGrid>
      </Box>
    </Box>
  )
}
export default Home