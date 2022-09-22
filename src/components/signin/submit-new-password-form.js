import React, { useEffect, createRef } from 'react'
import { chakra, Button, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { PasswordField } from './password-field'

export const SubmitNewPasswordForm = ({ 
  form,
  formState,
  renderForgotPasswordForm,
  handleFormChange,
  handleSubmitNewPassword,
  resendVerificationCode
}) => {
  const inputRef = createRef();
  const { username, email, password, code } = form;

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  return (
    <chakra.form onSubmit={e => e.preventDefault()}>
      <Stack spacing="6">
        <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input 
                ref={inputRef}
                onChange={handleFormChange} 
                value={form.username} 
                name="username" 
                type="text" 
                required 
            />
        </FormControl>
        <FormControl id="code">
            <FormLabel>Code</FormLabel>
            <Input 
                onChange={handleFormChange} 
                value={form.code} 
                name="code" 
                type="text" 
                required 
            />
        </FormControl>
        <PasswordField 
            formState={formState}
            handleFormChange={handleFormChange} 
            renderForgotPasswordForm={renderForgotPasswordForm} 
        />
            <Button 
                id="request_new_pw_button"
                _hover={{cursor: 'pointer'}} 
                as="a" 
                onClick={handleSubmitNewPassword} 
                type="button" 
                colorScheme="blue" 
                size="lg" 
                fontSize="md"
            >
                Submit New Password
            </Button>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Text as="span">Didn&apos;t receive a code?</Text>
              <Text onClick={resendVerificationCode} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Resend code!</Text>
            </Text>
        </Stack>
    </chakra.form>
  )
}
