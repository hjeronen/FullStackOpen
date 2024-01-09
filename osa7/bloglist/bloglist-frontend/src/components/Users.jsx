import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      {!users ? null : (
        <Table striped>
          <tbody>
            <tr>
              <th></th>
              <th scope='col'>Blogs created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} className='link'>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default Users
