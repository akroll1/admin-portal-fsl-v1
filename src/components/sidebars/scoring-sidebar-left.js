import React, {useState} from 'react'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { BiChevronRightCircle, BiCog, BiBuoy, BiUserCircle, BiUser, BiEdit, BiStar, BiUserCheck, BiPlusCircle } from 'react-icons/bi'
import { AccountSwitcher } from './scoring-sidebar/account-switcher'
import { NavGroup } from './scoring-sidebar/nav-group'
import { NavItem } from './scoring-sidebar/nav-item'
// import { PredictionPopover } from '../../components/prediction-popover'
import { FaLock, FaLockOpen, FaMapMarkerAlt, FaPlusCircle, FaRegClock, FaRegMoneyBillAlt, FaTrophy, FaTv, FaUserCog } from 'react-icons/fa'
import { capFirstLetters, getSidebarData, parseEpoch, predictionIsLocked, transformedWeightclass } from '../../utils'
import { IoScaleOutline } from 'react-icons/io5'
import { stateStore } from '../../stores'

export const ScoringSidebarLeft = ({ 
    finalScore, 
    groupScorecard,
    handleOpenAddMemberSubmitModal,
    prediction, 
    setAddGuestJudgeModal,
    setPredictionModal, 
    showData, 
    tabs
}) => {
    const [showGuests, setShowGuests] = useState(null)
    const { availableGuestJudges } = stateStore.getState();
  
    const handlePredictionToggle = () => {
        if(isLocked){
            return alert('Predictions are locked.')
        }
        setPredictionModal(true);
    };
    const openMemberModal = () => {
        handleOpenAddMemberSubmitModal();
    }
    const { isLocked, location, network, odds, rounds, showTime, weightclass } = showData ? getSidebarData(showData) : '';
    finalScore = parseInt(finalScore);
    const { members } = groupScorecard;

    return (
        <Flex 
            display={window.innerWidth <= 768 && tabs.sidebar ? 'flex' : window.innerWidth > 768 ? 'flex' : 'none'}
            id="scoring_sidebar" 
            mb="3rem"
            w="100%" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            minH={["22rem"]} 
            maxH={["80vh", "60vh", "60vh"]}
            overflowY="scroll" 
            position="relative" 
            alignItems="center" 
            justifyContent="center"
            borderRadius="md"
            direction="column" 
            p="2" 
            bg="gray.900" 
            color="white" 
            fontSize="sm"
        >
            <AccountSwitcher />
            <Stack w="full" spacing="4" flex="1" overflow="auto" pt="8" p="2">
                <NavGroup label="Prediction">
                    <NavItem 
                        id="prediction"
                        icon={isLocked ? <FaLock /> : <FaLockOpen />} 
                        handlePredictionToggle={handlePredictionToggle}
                        label={<Button 
                            // disabled={isLocked} 
                            button={'button'}
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            w="100%" 
                            my="-2" 
                            _focus={{bg:'transparent'}} 
                            _hover="transparent" 
                            variant="ghost" 
                            size="sm" 
                            pl="0" 
                            m="0"
                        >
                            { prediction ? prediction : 'Set Prediction' }
                        </Button>} 
                    /> 
                    <NavItem 
                        button="button" 
                        icon={<FaTrophy />} 
                        label={<Button 
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            _focus={{bg:'transparent'}} 
                            _hover="transparent" 
                            variant="ghost" 
                            size="sm" pl="0"
                        >
                            Score&#58; { 0 }
                        </Button>} 
                    /> 
                </NavGroup>
               
                <NavGroup label="Show">
                    <NavItem icon={<FaTv />} label={ network } />
                    <NavItem icon={<FaMapMarkerAlt />} label={ location } />
                    <NavItem icon={<FaRegClock />} label={ showTime } />
                </NavGroup>

                <NavGroup label="Fight">
                    <NavItem icon={<BiChevronRightCircle />} label={ rounds ? rounds + ' Rounds' : '' } />
                    <NavItem icon={<IoScaleOutline />} label={ weightclass } />
                    <NavItem icon={<FaRegMoneyBillAlt />} label={ odds } /> 
                </NavGroup>
                
                <NavGroup active={true} label="Official Judges">
                    { availableGuestJudges?.length > 0 && availableGuestJudges.map( (judge, i) => <NavItem id={judge.guestJudgeId} icon={<BiUserCircle />} label={`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`}  key={judge.guestJudgeId} />) }
                    <NavItem 
                        icon={<FaPlusCircle />} 
                        label={<Button 
                            onClick={() => setAddGuestJudgeModal(true)}
                            button={'button'}
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            w="100%" 
                            my="-2" 
                            _hover="transparent" 
                            variant="ghost" 
                            size="sm" 
                            pl="0" 
                            m="0"
                        >                    
                        Add Guest Judge
                    </Button>} 
                    />
                </NavGroup>

                <NavGroup label="Group Members">
                    { members && members.length > 0 && members.map( (member, i) => {
                        const isAdmin = member === groupScorecard.admin;
                        return <NavItem icon={isAdmin ? <FaUserCog /> : <BiUser />} label={member.split('@')[0]} key={i} />
                    })}
                
                <NavItem 
                    icon={<BiPlusCircle />} 
                    label={<Button 
                        onClick={openMemberModal}
                        _focus={{bg:'transparent'}} 
                        _hover="transparent" 
                        variant="ghost" 
                        size="sm" 
                        button={'button'}
                        justifyContent="flex-start" 
                        textAlign="left" 
                        fontSize="md" 
                        w="100%" 
                        my="-2"  
                        pl="0" 
                        m="0"
                    >
                        Add Group Member
                    </Button>} 
                />
                </NavGroup>
                <NavGroup label="Support">
                    <NavItem subtle icon={<BiCog />} label="Settings" />
                    <NavItem subtle icon={<BiBuoy />} label="Help & Support" />
                </NavGroup>
            </Stack>
        </Flex>
    )
}