import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    ButtonGroup, 
    FormControl, 
    FormHelperText, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Select, 
    Stack, 
    StackDivider, 
    Textarea, 
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Networks, Status, formattedShowTime } from '../../stores'
import { useGlobalStore } from '../../stores'

export const ShowForm = () => {
    const { 
        createShow,
        deleteShow,
        fetchShow,
        isSubmitting,
        show,
        updateShow,
    } = useGlobalStore()

    // showId is kept out of the form for put/post logic.
    const [showId, setShowId] = useState(null);
    const [form, setForm] = useState({
        id: '', 
        fightIds: null,
        location: '',
        network: '',
        promoter: '',
        description: '',
        chatKey: null,
        distanceIds: null,
        distanceName: '',
        distanceType: "SHOW",
        starts: new Date(),
        status: "PENDING"
    })    

    const searchForShow = e => {
        fetchShow(showId)
    };

    const handlePostShow = () => {
        
        const distance = {
            id: form.id ? form.id : null, // not sure how to handle yet, form and distance.
            chatKey: null,
            description: form.description ? form.description : null,
            distanceIds: null,
            distanceName: form.distanceName,
            distanceType: "SHOW",
            starts: new Date(form.starts).toISOString(),
            status: form.status ? form.status: null,
        };
        
        const show = {
            id: form.id ? form.id : null,
            fightIds: null,
            location: form.location,
            network: form.network,
            promoter: form.promoter,        
        }
        const showWithDistanceObj = {
            distance,
            show,
        }

        // console.log('showWithDistanceObj: ', showWithDistanceObj);

        createShow(showWithDistanceObj)
    }
    
    const handleUpdateShow = () => {
        updateShow(form)
    }

    const handleDeleteShow = e => {
        deleteShow(form.id)
    }

    const handleFormChange = (e, type) => {
        const { id, value } = e.currentTarget;
        setForm({...form, [id]: value});
    };

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="show_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4">
                        Show Form
                    </Heading>
                    <FieldGroup title="Search for a Show">
                        <VStack width="full" spacing="6">
                            <FormControl id="id">
                                <FormLabel htmlFor="id">Show ID</FormLabel>
                                <Input 
                                    value={form.id} 
                                    onChange={ ({ currentTarget: {value} }) => handleFormChange(value.length === 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!form.id}  
                                    minW="33%" 
                                    isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={searchForShow} 
                                    type="button" 
                                    colorScheme="solid">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Show Information">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="id">
                                <FormLabel htmlFor="id">Show ID</FormLabel>
                                <Input value={form.id} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl isRequired id="distanceName">
                                <FormLabel htmlFor="distanceName">Show Name</FormLabel>
                                <Input value={form.distanceName} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>

                            
                            <FormControl id="location">
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <Input value={form.location} onChange={handleFormChange}  type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="network">
                                <FormLabel htmlFor="network">Network</FormLabel>
                                <Select placeholder={form.network || 'Network'} onChange={handleFormChange}>
                                    { Object.keys(Networks).map( network => <option key={network} value={network}>{network}</option>)}
                                </Select>                            
                            </FormControl>
                            <FormControl id="promoter">
                                <FormLabel htmlFor="promoter">Promoter</FormLabel>
                                <Select placeholder={form.promoter || 'Promoter'} onChange={handleFormChange}>
                                    { Object.keys(Networks).map( promoter => <option key={promoter} value={promoter}>{promoter}</option>)}
                                </Select>                              
                            </FormControl>

                            <FormControl id="status">
                                <FormLabel htmlFor="status">Show/Distance Status</FormLabel>
                                <Select onChange={handleFormChange}>
                                    { Object.keys(Status).map( status => <option key={status} value={status}>{status}</option>)}
                                </Select>                            
                            </FormControl>
                
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Date and Time</FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="date-picker">Starts</FormLabel>
                                <Datepicker 
                                    id="date-picker"
                                    dateFormat="Pp"     
                                    timeFormat="p"    
                                    showTimeSelect                           
                                    selected={form.starts}
                                    style={{background: '#FFF', color: '#333 !important'}}
                                    onChange={time => setForm({ ...form, starts: time })}
                                />
                            </FormControl>
                            <FormControl id="description">
                                <FormLabel htmlFor="description">Distance Description</FormLabel>
                                    <Textarea value={form.description} onChange={handleFormChange} rows={5} />
                                <FormHelperText>
                                    Brief description of the fight significance. URLs are hyperlinked.
                                </FormHelperText>
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={handlePostShow} 
                            type="button" 
                            colorScheme="solid"
                            isLoading={isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                        <Button 
                            minW="33%" 
                            disabled={!showId} 
                            // isLoading={isSubmitting} 
                            loadingText="Deleting" 
                            onClick={handleDeleteShow} 
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </FieldGroup>
            </form>
            {/* <ShowFormFightersTable fights={fights} deleteFight={deleteFight} /> */}
        </Box>
    )
}