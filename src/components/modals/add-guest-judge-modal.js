import { useState, useEffect } from 'react';
import { 
    Button, 
    ButtonGroup, 
    Input, 
    InputGroup, 
    InputRightElement, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalCloseButton, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Text, 
    useToast 
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { capFirstLetters } from '../../utils'
import { useScorecardStore, useStateStore } from '../../stores'
import { DividerWithText } from '../../chakra';

// now in scoring.ts
export const AddGuestJudgeModal = ({ 
    fetchGuestJudgeScorecards 
}) => {
    const toast = useToast();
    const { myGuestJudges, setMyGuestJudges } = useStateStore()
    const {
        modals, 
        setModals
    } = useScorecardStore()

    const availableGuestJudges = useStateStore( state => state.availableGuestJudges);
    const [myJudges, setMyJudges] = useState([]);

    useEffect(() => {
        if(modals.addGuestJudgeModal){
            const currentJudges = availableGuestJudges.length > 0 && availableGuestJudges.filter( judge => myGuestJudges.includes(judge.guestJudgeId))
            setMyJudges(currentJudges);
        }
    },[modals.addGuestJudgeModal])
    
    const closeModal = () => {
        setMyJudges([]);
        setModals('addGuestJudgeModal', false)
    }
 
    const localAddGuestJudge = e => {
        const { id } = e.currentTarget;
        const judgeToAdd = availableGuestJudges.filter( judge => judge.guestJudgeId === id);
        const check = myJudges.filter( judge => judge.guestJudgeId === id);
        if(check.length === 0){
            setMyJudges(prev => [...prev, ...judgeToAdd]);
        }
    }
    const localRemoveGuestJudge = e => {
        const { id } = e.currentTarget;
        const filtered = myJudges.filter( judge => judge.guestJudgeId !== id);
        setMyJudges(filtered);
        setMyGuestJudges(filtered);
    }
    
    const setJudges = () => {
        const judges = myJudges.map( judge => judge.guestJudgeId);
        setMyGuestJudges(judges)
        fetchGuestJudgeScorecards(judges);
        closeModal();
    }
    return ( 
        <Modal
            isCentered
            onClose={closeModal}
            isOpen={modals.addGuestJudgeModal}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent p="0.5rem">
                <ModalHeader fontSize="sm">Available Guest Judges</ModalHeader>
                <ModalCloseButton onClick={closeModal} />
                <ModalBody m="auto" w="100%"> 
                    {availableGuestJudges?.length > 0  
                        ?   availableGuestJudges.map( judge => {
                                return (
                                    <>    
                                        <InputGroup 
                                            key={judge.guestJudgeId}
                                            size="sm"
                                            m="2" 
                                            id={judge.guestJudgeId} 
                                            onClick={localAddGuestJudge}
                                        >
                                            <Input 
                                                p="2" 
                                                readOnly 
                                                _hover={{ background: '#3b4962', cursor: 'pointer' }} 
                                                value={`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`} 
                                                key={judge.guestJudgeId} 
                                            />
                                            <InputRightElement children={ <AddIcon /> } />

                                        </InputGroup>
                                        <DividerWithText text="My Judges" />
                                    </>
                            )})

                        :   <Text textAlign="center">There are no guest judges for this fight.</Text>
                    }
                    { myJudges.length > 0 && myJudges.map( judge => {
                        return (
                            <InputGroup 
                                key={judge.guestJudgeId}
                                size="sm"
                                m="2" 
                                id={judge.guestJudgeId} 
                                onClick={localRemoveGuestJudge}
                            >
                                <Input 
                                    p="2" 
                                    readOnly 
                                    _hover={{ background: '#3b4962', cursor: 'pointer' }} 
                                    value={`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`} 
                                    key={judge.guestJudgeId} 
                                />
                                <InputRightElement children={ <DeleteIcon /> } />
                            </InputGroup>
                        )
                    })}
                </ModalBody>
                <ModalFooter 
                    display="flex" 
                    flexDirection="row" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <ButtonGroup 
                        m="auto" 
                        spacing="4"
                        w="100%"
                    >
                        { availableGuestJudges.length > 0 && 
                            <Button 
                                m="auto"
                                minW="50%"
                                size="md"
                                onClick={setJudges}
                                loadingText="Submitting"  
                            >
                                Set Judges
                            </Button>
                        }
                        <Button 
                            size="md"
                            m="auto"
                            minW={availableGuestJudges.length > 0? "50%" : '50%'}
                            colorScheme={availableGuestJudges.length > 0 ? "outline" : 'solid'} 
                            variant={availableGuestJudges > 0 ? "outline" : "solid"}
                            onClick={closeModal}
                        >
                            { availableGuestJudges.length > 0 ? `Cancel` : `Close`}
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )



}