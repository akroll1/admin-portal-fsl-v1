import { 
    Button,
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores';
import { capFirstLetters } from '../../utils'

export const FighterSelectionButtons = ({
    evenRound,
    fighter,
    fighterIds,
    handleFighterSelect
}) => {

    const {
        scoringComplete
    } = useGlobalStore()

    const { selectedFighterId } = fighterIds?.fighter1Id ? fighterIds : {};
    
    const setButtonColors = currentFighter => {
        let colorsObj = {
            bg: 'transparent',
            borderColor: 'gray.600',
            color: '#cacaca'
        }
        if(!selectedFighterId) return colorsObj
        if(evenRound) return colorsObj
        if(selectedFighterId && selectedFighterId == currentFighter){

            Object.assign(colorsObj, {
                bg: '#303030',
                borderColor: '#c01616',
                color: 'gray.100'
            })
            return colorsObj
        } 
        if(selectedFighterId && selectedFighterId != currentFighter){  

            Object.assign(colorsObj,{
                bg: 'transparent',
                borderColor: 'gray.700',
                color: 'gray.400'
            })
            return colorsObj  
        }
    }
    const colors = setButtonColors(fighter.fighterId)

    return (    
        <Button
            disabled={scoringComplete}
            onClick={() => handleFighterSelect(fighter.fighterId)}
            flex="0 0 45%"
            my="2"
            px="2"
            minH="2.5rem"
            maxH="2.5rem"
            variant={'outline'}
            py={["2", "2",]}
            // bg={colors.bg}
            bg="transparent"
            size={["sm","md"]}
            borderColor={colors.borderColor}
            color={colors.color}
            // borderColor={colors.borderColor}s
            border="1px solid"
            _hover={{
                border: '1px solid',
                // bg: '#252525',
                borderColor: '#c01616',
                color: 'white'
            }}
            _focus={{
                border: '2px solid',
                borderColor: colors.borderColor
            }}
            // borderColor={selectedFighterId && selectedFighterId == fighter.fighterId ? "red" : 'gray'}
        >
            {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`} 
        </Button>
    )
}