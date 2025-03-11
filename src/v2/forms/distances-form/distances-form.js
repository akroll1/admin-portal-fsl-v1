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
import {
    Status,
    WeightClass,
} from '../../models'
import { DistanceType, useGlobalStore } from '../../../stores'
import { DistanceMetasPartial } from '../partials';
import { FightPartial } from '../partials/fight-partial'
import { SeasonPartial } from '../partials/season-partial'

export const DistancesForm = () => {

    const { 
        deleteFight,
        fetchFightById,
        fight,
        updateFight
    } = useGlobalStore()

    const [distanceType, setDistanceType] = useState(DistanceType.FIGHT)
    const [fightId, setFightId] = useState('')  
    const [seasonType, setSeasonType] = useState('')
    const [status, setStatus] = useState(Status.PENDING)    
    const [typeId, setTypeId] = useState('')

    const [instance, setInstance] = useState({
        id: '',
        status: Status.PENDING,
        // INSTANCE
        isMainEvent: false,
        isTitleFight: false,
        officialResult: null,
        rounds: 12,
        weightclass: WeightClass.WELTERWEIGHT,
    })
    const [metas, setMetas] = useState({
        description: null,
        parent: null,
        storyline: null,
        subtitle: null,
        title: null,
        typeIds: [],
        starts: new Date(),
        ends: new Date(),
    });

    useEffect(() => {

        if(fight?.id){
            setFightId(fight.id)
            setStatus(fight.status)
            setInstance({
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
                 starts: fight?.metas?.starts,
                 ends: fight?.metas?.ends || null,
            });
        }
    },[fight])
    
    const handleFetchFightById = () => {
        fetchFightById(fightId)
    }
    
    const handleUpdateFight = () => {
        const updateObj = {
            ...(fightId && { id: fightId }),
            status,
            instance,
            metas
        }
        console.log('updateObj', updateObj)
        updateFight(updateObj)
    };
    
    const handleDeleteFight = e => {
        deleteFight(fightId)
    }
    
    const handleAddIds = () => {
        if(metas.typeIds.some( id => id === typeId)) return
        if(metas.typeIds.length >= 2) return
        setMetas( prev => ({ ...metas, typeIds: [...prev.typeIds, typeId] })) 
        setTypeId('')
    }

    const handleRemoveId = e => {
        const { id } = e.currentTarget;
        const removed = metas.typeIds.filter( typeId => typeId !== id);
        setMetas(prev => ({ ...prev, typeIds: removed }) )
        setTypeId('')
    }

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
           
            <FieldGroup title="Search Fights">
                <VStack width="full" spacing="6">
                    <FormControl id="id">
                        <FormLabel htmlFor="id">{distanceType} ID</FormLabel>
                        <Input
                            type="text"
                            maxLength={36}
                            onChange={e => setFightId(e.currentTarget.value)}
                            value={fightId || ""}
                        />
                    </FormControl>
                    <HStack justifyContent="center" width="full">
                        <Button 
                            isDisabled={fightId.length !== 21} 
                            minW="33%" 
                            // isLoading={isSubmitting} 
                            loadingText="Searching..." 
                            onClick={handleFetchFightById} 
                            type="button" 
                            colorScheme="solid"
                        >
                            Search
                        </Button>
                    </HStack>
                </VStack>
            </FieldGroup>
            <Stack spacing="4" divider={<StackDivider />}>
                <FieldGroup title="Status">
                    <VStack width="full" spacing="6">
                        <FormControl id="status">
                            <FormLabel htmlFor="status">Fight Status</FormLabel>
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
                
                {distanceType === DistanceType.FIGHT && <FightPartial instance={instance} setInstance={setInstance} />}
                
                {distanceType === DistanceType.SEASON && <SeasonPartial seasonType={seasonType} setSeasonType={setSeasonType} />}
                <FieldGroup mt="8">
                    <ButtonGroup w="100%">
                        <Button 
                            minW="33%"
                            onClick={handleUpdateFight} 
                            colorScheme="solid"
                            loadingText="Submitting..."
                        >
                            {fightId ? 'Update' : 'Create'}
                        </Button>
                        <Button 
                            minW="33%" 
                            disabled={!fightId} 
                            loadingText="Deleting" 
                            onClick={handleDeleteFight} 
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