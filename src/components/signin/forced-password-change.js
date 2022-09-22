import React, { useEffect, createRef } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { PasswordField } from './password-field'

export const ForcedPasswordChange = ({ 
    formState,
    isForgotPassword,
    handleForcePWChange, 
    handleFormChange, 
    password, 
    username
}) => {
    const inputRef = createRef();
    useEffect(() => {
        inputRef.current.focus();
    },[]);
    console.log('isForgotPassword: ', isForgotPassword)
    return (
        <Stack spacing="6">
            <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input 
                    value={username} 
                    name="username" 
                    type="text" 
                    onChange={isForgotPassword ? handleFormChange : null}
                />
            </FormControl>
            <PasswordField 
                formState={formState}
                handleFormChange={handleFormChange}
                password={password} 
                ref={inputRef}
            />
            <Button 
                id="forced_password_button" 
                _hover={{cursor: 'pointer'}} 
                as="a" 
                onClick={handleForcePWChange} 
                type="button" 
                colorScheme="blue" 
                size="lg" 
                fontSize="md"
            >
                Submit New Password
            </Button>
        </Stack>
    )
}
