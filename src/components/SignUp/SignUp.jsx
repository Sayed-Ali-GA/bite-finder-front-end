import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const SignUp = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
    passwordConf: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)


  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  // made this function asynchronous
  const handleSubmit = async (evt) => {
    evt.preventDefault()  
    // saved the return as "result"
    const result = await props.handleSignUp(formData)
    // if sign up is succssful, navigate to home
    if (result.success){
      navigate('/')
    } else {
      // otherwise, set the error message state 
      setError(result.message)
    }
  }

  let formIsInvalid = true

  if (formData.username && formData.password && formData.password === formData.passwordConf) {
    formIsInvalid = false
  }

  return (
 <main 
    className="d-flex justify-content-center align-items-center min-vh-100"
    style={{
      background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
      padding: '2rem'
    }}
  >
    <Card 
      className="border-0"
      style={{ 
        maxWidth: '400px', 
        width: '100%', 
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.07)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
      }}
    >
      <Card.Header 
        className="text-center border-0 py-4"
        style={{ 
          borderTopLeftRadius: '20px', 
          borderTopRightRadius: '20px',
          background: 'transparent'
        }}
      >
        <h1 
          className="mb-0" 
          style={{ 
            fontSize: '2.8rem', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}
        >
          Sign Up
        </h1>
      </Card.Header>
      
      <Card.Body className="p-4">
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label 
              className="fw-semibold"
              style={{ color: 'white', opacity: '0.9' }}
            >
              Username
            </Form.Label>
            <Form.Control 
              type="text" 
              name='username'
              id='username' 
              placeholder="Enter your username" 
              onChange={handleChange}
              className="border-0"
              style={{ 
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'scale(1.02)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label 
              className="fw-semibold"
              style={{ color: 'white', opacity: '0.9' }}
            >
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name='password'
              id='password'
              placeholder="Enter your password"
              onChange={handleChange}
              className="border-0"
              style={{ 
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'scale(1.02)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label 
              className="fw-semibold"
              style={{ color: 'white', opacity: '0.9' }}
            >
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              name="passwordConf"
              id='passwordConf'
              placeholder="Confirm your password"
              onChange={handleChange}
              className="border-0"
              style={{ 
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'scale(1.02)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </Form.Group>

          <div className="d-grid gap-2 mt-4">
            <Button 
              type="submit" 
              disabled={formIsInvalid}
              size='lg'
              className="border-0 fw-bold"
              style={{ 
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '1.1rem',
                background: formIsInvalid 
                  ? 'rgba(108, 117, 125, 0.5)' 
                  : 'linear-gradient(135deg, #FF6A00, #EE0979)',
                color: 'white',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                letterSpacing: '0.5px',
                opacity: formIsInvalid ? '0.6' : '1',
                cursor: formIsInvalid ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!formIsInvalid) {
                  e.target.style.opacity = '0.9';
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!formIsInvalid) {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }
              }}
            >
              Sign Up
            </Button>
          </div>
        </Form>
        
        <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <p className="mb-2" style={{ color: 'white', opacity: '0.8', fontSize: '0.9rem' }}>
            Already have an account?
          </p>
          <a 
            href="sign-in" 
            style={{
              color: '#FF6A00',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            Go to Sign In Form
          </a>
        </div>
      </Card.Body>
    </Card>
  </main>
  )
}

export default SignUp