import { Box, Button, TextField } from '@mui/material'
import './sign-in-form.css'
import img from '../../../assets/Logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const userDetails = JSON.parse(localStorage.getItem(email))
    console.log(userDetails)
    if(userDetails){
      if(userDetails.password === password){
        localStorage.setItem('user', JSON.stringify(email))
        navigate('/')
      }
      else
        alert('wrong password')
    }
    else
      navigate('/sign-up')
  }

  return (
    <Box className='form'>
      <Box>
        <img src={img} alt='' />
      </Box>
      <Box>
        <Box className='form-heading'>
          <h2>Create account</h2>
          <p>For business, band or celebrity</p>
        </Box>
        <form action='' onSubmit={(e) => onSubmitHandler(e)}>
          <Box className='inputs-container'>
            <Box className='fields'>
              <Box className='input-field'>
                <label htmlFor='email'>Email</label>
                <TextField
                  className='email'
                  id='email'
                  variant='outlined'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </Box>

            <Box className='fields'>
              <Box className='input-field'>
                <label htmlFor='password'>Password</label>
                <TextField
                  className='password'
                  id='password'
                  variant='outlined'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
          <Button type='submit' variant='contained'>
            Login
          </Button>
        </form>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default SignInForm
