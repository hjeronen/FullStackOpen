import { Button, Container, Nav, Navbar } from 'react-bootstrap'

const Navigation = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand='sm' variant='dark'>
      <Container fluid='md'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <Navbar.Brand href=''>Bloglist</Navbar.Brand>
            {user && (
              <>
                <Nav.Link href='/'>Blogs</Nav.Link>
                <Nav.Link href='/users'>Users</Nav.Link>
                <Navbar.Text>{user.name} logged in</Navbar.Text>
                <Nav.Item>
                  <Button onClick={handleLogout}>Logout</Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
