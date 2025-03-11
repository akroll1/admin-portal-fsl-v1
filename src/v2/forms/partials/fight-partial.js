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
    instance,
    setInstance,
}) => {

    return (
        <FieldGroup title={`Fight Instance`}>
            <VStack width="full" spacing="6">
                <>
                    <Stack width="full" spacing="4">
                        <Checkbox 
                            isChecked={instance.isMainEvent} 
                            id="isMainEvent" 
                            onChange={e => setInstance( prev => ({ ...prev, isMainEvent: !prev.isMainEvent }))}
                        >
                            Main Event
                        </Checkbox>
                    </Stack>

                    <Stack width="full" spacing="4">
                        <Checkbox 
                            id="isTitleFight" 
                            isChecked={instance.isTitleFight} 
                            onChange={e => setInstance( prev => ({ ...prev, isTitleFight: !prev.isTitleFight }))}
                        >
                            Title Fight
                        </Checkbox>
                    </Stack>

                    <FormControl required>
                        <FormLabel htmlFor="rounds">Total Rounds</FormLabel>
                        <Select id="rounds" placeholder={instance.rounds || 'Rounds'} onChange={e => setInstance({ ...instance, rounds: e.currentTarget.value })}>
                            { ROUND_LENGTH_ENUMS.map( round => <option key={round} value={round}>{round}</option>)}
                        </Select>
                    </FormControl>

                    <FormControl required id="weightclass">
                        <FormLabel required htmlFor="weightclass">Weight Class</FormLabel>
                        <Select id="weightclass" placeholder={instance.weightclass || 'Weight Class'} onChange={e => setInstance({ ...instance, weightclass: e.currentTarget.value })}>
                            { Object.values(WeightClass).map( weightclass => <option key={weightclass} value={weightclass}>{weightclass}</option>)}
                        </Select>
                    </FormControl>
                    <FormControl id="officialResult">
                        <FormLabel htmlFor="officialResult">Offiicial Result</FormLabel>
                        <Input value={instance.officialResult} onChange={e => setInstance(e.currentTarget.value)} type="text" maxLength={255} />
                    </FormControl>
                </>

            </VStack>
        </FieldGroup>
    )
}