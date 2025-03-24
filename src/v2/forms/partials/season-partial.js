import { FormControl, FormLabel, Select, VStack } from "@chakra-ui/react"
import { FieldGroup } from "../../../chakra"
import { SeasonType } from "../../models"

export const SeasonPartial = ({
    seasonType,
    setSeasonType,
 }) => {

    return (
        <FieldGroup title={`Season Instance`}>
            <VStack width="full" spacing="6">
                <FormControl>
                    <FormLabel htmlFor="seasonType">Season Type</FormLabel>
                    <Select id="seasonType" placeholder={seasonType || 'Season Type'} onChange={e => setSeasonType(e.currentTarget.value)}>
                        { Object.values(SeasonType).map( seasonType => <option key={seasonType} value={seasonType}>{seasonType}</option>)}
                    </Select>                            
                </FormControl>
            </VStack>
        </FieldGroup>
    )
}