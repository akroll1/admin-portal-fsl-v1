import { useState, useEffect } from 'react'
import { 
    Flex,
    Heading 
} from '@chakra-ui/react'
import { FighterSwipe } from '../fighter-swipe'
import { ScoringButtons } from './scoring-buttons'
import { useScorecardStore } from '../../stores'
import image from '../../image/boxing-background.png'

export const ScoringMain = ({ 
    isSubmitting,
    tabs,
}) => {
    const [userScoringComplete, setUserScoringComplete] = useState(false);
    const [evenRound, setEvenRound] = useState(false)
    const [round, setRound] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedFighter, setSelectedFighter] = useState('');
    const [notSelectedScore, setNotSelectedScore] = useState(9);
    
    const {
        fighters,
        fighterScores,
        scoringComplete,
        setScoringComplete,
        submitRoundScores,
        totalRounds,
    } = useScorecardStore();

    useEffect(() => {
        setUserScoringComplete(scoringComplete)
    },[scoringComplete])

    useEffect(() => {
        if(isSubmitting){ 
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        if(!selectedFighter && !isSubmitting) setIsDisabled(true)
        
    },[isSubmitting, selectedFighter]);

    useEffect(() => {
        setEvenRound(false)
        if(notSelectedScore === 10){
            setEvenRound(true)
        } 
    },[notSelectedScore])

    const handleFighterSelect = id => {
        setSelectedFighter(id)
        setNotSelectedScore(9)
    }

    const submitScores = () => {
        const [fighter1, fighter2] = fighters;
        const notSelected = selectedFighter === fighter1.fighterId ? fighter2.fighterId : fighter1.fighterId;
        const { scorecardId } = fighterScores
        const update = {
            round,
            scorecardId,
            [notSelected]: notSelectedScore,
            [selectedFighter]: 10
        };
        const scoringIsComplete = (round+1)  > totalRounds;
        submitRoundScores(update);
        setSelectedFighter('');
        setNotSelectedScore(9)
        setScoringComplete(scoringIsComplete)
    }

    const handleAdjustScore = e => {
        const { id } = e.currentTarget;
        if(id === 'increment'){
            if(notSelectedScore >= 10) return;
            setNotSelectedScore(prev => prev + 1)
        }
        if(id === 'decrement'){
            if(notSelectedScore <= 6) return;
            setNotSelectedScore(prev => prev -1)
        }
    }


    return (
        <Flex 
            id="scoring_main"
            display={tabs.scoring || tabs.all ? 'flex' : 'none'}
            p={["0", "0"]} 
            m="auto"
            mt="0"
            flexDir="column" 
            justifyContent="flex-start"
            w="100%"  
            position="relative"  
            minH={tabs.info ? "75vh" : "100%"}

        >
            <Flex     
                flexDir={["column"]} 
                w={["100%"]} 
                position="relative"
                _before={{
                    content: "''",
                    background: `url(${image})`,
                    opacity: "0.3",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    position: "absolute",
                    zIndex: "1"
                }}
            >
                <Flex
                    textAlign="center"
                    w="100%"
                    mt="0"
                    pt="0"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                >
                    <Heading 
                        w="100%"
                        bg="#171717"
                        zIndex={99}
                        mb="2"
                        as="h2"
                        size="xl"
                        minH="2rem"
                    >
                        Your Scorecard
                    </Heading>
                </Flex>
                <Flex
                    flexDir="row"
                    w="100%"
                    textAlign="center"

                >

                {
                    fighters.length > 0 && fighters.map( (fighter, i) => (
                        <FighterSwipe
                            evenRound={evenRound}
                            fighter={fighter}
                            handleFighterSelect={handleFighterSelect}
                            key={i}
                            notSelectedScore={notSelectedScore}
                            redCorner={fighters[0].fighterId === selectedFighter}
                            scoringComplete={userScoringComplete}
                            selectedFighter={selectedFighter}
                        />
                    ))
                }
                </Flex>     

            </Flex>
            <ScoringButtons
                handleAdjustScore={handleAdjustScore}
                isDisabled={isDisabled}
                isSubmitting={isSubmitting}
                round={round}
                selectedFighter={selectedFighter}
                setIsDisabled={setIsDisabled}
                submitScores={submitScores}
                totalRounds={totalRounds}
            />
        </Flex> 
    )
}