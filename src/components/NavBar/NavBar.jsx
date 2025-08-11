import { Link } from 'react-router-dom'

const NavBar = (props) => {

  return (
    <nav>
      <ul>
        <li><Link to="/"> Home </Link></li>
        {props.user ? (
          <>
            <li><Link to="/restaurant">Restaurants</Link></li>
 
          <li>Welcome {props.user.username}</li>
          <li><Link to='/' onClick={props.handleSignOut}>Sign Out</Link></li>
          <li><Link to='/restaurant/new'>Create a New Restaurant</Link></li>
        </>
        ) : (
          <>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar 