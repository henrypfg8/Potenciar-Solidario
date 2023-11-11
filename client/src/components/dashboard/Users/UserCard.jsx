import { useDispatch } from 'react-redux'
import proptypes from 'prop-types'
import Styles from './users.module.css';
import { Modal, Avatar } from 'antd'
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../../Redux/actions/usersActions';
import { UserOutlined, } from '@ant-design/icons';


const UserCard = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshData, setRefreshData] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
    }, [refreshData])

    // Función para abrir el modal
    const showModal = () => {
        setIsModalOpen(true);

    };

    // Función para cerrar el modal
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleDeleteUserById = (id) => { 
        // hacer el dispatch de la acción para eliminar el usuario de la base de datos
        setRefreshData(true)
        dispatch(deleteUser(id))
            .then(() => {
                setIsModalOpen(false)
                setRefreshData(false)
            })
            .catch(() => {
                setIsModalOpen(false)
                setRefreshData(false)

            })


    }

    return (
        <>
            
            <tbody className={Styles.users__body} >
                <tr className={Styles.users__tr}>
                    <td className={Styles.users__td} data-label='Foto'>{user.profile_picture ? <Avatar src={user.profile_picture} size={45} /> : <Avatar size={45} icon={<UserOutlined />} />}</td>
                    <td className={Styles.users__td} data-label='Nombre'>{user.name}</td>
                    <td className={Styles.users__td} data-label="Apellido">{user.lastname}</td>
                    <td className={Styles.users__td} data-label="Correo">{user.email}</td>
                    <td className={Styles.users__td} data-label="Nacimiento">{user.birth_date}</td>
                    <td className={Styles.users__td} data-label="País">{user.habitual_location_of_residence}</td>
                    <td className={Styles.users__td} data-label="Telefono">{user.phone}</td>
                    <td>
                        <button
                            onClick={showModal}
                            className={Styles.users__btn__delete}>
                            <i className={`fa fa-trash ${Styles.users__trash_icon}`} aria-hidden="true"></i>
                        </button>
                        <Modal
                            title="Deseas eliminar este usuario? Ya no podrás recuperarlo"
                            open={isModalOpen}
                            onCancel={handleClose}
                            cancelText="Cancelar"
                            okText="Sí,Eliminar"
                            onOk={() => handleDeleteUserById(user.id)}
                            cancelButtonProps={{
                                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
                            }}
                            okButtonProps={{ danger: true }}
                        />
                       
                    </td>
                </tr>
            </tbody>

        </>
    )
}

UserCard.propTypes = {
    user: proptypes.object.isRequired
}
export default UserCard