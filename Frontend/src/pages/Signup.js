import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link} from 'react-router-dom'

import { TextInput } from '../components/LoginSignup/TextInput'
import { PasswordInput } from '../components/LoginSignup/PasswordInput'
import { SubmitButton } from '../components/LoginSignup/SubmitButton'
import { Button } from '../components/Reusable/Button'

import { signUp, fetchUser } from '../reducers/user'

const Wrapper = styled.div`
position: relative;
width: 100%;
height: calc(100vh - 100px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Title = styled.h1`
max-width: 600px;
`

const Signup = () => {
  const [value, setValue] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    e_mail: ''
  })
  const [validate, setValidate] = useState(true)
  const history= useHistory();
  const dispatch = useDispatch()
  const token = useSelector(store => store.user.userInfo.accessToken)

  const handleClick = () =>{ 
    let regex = /[%<>\\$'"]/
    if (regex.test(value.username)){
      setValidate(false)
    } else {
      setValidate(true)
      dispatch(signUp({...value}))
      history.push({pathname: "/login", state: {prev: "signup"}})
    }
  }

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  console.log(token)
  return (
    <Wrapper>
      {token ? (
        <>
      <Title>
        You're already logged in, log out or delete your user to be able to sign up 
        </Title>
        <Button text="Back" handleClick={() => history.goBack()} />
        </>
      ) : (<>
      <Title>Sign Up</Title>
      <TextInput
        title="name"
        helptext="Your first name"
        value={value}
        setValue={setValue}
      />
      <TextInput
        title="surname"
        helptext="Your last name"
        value={value}
        setValue={setValue}
      />
      <TextInput
        title="username"
        helptext="Choose a username 5-12 chars"
        value={value}
        setValue={setValue}
        min="5"
        max="12"
      />
      <PasswordInput type="Singup" value={value} setValue={setValue} />
      <TextInput
        title="e_mail"
        helptext="Enter your e-mail"
        value={value}
        setValue={setValue}
        min="5"
        max=""
      />
      <SubmitButton
        btntext="Submit"
        validate={validate}
        handleClick={handleClick}
      />
      
      <Link to="/login"> Already got a account? Go to login</Link></> )}
    </Wrapper>
  );
}

export default Signup;