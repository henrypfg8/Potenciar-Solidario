
import proptypes from 'prop-types'
import Styles from './users.module.css' 
const UserCard = ({user}) => {
    return (
        <tbody className={Styles.users__body} >
            <tr>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.birth_date}</td>
                <td>{user.habitual_location_of_residence}</td>
                <td>{user.phone}</td>
            </tr>
        </tbody>
    )
}

UserCard.propTypes = {
    user: proptypes.object.isRequired
}
export default UserCard