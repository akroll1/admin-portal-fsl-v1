import { 
    Avatar, 
    Center, 
    Flex, 
    Heading, 
    useToast 
} from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'

export const FighterSelectionSwipe = ({ 
    fighter,
    handleFighterSelect,
    selectedFighter,
}) => {

    const handleSelect = e => {
        handleFighterSelect(fighter)
    }

    const { 
        draws, 
        fighterId, 
        firstName, 
        kos,
        lastName, 
        losses, 
        ringname, 
        wins 
    } = fighter; 

    return (
        <Flex   
            zIndex={100}  
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            onClick={handleSelect} 
            id={fighterId}
            boxSizing="border-box" 
            borderRadius="1px"
            w={fighterId === 'DRAW' ? '20%' : '40%'}
            pt="4"
            minH="40vh"
            cursor="pointer"
            _after={{
                content: "''",
                margin: "0 auto",
                width: '100%',
            }}
        >
            <Flex
                textAlign="center"
                w="100%"
                minH="2rem"
                flexDir="column"
            >
                { fighterId === 'DRAW'
                    ? 
                        <Heading 
                            size={["md", "lg", "xl"]}
                            mt={fighter.fighterId === "DRAW" ? "8" : "0"}
                            color={selectedFighter.fighterId === 'DRAW' ? '#fff' : 'gray'}
                        >
                            Draw
                        </Heading>
                    :
                    <>
                        <Heading 
                            color={selectedFighter.fighterId === "DRAW" ? 'gray' : '#fff'}
                            letterSpacing="1px"
                            w="100%"
                            zIndex={99}
                            as="h2"
                            size={["md", "lg"]}
                        >
                            {`${ringname}`}
                        </Heading>
                        <Flex
                            w="100%"
                            flexDir="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Center>
                                <Avatar 
                                    size={["md","md","lg", "xl"]} 
                                    _hover={{cursor: 'pointer'}} 
                                />
                            </Center>
                        </Flex>
                        <Flex
                            flexDir="column"
                            w="100%"
                        >   
                            <Heading
                                letterSpacing="0.5px"
                                as="h3"
                                size="md"
                            >
                                {`${capFirstLetters(lastName)}`} 
                            </Heading>

                            <Flex
                                display="inline-flex"
                                flexDir="row"
                                w="100%"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Heading    
                                    textAlign="center" 
                                    as="h3" 
                                    size="sm"
                                    color="#cacaca"
                                >
                                    {`${wins}-${losses}-${draws}`}&nbsp; 
                                </Heading>
                                <Heading
                                    textAlign="center" 
                                    as="h3"
                                    size="xs"
                                    color="#dadada"
                                >
                                    {`${kos} KO`}
                                </Heading>
                            </Flex>
                        <Flex 
                            mt={["4"]}
                            borderBottom={selectedFighter.fighterId === fighterId && selectedFighter.fighterId !== "DRAW" ? "5px solid white" : "5px solid transparent"}
                            w="70%"
                            mx="auto"
                        />
                        </Flex>
                    </>
                }
            </Flex>
        </Flex>
    )
}
