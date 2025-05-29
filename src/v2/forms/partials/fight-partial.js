import { FieldGroup } from '../../../chakra'
import { 
    Checkbox, 
    FormControl, 
    FormLabel,  
    Input, 
    Select, 
    Stack, 
    VStack 
} from '@chakra-ui/react'
import { ROUND_LENGTH_ENUMS, WeightClass } from '../../models'

export const FightPartial = ({
    fightData,
    setFightData,
}) => {

    return (
        <FieldGroup title={`Fight Instance`}>
            <VStack width="full" spacing="6">
                <Stack width="full" spacing="4">
                    <Checkbox 
                        isChecked={fightData.isMainEvent} 
                        id="isMainEvent" 
                        onChange={e => setFightData( prev => ({ ...prev, isMainEvent: !prev.isMainEvent }))}
                    >
                        Main Event
                    </Checkbox>
                </Stack>

                <Stack width="full" spacing="4">
                    <Checkbox 
                        id="isTitleFight" 
                        isChecked={fightData.isTitleFight} 
                        onChange={e => setFightData( prev => ({ ...prev, isTitleFight: !prev.isTitleFight }))}
                    >
                        Title Fight
                    </Checkbox>
                </Stack>

                <FormControl required>
                    <FormLabel htmlFor="rounds">Total Rounds</FormLabel>
                    <Select id="rounds" placeholder={fightData.rounds || 'Rounds'} onChange={e => setFightData({ ...fightData, rounds: e.currentTarget.value })}>
                        { ROUND_LENGTH_ENUMS.map( round => <option key={round} value={round}>{round}</option>)}
                    </Select>
                </FormControl>

                <FormControl required id="weightclass">
                    <FormLabel required htmlFor="weightclass">Weight Class</FormLabel>
                    <Select id="weightclass" placeholder={fightData.weightclass || 'Weight Class'} onChange={e => setFightData({ ...fightData, weightclass: e.currentTarget.value })}>
                        { Object.values(WeightClass).map( weightclass => <option key={weightclass} value={weightclass}>{weightclass}</option>)}
                    </Select>
                </FormControl>
                <FormControl id="officialResult">
                    <FormLabel htmlFor="officialResult">Offiicial Result</FormLabel>
                    <Input value={fightData.officialResult} onChange={e => setFightData(e.currentTarget.value)} type="text" maxLength={255} />
                </FormControl>
            </VStack>
        </FieldGroup>
    )
}