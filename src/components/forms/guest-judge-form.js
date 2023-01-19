import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

export const GuestJudgeForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        guestJudgeId: '',
        bio: '',
        displayName: '',
        firstName: '',
        img: '',
        lastName: '',
        link: '',
        tagline: ''
    });

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({...form, [id]: value });
    }
    const searchForJudge = () => {
        if(search){
            setIsSubmitting(true);
            const url = `${process.env.REACT_APP_API}/guest-judges/${search}`;
            return axios.get(url, tokenConfig)
                .then( res => setForm({ ...res.data }))
                .catch( err => console.log(err))
                .finally(() => setIsSubmitting(false));
        }
    };
    const putGuestJudge = () => {
        const url = `${process.env.REACT_APP_API}/guest-judges`;
        return axios.put(url, form, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    toast({ title: 'Guest Judge successful.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,})
                }})
            .catch(err => console.log(err))
    }

    const { bio, displayName, firstName, guestJudgeId, lastName, img, links, tagline } = form;
    // LINKS is an array | null;
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="guest_judge_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Guest Judge Form
                    </Heading>
                    <FieldGroup title="Search for a Judge">
                        <VStack width="full" spacing="6">
                            <FormControl id="search">
                                <FormLabel htmlFor="guestJudgeId">Judge ID</FormLabel>
                                <Input value={search} onChange={ ({ currentTarget: {value} }) => setSearch(value.length == 36 ? value : '')} type="text" maxLength={36} />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button disabled={!search}  minW="33%" isLoading={isSubmitting} loadingText="Searching..." onClick={searchForJudge} type="button" colorScheme="blue">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Guest Judge">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="firstName">
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input required value={firstName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl isRequired id="lastName">
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input required value={lastName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl id="displayName">
                                <FormLabel htmlFor="displayName">Display Name</FormLabel>
                                <Input required value={displayName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl id="img">
                                <FormLabel htmlFor="img">Image Url</FormLabel>
                                <Input value={img} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl id="links">
                                <FormLabel htmlFor="links">Link Url</FormLabel>
                                <Input value={links} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="tagline">
                                <FormLabel>Tagline</FormLabel>
                                <Input value={tagline} onChange={e => handleFormChange(e)} type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="bio">
                                <FormLabel>Bio</FormLabel>
                                <Textarea
                                    required
                                    placeholder="Biography..."
                                    value={bio}
                                    onChange={e => handleFormChange(e)}
                                    type="text"
                                    size='md'
                                    rows="6"
                                />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button onClick={putGuestJudge} type="submit" colorScheme="blue">
                        Submit
                    </Button>
                    <Button variant="outline">Cancel</Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}