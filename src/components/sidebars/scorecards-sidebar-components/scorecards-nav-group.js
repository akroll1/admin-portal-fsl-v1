import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

export const ScorecardsNavGroup = props => {
  const { 
    active, 
    children, 
    id, 
    label, 
    handleHideShow, 
} = props

    const hideShow = e => {
        const { id } = e.currentTarget
        handleHideShow(id)
    }

    return (  
        <Flex
            names={'scorecard_nav_group'}
            w="100%"
            flexDir="column"
            justifyContent="center"
            alignItems="flex-start"
            onClick={hideShow}
            id={id}
            mb="1"
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                borderRadius="3px"
                _hover={{
                    color:'#fcfcfc',
                    cursor: 'pointer',
                    background: '#535353'
                }}
            >
                <Heading
                    w="100%"
                    p="1"
                    pl="2"
                    _hover={{ color:'#fcfcfc'}}
                    fontSize={id === 'fight' ? '2xl' : "lg"}
                    color="#f0f0f0"
                    as="h3" 
                >
                    {label}
                </Heading>

                <Flex
                    display={id === 'fight' ? 'none' : 'flex'}
                    mr="4"
                >
                    { active 
                        ? 
                            <TriangleUpIcon
                                transition="all 2.8s"
                                color="#cacaca" 
                            /> 
                        : 
                            <TriangleDownIcon 
                                color="#cacaca" 
                            /> 
                    }
                </Flex>
            </Flex>    
            <Flex w="100%">{children}</Flex>
        </Flex>
    )
}