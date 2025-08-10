import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import HootList from './components/HootList/HootList'
import HootDetails from './components/HootDetails/HootDetails'
import HootForm from './components/HootForm/HootForm'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as hootService from './services/hootService'
import { useState, useEffect } from 'react'

const App = () => {

  const navigate = useNavigate()

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [hoots, setHoots] = useState([])

  useEffect(() => {
    // going to run a service to fetch all hoots
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index()
      setHoots(hootsData)
    }
    fetchAllHoots()
  }, [])


  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

  const handleAddHoot = async (formData) => {
    await hootService.create(formData)
  }

  const handleDeleteHoot = async (hootId) => {
    await hootService.deleteHoot(hootId)
    setHoots(hoots.filter(hoot => hoot._id !== hootId))
    navigate('/hoots')
  }

  const handleUpdateHoot = async (formData, hootId) => {
    const updatedHoot = await hootService.update(formData, hootId)
    navigate(`/hoots/${hootId}`)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          {user ? (
            // Protected Routes
            <>
              <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot} />} />
              <Route path='/hoots/:hootId/edit' element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
            </>
          ) : (
            // Public Routes
            <>
              <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
              <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
            </>
          )}
          <Route path='/' element={<h1>Hello world!</h1>} />
          <Route path='/hoots' element={<HootList hoots={hoots} />} />
          <Route path='/hoots/:hootId' element={<HootDetails user={user} handleDeleteHoot={handleDeleteHoot} />} />
          <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </>

  )
}

export default App


