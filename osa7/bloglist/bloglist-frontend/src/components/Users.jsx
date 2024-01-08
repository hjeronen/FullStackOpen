import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {!users ? null : (
        <table>
          <tbody>
            <tr>
              <td></td>
              <th scope='col'>blogs created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
