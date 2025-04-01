import { 
    useState, 
    useEffect 
} from 'react'
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
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../../chakra'
import { SeasonType, Status } from '../../models'
import { DistanceType, useGlobalStore } from '../../../stores'
import { initialFightState, initialShowState, initialMetasState } from './helpers'
import { DistanceMetasPartial, FightPartial, SeasonPartial, ShowPartial } from '../partials'

export const DistancesFormV2 = () => {

    const { 
        fight,
        show,
        season,
        // ACTIONS
        deleteFightV2,
        deleteShowV2,
        deleteSeasonV2,
        fetchFightByIdV2,
        fetchShowByIdV2,
        fetchSeasonByIdV2,
        updateFightV2,
        updateShowV2,
        updateSeasonV2,
    } = useGlobalStore()

    const [distanceType, setDistanceType] = useState(DistanceType.FIGHT)
    const [distanceId, setDistanceId] = useState('')  
    const [seasonType, setSeasonType] = useState('')
    const [status, setStatus] = useState(Status.PENDING)    
    // typeId is for metas.typeIds.
    const [typeId, setTypeId] = useState('')

    const [fightData, setFightData] = useState(initialFightState)
    const [showData, setShowData] = useState(initialShowState)
    const [metas, setMetas] = useState(initialMetasState);

    useEffect(() => {
        if(distanceType === DistanceType.FIGHT && fight?.id){
            setDistanceId(fight.id)
            setStatus(fight.status || Status.PENDING)
            // Then go through and go through the instances.
            setFightData({
                isMainEvent: fight?.instance?.isMainEvent || false,
                isTitleFight: fight?.instance?.isTitleFight || false,
                officialResult: fight?.instance?.officialResult || null,
                rounds: fight?.instance?.rounds,
                weightclass: fight?.instance?.weightclass,
            })
            setMetas({
                 description: fight?.metas?.description || null,
                 parent: fight?.metas?.parent || null,
                 storyline: fight?.metas?.storyline || null,
                 subtitle: fight?.metas?.subtitle || null,
                 title: fight?.metas?.title,
                 typeIds: fight?.metas?.typeIds || [],
                 starts: new Date(fight?.metas?.starts),
                 ends: new Date(fight?.metas?.ends) || null,
            });
        }
        if(distanceType === DistanceType.SHOW && show?.id){
            setDistanceId(show.id)
            setStatus(show.status || Status.PENDING)
            setShowData({
                location: show?.instance?.location || '',
                link: show?.instance?.link || '',
                network: show?.instance?.network || '',
                promoter: show?.instance?.promoter || '',
            })
            setMetas({
                description: show?.metas?.description || null,
                parent: show?.metas?.parent || null,
                storyline: show?.metas?.storyline || null,
                subtitle: show?.metas?.subtitle || null,
                title: show?.metas?.title,
                typeIds: show?.metas?.typeIds || [],
                starts: new Date(show?.metas?.starts),
                ends: new Date(show?.metas?.ends) || null,
            });
        }
        if(distanceType === DistanceType.SEASON && season?.id){
            setDistanceId(season.id)
            setStatus(season.status || Status.PENDING)
            setSeasonType(season?.instance?.seasonType || '')
            setMetas({
                description: season?.metas?.description || null,
                parent: season?.metas?.parent || null,
                storyline: season?.metas?.storyline || null,
                subtitle: season?.metas?.subtitle || null,
                title: season?.metas?.title,
                typeIds: season?.metas?.typeIds || [],
                starts: new Date(season?.metas?.starts),
                ends: new Date(season?.metas?.ends) || null,
            });
        }
    },[distanceType, fight, show, season])

    useEffect(() => {
        if(distanceType){
            setDistanceId("")
            setFightData(initialFightState)
            setShowData(initialShowState)
            setMetas(initialMetasState)
        }
    }, [distanceType])
    
    const handleFetchDistanceById = () => {
        if(!distanceId || !distanceType){
            alert('Please enter a valid ID and select a distance type')
            return;
        }
        if(distanceType === DistanceType.FIGHT) return fetchFightByIdV2(distanceId)
        if(distanceType === DistanceType.SHOW) return fetchShowByIdV2(distanceId)
        if(distanceType === DistanceType.SEASON) return fetchSeasonByIdV2(distanceId)
    }
    
    const handleDeleteDistance = () => {
        if(!distanceId || !distanceType){
            alert("Please enter a valid ID and select a distance type")
            return;
        }
        if(distanceType === DistanceType.FIGHT) return deleteFightV2(distanceId)
        if(distanceType === DistanceType.SHOW) return deleteShowV2(distanceId)
        if(distanceType === DistanceType.SEASON) return deleteSeasonV2(distanceId)
    }
    
    const handleAddIds = () => {
        if(metas.typeIds.some( id => id === typeId)) return
        if(distanceType === DistanceType.FIGHT && metas.typeIds.length >= 2) return
        setMetas( prev => ({ ...metas, typeIds: [...prev.typeIds, typeId] })) 
        setTypeId('')
    }

    const handleRemoveId = e => {
        const { id } = e.currentTarget;
        const removed = metas.typeIds.filter( typeId => typeId !== id);
        setMetas(prev => ({ ...prev, typeIds: removed }) )
        setTypeId('')
    }

    const handleUpdateDistance = () => {
        const getInstance = () => {
            if(distanceType === DistanceType.FIGHT) return fightData;
            if(distanceType === DistanceType.SHOW) return showData;
            if(distanceType === DistanceType.SEASON) return { type: seasonType || SeasonType.MONTH }
        }
        const instance = getInstance();
        const updateObj = {
            ...(distanceId && { id: distanceId }),
            status,
            instance,
            metas,
        }
        if(distanceType === DistanceType.FIGHT && (metas.typeIds.length !== 2)) return alert("Please check typeIds!")
        if((distanceType === DistanceType.SHOW || distanceType === DistanceType.SEASON) && !metas.typeIds.length) return alert("Please add typeIds!")
        if(distanceType === DistanceType.FIGHT) return updateFightV2(updateObj)
        if(distanceType === DistanceType.SHOW) return updateShowV2(updateObj)
        if(distanceType === DistanceType.SEASON) return updateSeasonV2(updateObj)
    };

    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <FieldGroup title="Distance Type">
                <VStack width="full" spacing="6">
                    <FormControl id="status">
                        <FormLabel htmlFor="status">Distance Type</FormLabel>
                        <Select onChange={e => setDistanceType(e.currentTarget.value)}>
                            { Object.keys(DistanceType).map( distanceType => <option key={distanceType} value={distanceType}>{distanceType}</option>)}
                        </Select>                            
                    </FormControl>
                </VStack>
            </FieldGroup>
            
            <Heading size="lg" as="h1" paddingBottom="4">
                {distanceType} Form
            </Heading>
           
            <FieldGroup title={`${distanceType} ID`}>
                <VStack width="full" spacing="6">
                    <FormControl id="id">
                        <FormLabel htmlFor="id">{distanceType} ID</FormLabel>
                        <Input
                            type="text"
                            maxLength={36}
                            onChange={e => setDistanceId(e.currentTarget.value)}
                            value={distanceId || ""}
                        />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            isDisabled={distanceId?.length !== 21} 
                            minW="33%" 
                            // isLoading={isSubmitting} 
                            loadingText="Searching..." 
                            onClick={handleFetchDistanceById} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Search
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
            <Stack spacing="4" divider={<StackDivider />}>
                <FieldGroup title={`${distanceType} Status- ${status}`}>
                    <VStack width="full" spacing="6">
                        <FormControl id="status">
                            {/* <FormLabel htmlFor="status">Fight Status</FormLabel> */}
                            <Select onChange={e => setStatus(e.currentTarget.value)}>
                                { Object.keys(Status).map( status => <option key={status} value={status}>{status}</option>)}
                            </Select>                            
                        </FormControl>
                    </VStack>
                </FieldGroup>
            
                <DistanceMetasPartial
                    metas={metas}
                    handleAddIds={handleAddIds}
                    handleRemoveId={handleRemoveId}
                    setMetas={setMetas}
                    setTypeId={setTypeId}
                    typeId={typeId}
                />
                
                {distanceType === DistanceType.FIGHT && <FightPartial fightData={fightData} setFightData={setFightData} />}
                
                {distanceType === DistanceType.SHOW && <ShowPartial showData={showData} setShowData={setShowData} />}

                {distanceType === DistanceType.SEASON && <SeasonPartial seasonType={seasonType} setSeasonType={setSeasonType} />}
                
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={handleUpdateDistance} 
                            colorScheme="solid"
                            loadingText="Submitting..."
                        >
                            {distanceId ? 'Update' : 'Create'}
                        </Button>
                        <Button 
                            minW="33%" 
                            disabled={!distanceId} 
                            loadingText="Deleting" 
                            onClick={handleDeleteDistance} 
                            variant="outline"
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </FieldGroup>
            </Stack>
        </Box>
    )
}