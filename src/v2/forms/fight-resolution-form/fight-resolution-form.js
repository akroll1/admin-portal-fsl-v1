import { useState, useEffect } from 'react'
import { 
    Box,
    Button, 
    ButtonGroup, 
    FormControl, 
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
import { FieldGroup } from '../../../chakra'
import { officialResultOptions, Status, useGlobalStore } from '../../../stores'

export const FightResolutionFormV2 = () => {

    const { fight } = useGlobalStore()

    const [distanceId, setDistanceId] = useState('')
    const [form, setForm] = useState({})
    const [status, setStatus] = useState('')
    const [knockdowns, setKnockdowns] = useState({})
    const [officialResultForm, setOfficialResultForm] = useState({
        winnerId: '',
        resolution: '',
    })
    const [searchId, setSearchId] = useState('')
    const [seasonId, setSeasonId] = useState('')
    const { 
        fetchFightByIdV2,
        updateFightResolutionV2,
    } = useGlobalStore()

    useEffect(() => {
        if(fight?.id){
            setDistanceId(fight.id)
            setStatus(fight.status)
            setForm({
                id: fight.id,
                isMainEvent: fight?.instance?.isMainEvent || false,
                isTitleFight: fight?.instance?.isTitleFight || false,
                officialResult: fight?.instance?.officialResult || null,
                rounds: fight?.instance?.rounds,
                weightclass: fight?.instance?.weightclass,
                description: fight?.metas?.description || null,
                parent: fight?.metas?.parent || null,
                storyline: fight?.metas?.storyline || null,
                subtitle: fight?.metas?.subtitle || null,
                title: fight?.metas?.title,
                typeIds: fight?.metas?.typeIds || [],
                starts: fight?.metas?.starts,
                ends: fight?.metas?.ends || null,
            });
        }
    },[fight])

    const handleSearchForDistance = () => {
        fetchFightByIdV2(searchId)
    }

    const handleFightWasCanceled = async () => {
        await updateFightResolutionV2({ 
            fightId: fight.id,
            status: Status.CANCELED,
        })
    }

    const handleSubmitResolution = () => {
        /**
        * @params resolution: `${officialResultForm.winnerId}:${officialResultForm.resolution}`, fightId: form.id, rounds: form.rounds 
        */
        if(!officialResultForm.winnerId || !officialResultForm.resolution) return alert('Missing official result!')
        const resolution = `${officialResultForm.winnerId}:${officialResultForm.resolution}`;
        const fighter1 = form?.typeIds[0]   
        const fighter2 = form?.typeIds[1]
        const f1Knockdowns = knockdowns[form?.typeIds[0]] || "0"
        const f2Knockdowns = knockdowns[form?.typeIds[1]] || "0"
        if(!fighter1 || !fighter2 || !f1Knockdowns || !f2Knockdowns) return alert('Missing fighter(s) or knockdown(s)!')
        const resolutionObj = {
            fightId: form.id,
            fighter1,
            fighter2,
            f1Knockdowns: parseInt(f1Knockdowns),
            f2Knockdowns: parseInt(f2Knockdowns),
            resolution,
            rounds: form?.rounds,
            seasonId,
            showId: form?.parent,
            status,
        }
        console.log('RESOLUTION: ', resolutionObj)
        if(!resolutionObj?.seasonId) return alert('Missing season ID!')
        if(!resolutionObj?.showId) return alert('Missing show ID!')
        if(!resolutionObj?.status) return alert('Missing status!')
        updateFightResolutionV2(resolutionObj)
    }
    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        setForm({ ...form, [id]: value });
    };

    const handleKnockdownsChange = e => {
        const { id, value } = e.currentTarget;
        setKnockdowns( prev => ({ ...prev, [id]: value }));
    }

    const handleOfficialResultChange = e => {
        const { id, value } = e.currentTarget;
        setOfficialResultForm({ ...officialResultForm, [id]: value });
    }

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <Heading size="lg" as="h1" paddingBottom="4">
                Resolutions Form
            </Heading>
            <FieldGroup title="Search Fights">
                <VStack width="full" spacing="6">
                    <FormControl id="searchId">
                        <FormLabel htmlFor="searchId">Fight ID</FormLabel>
                        <Input value={searchId.trim()} onChange={e => setSearchId(e.currentTarget.value)} type="text" />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            disabled={searchId.length !== 36} 
                            minW="33%" 
                            // isLoading={isSubmitting} 
                            loadingText="Searching..." 
                            onClick={handleSearchForDistance} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Search
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
            <form id="settings-form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    {form?.id && <>
                        <FieldGroup title="Metas">
                            <VStack width="full" spacing="6">

                                <FormControl id="parent">
                                    <FormLabel htmlFor="parent">Parent ID</FormLabel>
                                    <Input value={form.parent} onChange={handleFormChange} type="text" maxLength={36} />
                                </FormControl>
                                <FormControl id="title">
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input value={form.title} onChange={handleFormChange} type="text" maxLength={36} />
                                </FormControl>
                                <FormControl id="subtitle">
                                    <FormLabel htmlFor="subtitle">Subtitle</FormLabel>
                                    <Input value={form.subtitle} onChange={handleFormChange} type="text" maxLength={36} />
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                        <Textarea value={form.description} onChange={handleFormChange} rows={3} />
                                </FormControl>
                                <FormControl id="storyline">
                                    <FormLabel htmlFor="storyline">Storyline</FormLabel>
                                        <Textarea value={form.storyline} onChange={handleFormChange} rows={3} />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                        <FieldGroup title="Resolution">
                            <VStack width="full" spacing="6">
                                <FormControl>
                                    <FormLabel htmlFor="winnerId">Winner ID</FormLabel>
                                    <Select 
                                        id="winnerId" 
                                        onChange={handleOfficialResultChange}
                                        placeholder="ID"
                                    >
                                        {form.typeIds.map((fighterId,i) => <option key={fighterId} value={fighterId}>{fighterId}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="resolution">Resolution Options</FormLabel>
                                    <Select 
                                        id="resolution" 
                                        onChange={handleOfficialResultChange}
                                        placeholder="Official Result"
                                    >
                                        {officialResultOptions.map( option => <option key={option} value={option}>{option}</option>)}
                                    </Select>
                                </FormControl>
                                
                                <FormControl id="resolution">
                                    <FormLabel htmlFor="resolution">Official result</FormLabel>
                                    <Input value={`${officialResultForm?.winnerId}:${officialResultForm?.resolution}`} readOnly type="text" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="f1Knockdowns">Fighter 1 Knockdowns</FormLabel>
                                    <Select 
                                        id={`${form.typeIds[0]}`} 
                                        onChange={handleKnockdownsChange}
                                    >
                                        {["0","1","2","3","4","5","6","7","8","9"].map( option => <option key={option} value={option}>{option}</option>)}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="f2Knockdowns">Fighter 2 Knockdowns</FormLabel>
                                    <Select 
                                        id={`${form.typeIds[1]}`} 
                                        onChange={handleKnockdownsChange}
                                    >
                                        {["0","1","2","3","4","5","6","7","8","9"].map( option => <option key={option} value={option}>{option}</option>)}
                                    </Select>
                                </FormControl>

                                <FormControl id="status">
                                    <FormLabel htmlFor="status">Fight Status</FormLabel>
                                    <Select onChange={e => setStatus(e.currentTarget.value)}>
                                        {Object.keys(Status).map( status => <option key={status} value={status}>{status}</option>)}
                                    </Select>                            
                                </FormControl>

                                <FormControl id="seasonId">
                                    <FormLabel htmlFor="seasonId">Season ID</FormLabel>
                                    <Input value={seasonId} onChange={e => setSeasonId(e.currentTarget.value)} type="text" />                       
                                </FormControl>

                            </VStack>
                        </FieldGroup>
                        <FieldGroup mt="8">
                            <ButtonGroup w="100%">
                                <Button 
                                    w="33%"
                                    mr="4"
                                    onClick={handleSubmitResolution} 
                                    type="button" 
                                    colorScheme="solid"
                                    loadingText="Submitting..."
                                >
                                   Resolve Fight
                                </Button>
                                <Button 
                                    w="33%"
                                    variant="outline"
                                    onClick={handleFightWasCanceled} 
                                    type="button" 
                                    colorScheme="solid"
                                    loadingText="Canceling Fight..."
                                >
                                    Fight Canceled
                                </Button>
                            </ButtonGroup>
                        </FieldGroup></>
                    }
                </Stack>
            </form>
        </Box>
    )
}