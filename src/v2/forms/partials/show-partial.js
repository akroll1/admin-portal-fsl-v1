import { FieldGroup } from "../../../chakra"
import { FormControl, FormLabel, Input, Select, VStack } from "@chakra-ui/react"
import { Networks } from "../../models"

export const ShowPartial = ({
    showData,
    setShowData,
}) => {

    return (
        <FieldGroup title="Show Instance">
            <VStack width="full" spacing="6">
                <FormControl>

                    <FormControl id="location">
                        <FormLabel htmlFor="location">Location</FormLabel>
                        <Input value={showData.location} onChange={e => setShowData({ ...showData, [e.currentTarget.id]: e.currentTarget.value })} type="text" maxLength={255} />
                    </FormControl>
                    <FormControl id="link">
                        <FormLabel htmlFor="link">Link</FormLabel>
                        <Input value={showData.link} onChange={e => setShowData({ ...showData, [e.currentTarget.id]: e.currentTarget.value })} type="text" maxLength={255} />
                    </FormControl>
                    
                    <FormLabel htmlFor="network">Network</FormLabel>
                    <Select id="network" placeholder="Network" onChange={e => setShowData({ ...showData, network: e.currentTarget.value })}>
                        { Object.values(Networks).map( network => <option key={network} value={network}>{network}</option>)}
                    </Select>                            
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="promoter">Promoter</FormLabel>
                    <Select id="promoter" placeholder="Promoter" onChange={e => setShowData({ ...showData, promoter: e.currentTarget.value })}>
                        { Object.values(Networks).map( promoter => <option key={promoter} value={promoter}>{promoter}</option>)}
                    </Select>                            
                </FormControl>
            </VStack>
        </FieldGroup>
    )
}