import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'

import { useState, useEffect } from 'react'
import MenuForm from './components/MenuForm/menuForm.jsx'
import * as menuService from './services/menuService.js'
import MenuDetails from './components/MenuDetails/MenuDetails.jsx'
import RestaurantDetails from './components/RestaurantDetails /RestaurantDetails .jsx'

import * as restaurantService from './services/restaurantService.js'
import RestaurantForm from './components/RestaurantForm/RestaurantForm.jsx'
import RestaurantList from './components/RestaurantList/RestaurantList.jsx'




const App = () => {
  const navigate = useNavigate()

  const initialState = authService.getUser()
  const [user, setUser] = useState(initialState)
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const [menus, setMenus] = useState([])
  const [selectedMenu, setSelectedMenu] = useState(null)

      useEffect(()=>{
        const fetchAllRestaurants = async ()=>{
          const restauarntsData = await restaurantService.index()
          setRestaurants(restauarntsData)
        }
        fetchAllRestaurants()
    },[])

  useEffect(()=>{
        const fetchAllRestaurants = async ()=>{
          const restauarntsData = await restaurantService.index()
          setRestaurants(restauarntsData)
        }
        fetchAllRestaurants()
    },[])

  useEffect(() => {
    const fetchMenus = async () => {
      if (!selectedRestaurant) return; 
      try {
        const data = await menuService.index(selectedRestaurant._id)
        setMenus(data)
      } catch (err) {
        console.log('Error loading menus:', err)
      }
    }
    fetchMenus()
  }, [selectedRestaurant])


  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedMenu(null);
  };

  const handleMenuSelect = (menu) => {
    if (!selectedRestaurant) return;
    setSelectedMenu(menu);
  };

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

  const handleAddRestaurant = async (formData)=>{
    await restaurantService.create(formData)
  }
    const handleUpdateRestaurant = async (formData, _id) => {
    const updatedRestaurant = await restaurantService.update(formData, _id);
    const updatedRestaurantList = restaurants.map((restaurant) =>
      restaurant._id !== updatedRestaurant._id ? restaurant : updatedRestaurant
    );
    setPets(updatedRestaurantList);
    setSelected(updatedRestaurant);
  };


  const handleAddMenu = async (formData) => {
    if (!selectedRestaurant) {
    console.error('No restaurant selected')
    return
  }
    try {
      const newMenu = await menuService.create(selectedRestaurant._id, formData)
      setMenus([newMenu, ...menus])
      navigate(`/restaurant/${selectedRestaurant._id}/menu`)
    } catch (err) {
      console.log('Error adding menu:', err)
    }
  }

  const handleUpdateMenu = async (formData, menuId) => {
    if (!selectedRestaurant) {
    console.error('No restaurant selected')
    return }
    try {
      const updatedMenu = await menuService.update(selectedRestaurant._id, formData, menuId)
      const newMenuList = menus.map((menu) =>
        menu._id === updatedMenu._id ? updatedMenu : menu
      )
      setMenus(newMenuList)
      setSelectedMenu(null)
      navigate(`/restaurant/${selectedRestaurant._id}/menu`)
    } catch (err) {
      console.log('Error updating menu:', err)
    }
  }

 const handleDeleteMenu = async (menuId) => {
  try {
    const deletedMenu = await menuService.deleteMenu(menuId);

    if (deletedMenu.err) throw new Error(deletedMenu.err);

    setMenus(prevMenus =>
      prevMenus.filter(menu => menu._id !== deletedMenu._id)
    );

    setSelectedMenu(null); 
  } catch (err) {
    console.error("Error deleting menu:", err);
  }
};

  const handleDeleterestaurant = async (restaurantId) => {
    await restaurantService.deleteRestaurant(restaurantId)
    setRestaurants(restaurants.filter(restaurant => restaurant._id !== restaurantId))
    navigate('/restaurant')
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        {user ? (
          <>
            {/* Protected Routes */}
            <Route path='/restaurant'
              element={<RestaurantList
                restaurants={restaurants}
                handleSelect={handleRestaurantSelect}
              />} />
            <Route path='/restaurant' element={<RestaurantList restaurants={restaurants} handleSelect={handleRestaurantSelect}/>}  />
            <Route path='/restaurant/new' element={<RestaurantForm handleAddRestaurant={handleAddRestaurant}/>} user={user}  />
            <Route
              path="/restaurant/restaurantId/menu/new"
              element={
                <MenuForm
                  handleAddMenu={handleAddMenu}
                  handleUpdateMenu={handleUpdateMenu}
                  selected={selectedMenu}
                />
              }
            />

            <Route path='/restaurant/:restaurantId' element={<RestaurantDetails user={user} handleDeleterestaurant={handleDeleterestaurant}/>} />
            <Route
              path="/restaurant/:restaurantId/menu/menuId"
              element={
                <MenuDetails
                  menus={menus}
                  handleAddMenu={handleAddMenu}
                  handleDeleteMenu={handleDeleteMenu}
                  selected={selectedMenu}
                  user={user}
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