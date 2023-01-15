import { Flex, Text } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const ScoringTableInfo = ({ 
  displayName, 
  fighters,
  finalScore,
  prediction,
}) => {
  const usernameCheck = username => {
    if(username?.includes('@')){
      return username.slice(0, username.indexOf('@'))
    } 
    return username; 
  }
  
  const predictionWinner = prediction ? prediction.split('-')[0] : `No Prediction`;
  const predictionHow = prediction ? prediction.split('-')[1] : ``;
  return (
    <Flex 
      mt="0" 
      p="1" 
      pt="0" 
      flexDirection="column" 
      alignItems="flex-start" 
      justifyContent="flex-start"
      minW="10rem"
    >
      <Flex 
        flexDirection="row"
        className='username' 
        p="1" 
        m="0" 
        mt="1"
        minW="100%" 
        fontSize="sm"  
        color="white" 
        fontWeight="bold"
        // textAlign="center"
        justifyContent="space-between"
        alignItems="center"
      >
          <Text>{`${usernameCheck(displayName)}`}</Text>
          <Text color="fsl-text">{`${finalScore ? "Score: " + finalScore : ""}`}</Text> 
      </Flex>
      { fighters?.length > 0 && fighters.map( (fighter, _i) => {
        const isPredicted = predictionWinner === fighters[_i];  
        return (
          <Flex 
            key={_i}
            className='fighterNames'
            justifyContent='space-between'
            fontSize="sm" 
            p="1" 
            m="0"
            mb={_i === 0 ? 1 : 0} 
            minW="100%" 
            background={_i === 0 ? "fsl-red" : "fsl-scoring-blue"}
            color="white"
            fontWeight="normal"
            border={isPredicted ? '1px solid white' : ''}
          >
            <Text>{`${capFirstLetters(fighter.lastName)}`}</Text> 
            <Text>{`${isPredicted ? predictionHow : ''}`}</Text>
          </Flex>
        )
      })}  
    </Flex>
  )
}