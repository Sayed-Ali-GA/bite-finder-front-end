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
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const navigate = useNavigate()

  const initialState = authService.getUser()
  const [user, setUser] = useState(initialState)
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const [menus, setMenus] = useState([])
  const [selectedMenu, setSelectedMenu] = useState(null)

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      const restauarntsData = await restaurantService.index()
      setRestaurants(restauarntsData)
    }
    fetchAllRestaurants()
  }, [])

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      const restauarntsData = await restaurantService.index()
      setRestaurants(restauarntsData)
    }
    fetchAllRestaurants()
  }, [])

  useEffect(() => {
    const fetchMenus = async () => {
      if (!selectedRestaurant) return;
      try {
        const data = await menuService.indexByRestaurant(selectedRestaurant._id)
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


  const handleAddRestaurant = async (formData) => {
    const newRestaurant = await restaurantService.create(formData)
    setRestaurants(prevRestaurants => [newRestaurant, ...prevRestaurants])
    setSelectedRestaurant(newRestaurant)
    newRestaurant.ownerId = {}
    newRestaurant.ownerId.username = user.username
    return newRestaurant
  }


  const handleUpdateRestaurant = async (formData, _id) => {
    const updatedRestaurant = await restaurantService.update(formData, _id)
    const updatedRestaurantList = restaurants.map((restaurant) =>
      restaurant._id !== updatedRestaurant._id ? restaurant : updatedRestaurant
    )
    setRestaurants(updatedRestaurantList)
    setSelectedRestaurant(updatedRestaurant)
    return updatedRestaurant

  }

  const handleAddMenu = async (formData) => {
    if (!selectedRestaurant) {
      console.error('No restaurant selected');
      return;
    }
    try {
      const newMenu = await menuService.create(selectedRestaurant._id, formData);
      const newMenus = Array.isArray(newMenu) ? newMenu : [newMenu]
      setMenus(prevMenus => [...prevMenus, ...newMenus]);
      navigate(`/restaurant/${selectedRestaurant._id}/menu`);
    } catch (err) {
      console.log('Error adding menu:', err);
    }
  };

  const handleUpdateMenu = async (formData, _id) => {
    try {
      const updatedMenu = await menuService.update(selectedRestaurant._id, _id, formData);
      const newMenuList = menus.map(menu =>
        menu._id !== updatedMenu._id ? updatedMenu : menu
      );

      setMenus(newMenuList);
      setSelectedMenu(updatedMenu);

      navigate(`/restaurant/${selectedRestaurant._id}/menu`);
    } catch (err) {
      console.log('Error updating menu:', err);
    }
  };

  const handleDeleteMenu = async (restaurantId, menuId) => {


    try {
      await menuService.deleteMenu(restaurantId, menuId);
      setMenus(prevMenus =>
        prevMenus.filter(menu => menu && menu._id !== menuId)
      );
      setSelectedMenu(null);
      navigate(`/restaurant/${restaurantId}/menu`, { replace: true });
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
           
            <Route
              path="/restaurant"
              element={
                <RestaurantList
                  restaurants={restaurants}
                  handleSelect={handleRestaurantSelect}
                />
              }
            />

            <Route
              path="/restaurant/new"
              element={
                <RestaurantForm
                  handleAddRestaurant={handleAddRestaurant}
                  setSelectedRestaurant={setSelectedRestaurant}
                  user={user}
                />
              }
            />

            <Route
              path="/restaurant/:restaurantId"
              element={
                <RestaurantDetails
                  user={user}
                  handleUpdateRestaurant={handleUpdateRestaurant}
                  handleRestaurantSelect={handleRestaurantSelect}
                  handleDeleterestaurant={handleDeleterestaurant} />}
            />
            <Route
              path="/restaurant/:restaurantId/edit"
              element={
                <RestaurantForm
                  selectedRestaurant={selectedRestaurant}
                  handleUpdateRestaurant={handleUpdateRestaurant}
                  handleAddRestaurant={handleAddRestaurant}
                />
              }
            />


            <Route
              path="/restaurant/:restaurantId/menu"
              element={
                <MenuDetails
                  menus={menus}
                  setMenus={setMenus}
                  handleDeleteMenu={handleDeleteMenu}
                  user={user}
                />
              }
            />

            <Route
              path="/restaurant/:restaurantId/menu/new"
              element={
                <MenuForm
                  handleAddMenu={handleAddMenu}
                  handleUpdateMenu={handleUpdateMenu}
                />
              }
            />

            <Route
              path="/restaurant/:restaurantId/menu/:menuId/edit"
              element={
                <MenuForm
                  handleAddMenu={handleAddMenu}
                  handleUpdateMenu={handleUpdateMenu}
                  user={user}
                  restaurant={selectedRestaurant}
                  handleMenuSelect={handleMenuSelect}
                />
              }
            />
          </>
        ) : (
          <>
           
            <Route
              path="/sign-up"
              element={<SignUp handleSignUp={handleSignUp} user={user} />}
            />
            <Route
              path="/sign-in"
              element={<SignIn handleSignIn={handleSignIn} user={user} />}
            />
          </>
        )}

        <Route
          path="/"
          element={
            <div
              style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem',
                background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
                color: 'white',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  backdropFilter: 'blur(15px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                  maxWidth: '600px',
                  width: '100%',
                }}
              >
                <h1
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  Welcome {user?.username || 'visitor'}
                </h1>

                {user ? (
                  <p
                    style={{
                      fontSize: '1.1rem',
                      opacity: 0.85,
                      maxWidth: '500px',
                      margin: '0 auto',
                    }}
                  >
                    Start your own restaurant and share it with others!
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: '1.1rem',
                      opacity: 0.85,
                      maxWidth: '500px',
                      margin: '0 auto',
                    }}
                  >
                    Sign up or sign in to create a restaurant or to see the list of
                    restaurants with their details.
                  </p>
                )}
              </div>
            </div>
          }
        />



        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  )

}

export default App