import React, { useState, createRef, useRef, useEffect } from 'react'
import { Button, ButtonGroup, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { ChatSidebar, FightStats } from './chat-sidebar-components'
import { stateStore } from '../../stores'
import { Notification } from '../notifications'

export const ScoringSidebarRight = ({
    chatKey, 
    username, 
    setIncomingScore,
    tabs,
}) => {    
    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        if(notifications.length > 0){
            const timer = setTimeout(() => {
                const temp = notifications;
                temp.shift(temp.length -1)
                setNotifications(temp);
                // setNotificationTimeout(prev => !prev);
            }, 10000)
            return () => clearTimeout(timer);
        }
    },[notificationTimeout])

    const handleCloseNotification = e => {
        const { id } = e.currentTarget;
        const temp = notifications
        const filtered = temp.filter( ({ notification }) => notification !== id);
        setNotifications(filtered)
    };
    return (
        <Flex 
            display={tabs.chat || tabs.analytics ? 'flex' : 'none'}
            id="scoring-sidebar-right"
            flexDir="column" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            w="100%" 
            minH="100%"
            p="2" 
            bg="gray.900" 
            borderRadius="md" 
            overflowY="scroll"
        > 
            <Flex 
                w={["100%","auto"]} 
                position="fixed" 
                top="3rem" 
                right="0" 
                flexDir="column" 
                zIndex="10000"
            >
            {notifications.length > 0 && notifications.map( ({notification, username}) => {
                return (
                    <Notification
                        key={notification}
                        id={notification}
                        handleCloseNotification={handleCloseNotification}
                        notification={notification} 
                        username={username}
                    /> 
                )})}
            </Flex>  
            <FightStats tabs={tabs} />
            <ChatSidebar 
                setNotifications={setNotifications}
                setNotificationTimeout={setNotificationTimeout}
                setIncomingScore={setIncomingScore}
                chatKey={chatKey}
                username={username}
                tabs={tabs} 
            />
        </Flex>
    )
}