import React from 'react'
import { Avatar, Box, Flex, Img, Stack } from '@chakra-ui/react'
import { capFirstLetters } from '../utils/utils'

export const FighterInfo = ({ data }) => {
  const { firstName, lastName, ringname } = data;
  return (
    <Stack direction="row" spacing="4" align="center">
      <Flex flexShrink={0} h="10" w="2rem" alignItems="center">
        <Avatar textAlign="center" size="xs" />
        {/* <Img
          objectFit="cover"
          htmlWidth="160px"
          htmlHeight="160px"
          w="10"
          h="10"
          rounded="full"
          src={image}
          alt=""
        /> */}
      </Flex>
      <Box>
        <Box fontSize="sm" color="gray.500">
          {capFirstLetters(firstName)} {capFirstLetters(lastName)}
        </Box>
        <Box textAlign="center" fontSize="sm" fontWeight="medium">
          {capFirstLetters(ringname)}
        </Box>
      </Box>
    </Stack>
  )
}