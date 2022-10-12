import { HeadingProps } from '@chakra-ui/layout'
import { Heading, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const FooterHeading = (props) => (
  <Heading
    as="h4"
    color={useColorModeValue('gray.600', '#DADADA')}
    fontSize="sm"
    fontWeight="semibold"
    textTransform="uppercase"
    letterSpacing="wider"
    {...props}
  />
)