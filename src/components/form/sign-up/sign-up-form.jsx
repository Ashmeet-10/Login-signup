import { Box, Button, TextField } from '@mui/material'
import './sign-up-form.css'
import img from '../../../assets/Logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const SignUpForm = () => {
  const[name, setName] = useState({firstName: '', lastName: ''})
  const[email, setEmail] = useState('')
  const[dob, setDob] = useState('')
  const[password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(name)
    console.log(email)
    console.log(dob)
    console.log(password)
    const newObj = {
      fullname: name,
      email: email,
      dob: dob,
      password: password
    }
    localStorage.setItem(email, JSON.stringify(newObj))
    navigate('/sign-in')
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
                <label htmlFor='first-name'>First Name</label>
                <TextField
                  className='first-name'
                  id='first-name'
                  variant='outlined'
                  onChange={(e) => {
                    const newName = {...name, firstName:e.target.value}
                    setName(newName)
                  }}
                />
              </Box>
              <Box className='input-field'>
                <label htmlFor='last-name'>Last Name</label>
                <TextField
                  className='last-name'
                  id='last-name'
                  variant='outlined'
                  onChange={(e) => {
                    const newName = {...name, lastName:e.target.value}
                    setName(newName)
                  }}
                />
              </Box>
            </Box>
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
              <Box className='input-field'>
                <label htmlFor='dob'>Date of birth</label>
                <TextField
                  className='dob'
                  id='dob'
                  variant='outlined'
                  type='date'
                  onChange={(e) => setDob(e.target.value)}
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
              {/* <Box className='input-field'>
                <label htmlFor='confirmpassword'>Confirm password</label>
                <TextField
                  className='confirmpassword'
                  id='confirmpassword'
                  variant='outlined'
                  type='password'
                />
              </Box> */}
            </Box>
          </Box>
          <Button type='submit' variant='contained'>Create account</Button>
        </form>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default SignUpForm
