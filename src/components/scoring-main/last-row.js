import {
    Flex,
    Heading,
} from "@chakra-ui/react"

import { 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    RepeatIcon 
} from "@chakra-ui/icons"

export const LastRow = ({
    handleFighterSelect,
    fighterIds,
    handleAdjustScore,
    notSelectedScore,
}) => {

    const { fighter1Id, fighter2Id, selectedFighterId } = fighterIds?.fighter1Id ? fighterIds : {};
    const evenRound = notSelectedScore == 10;
    const setScoreColor = fighter => {
        if(!selectedFighterId) return 'gray.400'
        if(selectedFighterId == fighter){
            if(notSelectedScore == '10') return 'red.300'
            return 'gray.100'
        } 
        if(selectedFighterId != fighter){
            if(notSelectedScore == '10') return 'red.300'
            return 'yellow.300'
        }
        return 'gray.400'
    }

    return (
        <Flex
            boxSizing="border-box"
            alignItems="center"
            justifyContent="center"
            flexDir="row"
            w="100%"
            borderTop="1px solid #303030"
            borderBottom="1px solid #303030" 
            _hover={{
                bg: "#151515",
                cursor: "pointer"
            }}
        >
            <Flex
                flex="1 0 40%"
                alignItems="center"
                justifyContent="center"
            >
                <ChevronLeftIcon
                    onClick={e => handleAdjustScore(e, fighter1Id)}
                    id="decrement"
                    cursor="pointer"
                    px="2"
                    fontSize="3rem"
                    color={evenRound || !selectedFighterId || selectedFighterId === fighter1Id ? "#303030" : "gray.400"}
                />
                <Heading
                    textAlign="center"
                    // color={fighter1Data.score1Color}
                    as="h3"
                    w="100%"
                    size="2xl"
                    color={setScoreColor(fighter1Id)}
                >
                    { !selectedFighterId
                        ? '10' 
                        : selectedFighterId === fighter1Id
                            ? '10'
                            : notSelectedScore

                    }   
                </Heading>
                <ChevronRightIcon
                    onClick={e => handleAdjustScore(e, fighter1Id)}
                    id="increment"
                    cursor="pointer"
                    px="2"
                    fontSize="3rem"
                    color={evenRound || !selectedFighterId || selectedFighterId === fighter1Id ? "#303030" : "gray.400"}
                />
            </Flex>
            <Flex
                flex="1 0 20%"
                alignItems="center"
                justifyContent="center"
            >
                <Heading 
                    as="h3" 
                    size={["lg", "md"]}
                    color={selectedFighterId ? "red.500" : 'red.900'}
                    cursor="pointer"
                    _hover={{color: 'red.600'}}
                    onClick={() => handleFighterSelect(null)}
                >
                    {<RepeatIcon />}
                </Heading>
            </Flex>
            <Flex
                flex="1 0 40%"
                alignItems="center"
                justifyContent="center"
            >
                <ChevronLeftIcon
                    onClick={e => handleAdjustScore(e, fighter2Id)}
                    id="decrement"
                    cursor="pointer"
                    px="2"
                    fontSize="3rem"
                    color={evenRound || !selectedFighterId || selectedFighterId === fighter2Id ? "#303030" : "gray.400"}

                />
                <Heading
                    size="2xl"
                    textAlign="center"
                    as="h3"
                    w="100%"
                    color={setScoreColor(fighter2Id)}
                >

                    { !selectedFighterId
                        ? '10' 
                        : selectedFighterId === fighter2Id
                            ? '10'
                            : notSelectedScore

                    }   
                </Heading>
                <ChevronRightIcon
                    onClick={e => handleAdjustScore(e, fighter2Id)}
                    id="increment"
                    cursor="pointer"
                    px="2"
                    fontSize="3rem"
                    color={evenRound || !selectedFighterId || selectedFighterId === fighter2Id ? "#303030" : "gray.400"}
                />
            </Flex>
        </Flex>
    )
}