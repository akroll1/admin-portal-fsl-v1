import React from 'react'
import { Box, useColorModeValue as mode } from '@chakra-ui/react'
import { NavContent } from '../../components/navbar'

export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Box  as="header" minH="4rem" bg={mode('gray.800')} position="relative" zIndex="10">
      <Box as="nav" aria-label="Main navigation" maxW="7xl" mx="auto" px={{ base: '6', md: '8' }}>
        <NavContent.Mobile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} display={{ base: 'flex', lg: 'none' }} />
        <NavContent.Desktop isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} display={{ base: 'none', lg: 'flex' }} />
      </Box>
    </Box>
  )
}