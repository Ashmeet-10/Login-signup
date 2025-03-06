import { Box } from '@mui/material'
import { Link } from 'react-router'

const Home = () => {
  const currentUserEmail = JSON.parse(localStorage.getItem('user'))
  const currentUser = JSON.parse(localStorage.getItem(currentUserEmail))

  return (
    <Box>
      <h1>Welcome {currentUser.fullname.firstName} {currentUser.fullname.lastName}</h1>
      <Box>
        <Link to='/sign-in'>Sign-in</Link>
      </Box>
      <Box>
        <Link to='/sign-up'>Sign-up</Link>
      </Box>
    </Box>
  )
}

export default Home
