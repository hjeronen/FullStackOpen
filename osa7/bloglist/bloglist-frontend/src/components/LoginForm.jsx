import { Button, Container, Form } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <Form onSubmit={handleLogin} className='form'>
      <h2>Login to the application</h2>
      <Form.Group className='form-group'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group className='form-group'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Form.Group className='form-group'>
        <Button id='loginButton' type='submit'>
          Login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
