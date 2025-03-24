import {useState } from 'react'
import { 
  Box, 
  Divider, 
  Flex, 
  Link, 
  Spacer, 
  Stack 
} from '@chakra-ui/react'
import { 
  FaEdit, 
  FaRegBell, 
} from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { IoLogOutOutline } from 'react-icons/io5'
import { UserInfo } from '../chakra'
import { useParams } from 'react-router-dom'
import { useGlobalStore } from '../stores'
import { DistancesFormV2 } from '../v2/forms/distances-form'
import { FighterFormV2 } from '../v2/forms/fighter-form'
import { FightResolutionFormV2 } from '../v2/forms/fight-resolution-form'
import { FightPropsFormV2 } from '../v2/forms/fight-props-form'

export const V2Forms = () => {
  const { type } = useParams();

  const { 
    signOutUser,
    user, 
  } = useGlobalStore()
  
  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase())

  const handleFormSelect = e => {
    setForm(e.currentTarget.id);
    setActive(e.currentTarget.id);
  };

  const formLinks = [
    { value: "FIGHTERS_FORM", label:"Fighters ", type: 'Fighters', icon: FaEdit, link: '/v2/forms/fighters' },
    { value: "FIGHT_FORM", label:"Distances Form", icon: FaEdit, link: '/v2/forms/fight' },
    { value: "FIGHT_PROPS", label:"Fight Props Form", icon: FaEdit, link: '/v2/forms/props' },
    { value: "RESOLUTION_FORM", label:"Resolution Form", type: 'Resolution', icon: FaEdit, link: '/v2/forms/resolutions' },

  ];

  const userFormLinks = () => {
    return formLinks.map((option,i) => {
      const { value, label, icon, link } = option;
      return (
        <NavLinkDashboard   
          key={i}
          link={link} 
          id={value} 
          onClick={handleFormSelect} 
          label={label} 
          icon={icon} 
          active={active === value ? true : false} 
        />)
    })
  }
  
  return (
    <Flex 
      height="auto" 
      width={{ base: 'full'}} 
      direction="row" 
      color="white" 
      flexWrap="wrap" 
      p={["3","6","8","10"]}
    >
      <Box flex="1 0 25%">
        <Stack spacing={6}>
          <Box fontSize="sm" lineHeight="tall">
            <Link  
              as="button" 
              to="/forms/distances" 
              p="2"
              pl="0"
              w="100%" 
              transition="background 0.1s" 
              rounded="xl" 
              _hover={{ bg: 'whiteAlpha.200' }} 
              whiteSpace="nowrap"
              textAlign="left"
            >
              <UserInfo 
                setForm={setForm} 
                setActive={setActive} 
                name={user?.username} 
                email={user?.email} 
              />
            </Link>
          </Box>
        </Stack>
        <Divider borderColor="whiteAlpha.400" />
        <Stack spacing={6} mt={6}>
          <Stack
            maxH="30vh"
            overflowY="scroll"
          >
            {userFormLinks()}
          </Stack>
          <Divider borderColor="whiteAlpha.400" />
          <Stack>
            <NavLinkDashboard   
              link="#" 
              label="Notifications" 
              icon={FaRegBell} 
            />
            <NavLinkDashboard 
              onClick={signOutUser}
              link="#" 
              label="Logout" 
              icon={IoLogOutOutline} 
            />
          </Stack>
        <Spacer />
        </Stack>
      </Box>
      <Box 
        overflow='scroll' 
        flex="1 0 75%" 
        spacing={8} 
        mb={8} 
        bg="blackAlpha.500" 
        borderRadius="md" 
        mt={0}
      >
        {form === 'FIGHTERS_FORM' && <FighterFormV2 /> }
        {form === 'FIGHT_FORM' && <DistancesFormV2 /> }
        {form === 'FIGHT_PROPS' && <FightPropsFormV2 /> }
        {form === 'RESOLUTION_FORM' && <FightResolutionFormV2 /> }
      </Box>
    </Flex>
  )
}