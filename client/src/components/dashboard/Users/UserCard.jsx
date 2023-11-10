
import proptypes from 'prop-types'

const UserCard = ({user}) => {
    return (
        <tbody>
            <tr>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.birth_date}</td>
                <td>{user.habitual_location_of_residence}</td>
            </tr>
        </tbody>
    )
}

UserCard.propTypes = {
    user: proptypes.object.isRequired
}
export default UserCard