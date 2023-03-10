import { 
  HStack, 
  Icon, 
  Text, 
  Link 
} from "@chakra-ui/react"


export const NavLink = props => {
    const { icon, isActive, label, ...rest } = props
    return (
      <Link
        display="block"
        py={2}
        px={3}
        className={isActive}
        borderRadius="md"
        transition="all 0.3s"
        fontWeight="medium"
        lineHeight="1.5rem"
        aria-current={isActive ? 'page' : undefined}
        color="whiteAlpha.900"
        _hover={{
          bg: 'blue.500',
          color: 'white',
        }}
        _activeLink={{
          bg: 'blue.700',
          color: 'white',
        }}
        {...rest}
      >
        <HStack spacing={4}>
          <Icon as={icon} boxSize="20px" />
          <Text as="span">{label}</Text>
        </HStack>
      </Link>
    )
  }