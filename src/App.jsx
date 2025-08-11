import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import { useState, useEffect } from 'react'
import RestaurantDetails from './components/RestaurantDetails /RestaurantDetails .jsx'

import * as menuService from './services/menuService.js'
import MenuForm from './components/MenuForm/MenuForm.jsx'

const App = () => {
  const navigate = useNavigate()

  const initialState = authService.getUser()
  const [user, setUser] = useState(initialState)
  const [menus, setMenus] = useState([]) // plural naming
  const [selectedMenu, setSelectedMenu] = useState(null)

  // Load menus on mount
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await menuService.index()
        setMenus(data)
      } catch (err) {
        console.log('Error loading menus:', err)
      }
    }
    fetchMenus()
  }, [])

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      return { success: true }
    } catch (err) {
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

  const handleAddMenu = async (formData) => {
    try {
      const newMenu = await menuService.create(formData)
      setMenus([newMenu, ...menus])
      navigate('/restaurant/menu')
    } catch (err) {
      console.log('Error adding menu:', err)
    }
  }

  const handleUpdateMenu = async (formData, menuId) => {
    try {
      const updatedMenu = await menuService.update(formData, menuId)
      const newMenuList = menus.map((menu) =>
        menu._id === updatedMenu._id ? updatedMenu : menu
      )
      setMenus(newMenuList)
      setSelectedMenu(null)
      navigate('/restaurant/menu')
    } catch (err) {
      console.log('Error updating menu:', err)
    }
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        {user ? (
          <>
            {/* Protected Routes */}
            <Route
              path="/restaurant/menu"
              element={
                <MenuForm
                  handleAddMenu={handleAddMenu}
                  handleUpdateMenu={handleUpdateMenu}
                  selected={selectedMenu}
                />
              }
            />
          </>
        ) : (
          <>
            {/* Public Routes */}
            <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
            <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
          </>
        )}

        <Route path='/' element={<h1>Hello world!</h1>} />
        <Route path='*' element={<h1>404</h1>} />

      </Routes>
    </>
  )
}

export default App