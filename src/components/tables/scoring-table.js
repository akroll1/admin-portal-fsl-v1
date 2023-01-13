import { useEffect, useState } from 'react'
import { 
    Flex, 
    Heading, 
    Table, 
    Tbody, 
    Td, 
    Th, 
    Thead, 
    Tr, 
    useColorModeValue as mode,
} from '@chakra-ui/react'
import { ScoringTableInfo } from './scoring-table-els'
import { TabsEnum, useGlobalStore } from '../../stores'
import { FightStats } from '../analytics'
import { ScoringTableSwitches } from './table-els'
import { PieChart, SwingsGraph } from '../analytics'

export const ScoringTable = () => {

    const {
        activeGroupScorecard,
        fighters,
        handleRealTimeSwitchClick,
        lastScoredRound,
        tableData,
        tabs, 
    } = useGlobalStore()
    
    // console.log('tableData: ', tableData)
    const [toCurrentRound, setToCurrentRound] = useState(true)
    const [data, setData] = useState([])
    const [fighter1, setFighter1] = useState({})
    const [fighter2, setFighter2] = useState({})

    useEffect(() => {
        if(tableData.length > 0 && fighters.length === 2){
            setData(tableData)
            setFighter1(fighters[0])
            setFighter2(fighters[1])
        }
    },[tableData, fighters])

    const totalRounds = activeGroupScorecard?.fight ? activeGroupScorecard.fight.rounds : 12;

    const handleShowToCurrentRound = () => {
        setToCurrentRound(prev => !prev)
    }

    const columns = [
        {
            Header: 'Player',
            accessor: 'player',
            Cell: function TableCell( fighters, prediction, displayName, finalScore ) {
                return (
                    <ScoringTableInfo 
                        fighters={fighters?.length === 2 ? fighters : []} 
                        prediction={prediction} 
                        displayName={displayName} 
                        finalScore={finalScore}
                    />
                )
            }
        },
        {
            Header: 'Round',
            accessor: 'round'
        },
        {
            Header: 'Total',
            accessor: 'total'
        },

    ];
    

    const rounds = new Array(totalRounds).fill('Round')
    
    const renderRoundStyles = (i, roundKO, transformedPrediction, fighter) => {
        if((i+1) == roundKO && transformedPrediction == fighter){
            if(lastScoredRound === i){
                return ({ border: '2px solid #e56a54' })    
            } else {
                return ({ border: '1px solid white' })
            }
        } else {
            return ({ border: '1px solid #656565' })
        }
    }

    return (      
        <Flex
            w="100%"
            flexDir="column"
        >
            {/* <ScoringTableSwitches 
                activeGroupScorecard={activeGroupScorecard}
                handleRealTimeSwitchClick={handleRealTimeSwitchClick}
                handleShowToCurrentRound={handleShowToCurrentRound}
                toCurrentRound={toCurrentRound}
            /> */}
            {/* <FightStats /> */}
            { (tabs[TabsEnum.TABLE] || tabs[TabsEnum.ALL]) && 
                <Flex
                    flexDir="column"
                    w="100%"
                >
                    <FightStats
                        isTable
                    />
                    <PieChart />
                    <SwingsGraph
                        my="2"
                    />
                </Flex>
            }
            <Flex 
                overflow="scroll"
                display={tabs[TabsEnum.ALL] || tabs[TabsEnum.TABLE] ? 'flex' : 'none'}
                flexDirection="column"
                id="scoring_table" 
                w="100%" 
                p="8"
                pt="2"
                my="auto"
                h="auto"
                mb={tabs[TabsEnum.ALL] ? "0rem" : "4rem"}
            >     
                { activeGroupScorecard?.fight?.fightStatus === `COMPLETE` && <Heading m="auto" size="md">FIGHT IS OFFICIAL</Heading> }
                
                <Table 
                    id="scoring_table"
                    style={{tableLayout:'auto', width: '100%'}} 
                    overflowX="scroll" 
                    overflowY="scroll" 
                    size={["sm", "md"]} 
                    variant="scoringTable" 
                    borderWidth="1px" 
                    fontSize="sm"
                    bg="whiteAlpha.50"
                >
                    <Thead bg={mode('gray.50', '#111111')}>
                        <Tr>
                            {columns.map((column, index) => {
                                if(index === 0){
                                    return (    
                                        <Th 
                                            key={index} 
                                            color="white" 
                                            fontWeight="bold" 
                                            whiteSpace="nowrap"
                                            scope="col"
                                            textAlign="center"
                                        >
                                            {column.Header}
                                        </Th>
                                    )
                                } else if(index === 1){
                                    return rounds.map( (round, roundIndex) => {
                                        return (
                                            <Th 
                                                key={roundIndex} 
                                                fontWeight="bold"
                                                textAlign="center"
                                                style={lastScoredRound === (roundIndex) ? { color: 'white', fontSize: '1.2rem' } : { color: '#c8c8c8'} }
                                            >
                                                {roundIndex+1}
                                            </Th>
                                        )
                                    })
                                } else if(index === 2){
                                    return (
                                        <Th 
                                            key={index+99} 
                                            color="white" 
                                            fontWeight="bold"
                                        >
                                            Total
                                        </Th>
                                    )
                                }
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.length > 0 && data?.map( (row, idx) => {
                            const { 
                                finalScore, 
                                mappedScores, 
                                prediction, 
                                totals, 
                                displayName 
                            } = row;
                            let filledMappedScores; 

                            if(mappedScores.length <= totalRounds){
                                const numberToFill = totalRounds - (mappedScores.length);
                                const addingRounds = [...Array(numberToFill).fill(1)].map( round => ({[fighter1.lastName]:0, [fighter2.lastName]: 0}));
                                filledMappedScores = mappedScores.concat(addingRounds)
                            }
                            const index = prediction ? prediction.indexOf('-') : '';
                            const transformedPrediction = prediction ? prediction.slice(0, index) : '';
                            const predictionResult = prediction ? prediction.slice(index+2) : '';
                            const roundKO = prediction ? predictionResult.slice(2) : '';

                            return (
                                <Tr key={idx} p="0">
                                    {columns.map( (column, i) => {
                                        // console.log('column: ',column)
                                        const cell = row[column.accessor];
                                        const element = column.Cell?.( fighters, prediction, displayName, finalScore ) ?? cell;
                                        
                                        if(i === 0){
                                            return (
                                                <Td 
                                                    className='firstTd' 
                                                    key={i} 
                                                    p="0"
                                                >
                                                    {element}
                                                </Td>
                                            )
                                        }
                                        if(i === 1){
                                            return filledMappedScores?.map( (roundScores, _i) => {
                                                // const showToMyRoundSelected = showToMyRound ? lastScoredRound : mappedScores.length;
                                                const showToCurrentRoundSelected = () => {
                                                    // lastScoreRound || mappedScores.length
                                                    if(toCurrentRound){
                                                        return _i >= lastScoredRound ? 'transparent' : 'white'
                                                    }
                                                    if(!toCurrentRound){
                                                        return _i >= mappedScores.length ? 'transparent' : 'white'
                                                    }
                                                }

                                                return (
                                                    <Td key={_i} p="0px !important">
                                                        <Flex flexDirection="column" alignItems="center" justifyContent="space-between">
                                                            <Flex 
                                                                color={showToCurrentRoundSelected()}
                                                                w="100%"
                                                                p="1"
                                                                bg={roundScores[fighter1] ? "#4C4C4C" : "#383838"}
                                                                flexDirection="column" 
                                                                alignItems="center" 
                                                                justifyContent="center" 
                                                                style={renderRoundStyles(_i, roundKO, transformedPrediction, fighter1.lastName)}
                                                            >   
                                                                {roundScores[fighter1.lastName]}
                                                            </Flex>
                                                            <Flex 
                                                                w="100%"
                                                                p="1"
                                                                style={renderRoundStyles(_i, roundKO, transformedPrediction, fighter2.lastName)}
                                                                color={showToCurrentRoundSelected()}
                                                                flexDirection="column" 
                                                                alignItems="center" 
                                                                justifyContent="center" 
                                                                mt="0.5rem" 
                                                            >
                                                                {roundScores[fighter2.lastName]}
                                                            </Flex>
                                                        </Flex>
                                                    </Td>
                                                )
                                            })
                                        }
                                        if(i === 2){
                                            return (
                                                <Td 
                                                    className="scoreTd"
                                                    p="0" 
                                                    key={i+44}
                                                >
                                                    <Flex 
                                                        className="scoresTotal"
                                                        p="0" 
                                                        flexDirection="column" 
                                                        alignItems="center" 
                                                        justifyContent="center"
                                                    >
                                                        <Flex 
                                                            className="scores"
                                                            bg="fsl-red"
                                                            fontWeight="bold" 
                                                            fontSize="lg" 
                                                            color="whiteAlpha.800" 
                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            w="100%"
                                                            >
                                                            {totals[fighter1.lastName]}
                                                        </Flex>
                                                        <Flex 
                                                            className="scores"
                                                            bg="fsl-scoring-blue"
                                                            fontWeight="bold" 
                                                            fontSize="lg" 
                                                            color="whiteAlpha.800" 
                                                            flexDirection="column" 
                                                            alignItems="center" 
                                                            justifyContent="center" 
                                                            mt="0.5rem" 
                                                            w="100%"
                                                        >
                                                            {totals[fighter2.lastName]}
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                            )
                                        }
                                    })}

                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Flex>
        </Flex> 
    )
}