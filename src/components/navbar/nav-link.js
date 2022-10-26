import * as React from 'react'
import { Link, useColorModeValue as mode } from '@chakra-ui/react'
import { NavLink as RRLink } from 'react-router-dom'

const DesktopNavLink = React.forwardRef((props, ref) => {
  const { active, href, ...rest } = props;

  return (
    <Link
      as={RRLink}
      to={href}
      ref={ref}
      display="inline-block"
      px="4"
      py="6"
      isExternal={false}
      fontWeight="semibold"
      aria-current={active ? 'page' : undefined}
      color={mode('gray.400', 'gray.400')}
      transition="all 0.2s"
      {...rest}
      _hover={{
        color: 'white', 
      }}
      _active={{
        color: 'white',
        boxShadow: 'none !important'
      }}
      _activeLink={{
        boxShadow: 'none !important',
        color: 'white',
        fontWeight: 'bold',
      }}
      {...rest}
    />
    )
  })
  DesktopNavLink.displayName = 'DesktopNavLink'
  
  export const MobileNavLink = props => {
    const { active, ...rest } = props
    // console.log('rest: ', rest);
  return (
    <Link
      aria-current={active ? 'page' : undefined}
      w="full"
      display="flex"
      alignItems="center"
      height="14"
      fontWeight="semibold"
      borderBottomWidth="1px"
      {...rest}
    />
  )
}
export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
}