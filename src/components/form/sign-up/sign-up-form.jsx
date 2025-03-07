import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material'
import './sign-up-form.css'
import img from '../../../assets/Logo.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import validator from 'validator'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const SignUpForm = () => {
  const [name, setName] = useState({ firstName: '', lastName: '' })
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
  })
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid =
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.dob &&
      !errors.password &&
      !errors.confirmPassword &&
      name.firstName &&
      name.lastName &&
      email &&
      dob &&
      password &&
      confirmPassword

    setIsFormValid(isValid)
  }, [name, email, dob, password, confirmPassword, errors])

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const validateFirstName = (value) => {
    if (!value.trim()) return 'First name is required'
    else if (value.trim().length < 2)
      return 'First name must be at least 2 characters'
    return ''
  }

  const validateLastName = (value) => {
    if (!value.trim()) return 'Last name is required'
    else if (value.trim().length < 2)
      return 'Last name must be at least 2 characters'
    return ''
  }

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email is required'
    else if (!validator.isEmail(value)) return 'Please enter a valid email'
    return ''
  }

  const validateDob = (value) => {
    if (!value) return 'Date of birth is required'
    const currentDate = new Date()
    const selectedDate = new Date(value)

    if (selectedDate > currentDate) return 'Date cannot be in the future'
    return ''
  }

  const validatePassword = (value) => {
    if (!value) return 'Password is required'
    else if (value.length < 8) return 'Password must be at least 8 characters'
    else if (!/[A-Z]/.test(value))
      return 'Password must contain at least one uppercase letter'
    else if (!/[a-z]/.test(value))
      return 'Password must contain at least one lowercase letter'
    else if (!/[0-9]/.test(value))
      return 'Password must contain at least one number'
    else if (!/[^A-Za-z0-9]/.test(value))
      return 'Password must contain at least one special character'
    return ''
  }

  const validateConfirmPassword = (value) => {
    if (!value) return 'Please confirm your password'
    else if (value !== password) return 'Passwords do not match'
    return ''
  }

  const handleFirstNameChange = (e) => {
    const value = e.target.value
    const newName = { ...name, firstName: value }
    setName(newName)
    setErrors({ ...errors, firstName: validateFirstName(value) })
  }

  const handleLastNameChange = (e) => {
    const value = e.target.value
    const newName = { ...name, lastName: value }
    setName(newName)
    setErrors({ ...errors, lastName: validateLastName(value) })
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setErrors({ ...errors, email: validateEmail(value) })
  }

  const handleDobChange = (e) => {
    const value = e.target.value
    setDob(value)
    setErrors({ ...errors, dob: validateDob(value) })
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    setErrors({ ...errors, password: validatePassword(value) })

    if (confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== confirmPassword ? 'Passwords do not match' : '',
      }))
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    setErrors({ ...errors, confirmPassword: validateConfirmPassword(value) })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const firstNameError = validateFirstName(name.firstName)
    const lastNameError = validateLastName(name.lastName)
    const emailError = validateEmail(email)
    const dobError = validateDob(dob)
    const passwordError = validatePassword(password)
    const confirmPasswordError = validateConfirmPassword(confirmPassword)

    const formErrors = {
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      dob: dobError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    }

    setErrors(formErrors)

    let hasErrors = false
    for (const errorMsg of Object.values(formErrors)) {
      if (errorMsg) {
        hasErrors = true
        break
      }
    }

    if (!hasErrors) {
      const userData = {
        fullname: name,
        email: email,
        dob: dob,
        password: password,
      }

      try {
        localStorage.setItem(email, JSON.stringify(userData))
        alert('Account created successfully!')
        navigate('/sign-in')
      } catch (error) {
        alert('There was a problem saving your information. Please try again.')
        console.error('Storage error:', error)
      }
    }
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
                  className={`first-name ${errors.firstName ? 'error' : ''}`}
                  id='first-name'
                  variant='outlined'
                  onChange={handleFirstNameChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  inputProps={{ maxLength: 25 }}
                />
              </Box>
              <Box className='input-field'>
                <label htmlFor='last-name'>Last Name</label>
                <TextField
                  className={`last-name ${errors.lastName ? 'error' : ''}`}
                  id='last-name'
                  variant='outlined'
                  onChange={handleLastNameChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  inputProps={{ maxLength: 25 }}
                />
              </Box>
            </Box>
            <Box className='fields'>
              <Box className='input-field'>
                <label htmlFor='email'>Email</label>
                <TextField
                  className={`email ${errors.email ? 'error' : ''}`}
                  id='email'
                  variant='outlined'
                  type='email'
                  onChange={handleEmailChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  inputProps={{ maxLength: 30 }}
                />
              </Box>
              <Box className='input-field'>
                <label htmlFor='dob'>Date of birth</label>
                <TextField
                  className={`dob ${errors.dob ? 'error' : ''}`}
                  id='dob'
                  variant='outlined'
                  type='date'
                  onChange={handleDobChange}
                  error={!!errors.dob}
                  helperText={errors.dob}
                />
              </Box>
            </Box>

            <Box className='fields'>
              <Box className='input-field'>
                <label htmlFor='password'>Password</label>
                <TextField
                  className={`password ${errors.password ? 'error' : ''}`}
                  id='password'
                  variant='outlined'
                  type={showPassword ? 'text' : 'password'}
                  onChange={handlePasswordChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  inputProps={{ maxLength: 20 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleTogglePasswordVisibility}
                          edge='end'
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box className='input-field'>
                <label htmlFor='confirmpassword'>Confirm password</label>
                <TextField
                  className={`confirmpassword ${
                    errors.confirmPassword ? 'error' : ''
                  }`}
                  id='confirmpassword'
                  variant='outlined'
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={handleConfirmPasswordChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  inputProps={{ maxLength: 20 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle confirm password visibility'
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge='end'
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Button
            type='submit'
            variant='contained'
            disabled={!isFormValid}
            className='submit-button'
          >
            Create account
          </Button>
        </form>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default SignUpForm
