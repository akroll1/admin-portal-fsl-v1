import { Box, Heading, Stack } from '@chakra-ui/react'

export const FieldGroup = (props) => {
  const { title, children, ...flexProps } = props
  return (
    <Stack 
      direction={{ base: 'column', md: 'row' }} 
      spacing="6" 
      py="4" 
      {...flexProps}
    >
      <Box minW="3xs">
        {title && (
          <Heading 
            as="h2" 
            fontWeight="semibold" 
            fontSize="lg" 
          >
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  )
}