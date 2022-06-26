import React, { useState, useEffect } from 'react'
import { Box, Button, FormLabel, Heading, SimpleGrid, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { DividerWithText, Card, Logo } from '../../chakra'
import { SignUpForm } from './signup-form'
import { SignInForm } from './signin-form'
import { Amplify, Auth } from 'aws-amplify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUserStore } from '../../stores'
import { ForcedPasswordChange } from './forced-password-change'

export const SignIn = props => {
  let [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');
  const pw = searchParams.get('pw');
  const nonce = searchParams.get('nonce');
  // console.log('pw:' ,pw)

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [form, setForm] = useState({
    user: {},
    username: '',
    email: '',
    password: '',
    code: ''
  });
  const [isForcePasswordChange, setIsForcePasswordChange] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false);
  const setUser = useUserStore( state => state.setUser);
  // useEffect(() => {
  //   if(nonce && nonce === 'u49kei4'){
  //     setForm({ ...form, username: name, password: pw})
  //   }
  // }, [nonce])
  const handleFormChange = e => {
    const { id, value } = e.currentTarget;
    setForm({...form, [id]: value.trim() });
  };
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      }
    })
  },[]);
  
  const handleSignUp = e => {
    e.preventDefault();
    setSubmitting(true);
    const { email, password, username } = form;
    Auth.signUp({ username, password, attributes: { email } })
      .then((data) => {
        setWaitingForCode(true);
      })
      .catch((err) => {
        setSubmitting(false);
        if(err.message.includes('User already exists')){
          alert('User already exists!')
        }
      }).finally(() => setSubmitting(false))
  };
  
  const handleConfirmCode = e => {
    e.preventDefault();
    const { code, username } = form;
    Auth.confirmSignUp(username, code)
      .then((data) => {
        // console.log(data);
        const { email, code } = data;
        if(data === 'SUCCESS'){
          handleSignIn();
        }
      })
      .catch(err => {
        console.log(err)
        alert('Invalid verification code provided, please try again.')
      });
  };

  const resendVerificationCode = () => {
    const { username } = form;
    Auth.resendSignUp(username)
      .then(res => {
        alert('New code sent.')
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSignIn = () => {
    setSubmitting(true);
    const { username, password } = form;
    Auth.signIn({
      username,
      password
    })
    .then((user) => {
      console.log('user: ', user);
      if(user?.challengeName === "NEW_PASSWORD_REQUIRED"){
        console.log('New Password Required');
        setIsForcePasswordChange(true);
        setForm({ ...form, password: '', user });
        setIsSignin(false)
      } else {
        const { attributes } = user;
        setUser({ ...attributes, username });
        sessionStorage.setItem('isLoggedIn',true);
        return navigate('/dashboard/scorecards', { username });
      }
    })
    .catch((err) => {
      console.log('handleSignin err: ', err);
      if(err == 'UserNotConfirmedException: User is not confirmed.'){
        alert('Please confirm your account.');
        setWaitingForCode(true);
        setIsSignin(false);
        return;
      }
      alert('Incorrect Username or Password')
    }).finally(() => setSubmitting(false));
  }
  const handleForcePWChange = () => {
    const { username, password, user, email } = form;
    Auth.completeNewPassword( user, password )
      .then(() => {
        handleSignIn({ username, password })
      }).catch( err => console.log(err));
  }
  const handleForgotPassword = e => {
    e.preventDefault();
    const { username } = form;
    setForgotPassword(true);
    Auth.forgotPassword( username )
  }
  return (
    <Box bg={useColorModeValue('gray.500', 'gray.800')} py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">
        {isSignin && !isForcePasswordChange &&
          <>
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Sign in to your account
            </Heading>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Text as="span">Don&apos;t have an account?</Text>
              <Text onClick={() => setIsSignin(false)} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Sign-up now!</Text>
            </Text>
          </>
        }
        { !isSignin && !isForcePasswordChange &&
          <>
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Create An Account
            </Heading>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Text as="span">Already have an account?</Text>
              <Text onClick={() => setIsSignin(true)} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Sign-In here!</Text>
            </Text>
          </>  
        }
          {isSignin && !isForcePasswordChange && 
            <Card>
              <SignInForm 
                handleForgotPassword={handleForgotPassword}
                submitting={submitting} 
                handleSignIn={handleSignIn} 
                handleFormChange={handleFormChange} 
                form={form} 
              />
               <DividerWithText mt="6">or continue with</DividerWithText>
              <SimpleGrid mt="6" columns={2} spacing="3">
              <Button color="currentColor" variant="outline">
                <VisuallyHidden>Login with Facebook</VisuallyHidden>
                <FaFacebook />
              </Button>
              <Button color="currentColor" variant="outline">
                <VisuallyHidden>Login with Google</VisuallyHidden>
                <FaGoogle />
              </Button>
            </SimpleGrid>
            </Card>
          }
          { !isSignin && !isForcePasswordChange && 
            <Card>
              <SignUpForm 
                handleForgotPassword={handleForgotPassword}
                submitting={submitting} 
                resendVerificationCode={resendVerificationCode} 
                handleConfirmCode={handleConfirmCode} 
                waitingForCode={waitingForCode} 
                handleSignUp={handleSignUp} 
                setIsSignin={setIsSignin} 
                handleSignIn={handleSignIn} 
                handleFormChange={handleFormChange} 
                form={form} 
              />
            </Card>
          }
        { isForcePasswordChange && 
          <ForcedPasswordChange 
            handleForcePWChange={handleForcePWChange} 
            handleFormChange={handleFormChange} 
            password={form.forcedPW} 
          /> 
        }

      </Box>
    </Box>
  )
}
