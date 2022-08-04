import React, { useState, useEffect } from 'react';
import { Flex, Stack } from '@chakra-ui/react'
import { AnalyticsSearchField } from '../../analytics'
import { NavGroup } from '../scoring-sidebar/nav-group'
import { NavItem } from '../scoring-sidebar/nav-item'
import { FaMapMarkerAlt, FaRegClock, FaRegMoneyBillAlt, FaTv } from 'react-icons/fa'
import { BiChevronRightCircle, BiCog, BiBuoy } from 'react-icons/bi'
import { IoScaleOutline } from 'react-icons/io5'
import { parseEpoch, transformedWeightclass } from '../../../utils'
import { DividerWithText } from '../../../chakra'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { stateStore } from '../../../stores';

/**
 * THIS NEEDS TO SWITCH BETWEEN A LIST OF SHOWS 
 * AND THE SHOW STATS IF THERE IS A /:fightId PARAM.
 */
export const AnalyticsSidebarSelectedShow = ({ 
    allAnalyticsShows,
    selectedAnalyticsShow,
    setSelectedAnalyticsShow,
    sidebar 
}) => {
    const handleSearch = () => {
        console.log('handleSearch')
    }
    const [data, setData] = useState({
        fight: {
            fightQuickTitle: '',
            odds: '', 
            rounds: 12, 
            weightclass: ''
        },
        show: {
            location: '',
            network: '',
            showName: '',
            showTime: 0
        },
        guestJudges: []
    });

    useEffect(() => {
        if(selectedAnalyticsShow?.show){    
            setData(selectedAnalyticsShow)
        }
    },[selectedAnalyticsShow])

    const setSelectedShow = e => {
        const { id } = e.currentTarget;
        const [selected] = allAnalyticsShows.filter( show => show.show.showId === id)
        setSelectedAnalyticsShow(selected)
        setData(selected)
    }
    const { fight, show } = data;
    // console.log('analyticsShows: ', analyticsShows);
    // console.log('selectedAnaltyicsShow: ', selectedAnalyticsShow)
    return (
        <Flex w="100%" flexDir="column" display={sidebar === 'selected' ? 'flex' : 'none'}>
            <DividerWithText text={show.showName} /> 
            <Stack 
                w="full" 
                spacing="4" 
                flex="1" 
                overflow="auto" 
                pt="8" 
                p="2"
            >               
                <NavGroup label="Show">
                    <NavItem 
                        icon={<FaTv />} 
                        label={ show.network } 
                    />
                    <NavItem 
                        icon={<FaMapMarkerAlt />} 
                        label={ show.location } 
                    />
                    <NavItem 
                        icon={<FaRegClock />} 
                        label={ parseEpoch(show.showTime) } 
                    />
                </NavGroup>

                <NavGroup label="Fight">
                    <NavItem 
                        icon={<BiChevronRightCircle />} 
                        label={ `${fight.rounds} Rounds`} 
                    />
                    <NavItem 
                        icon={<IoScaleOutline />} 
                        label={ transformedWeightclass(fight.weightclass) } 
                    />
                    <NavItem 
                        icon={<FaRegMoneyBillAlt />} 
                        label={ fight.odds } 
                    /> 
                </NavGroup>

                <NavGroup label="Support">
                    <NavItem 
                        subtle 
                        icon={<BiCog />} 
                        label="Explanations" 
                    />
                    <NavItem 
                        subtle 
                        icon={<BiBuoy />} 
                        label="Help & Support" 
                    />
                </NavGroup>
            </Stack>
        </Flex>
    )
}