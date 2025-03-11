import { FormControl, FormLabel, Select } from "@chakra-ui/react"
import { SeasonType } from "../../models"

export const SeasonPartial = ({
    seasonType,
    setSeasonType,
 }) => {

    return (
        <FormControl>
            <FormLabel htmlFor="seasonType">Season Type</FormLabel>
            <Select id="seasonType" placeholder={seasonType || 'Season Type'} onChange={e => setSeasonType(e.currentTarget.value)}>
                { Object.values(SeasonType).map( seasonType => <option key={seasonType} value={seasonType}>{seasonType}</option>)}
            </Select>                            
        </FormControl>
    )
}