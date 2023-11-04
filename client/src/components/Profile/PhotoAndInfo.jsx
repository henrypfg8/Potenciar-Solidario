import { useState } from 'react'
import proptypes from 'prop-types'
import { deleteProfile } from '../../Redux/auth/AuthActions';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Avatar,   } from 'antd';
import {useDispatch}from 'react-redux'
import { UserOutlined } from '@ant-design/icons';


const PhotoAndInfo = ({ userProfile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirmacion = 'Deseas Eliminar tu cuenta? Ya no podras recuperarla y se borraran todas tus publicaciones';

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleDeleteAccount = () => {
        dispatch(deleteProfile(userProfile.id))
            .then(() => {
                navigate('/register');
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
    return (
        <div className='profile__container--info'>
            <div>
                <div className='profile__avatar'>
                    {userProfile.photo_profile ? <Avatar size={87} src={userProfile.photo_profile}  
                    /> : <Avatar icon={<UserOutlined/>} size={87}/>}
               
                </div>
               
                <div className='profile__info'>
                    <h2>Sobre mí</h2>
                    <div className='profile__description'>
                        <p>{userProfile.description}</p> 
                    </div>
                </div>
            </div>
            <div>
                <Modal
                    title={`${confirmacion}`}
                    open={isModalOpen}
                    onCancel={handleClose}
                    cancelText='Cancelar'
                    cancelButtonProps={{
                    style : {
                        backgroundColor: '#fff',
                        color: '#005692',
                        border: '1px solid #005692',
                     }
                    }}
                    okText='Sí, Eliminar'
                    onOk={handleDeleteAccount}
                    okButtonProps={{ danger: true }} />
                <Button danger title='Eliminar cuenta'
                    style={{
                        marginLeft : '1rem'
                    }}
                    onClick={showModal}>
                    Eliminar cuenta
                </Button>
            </div>
        </div>
    )
}

PhotoAndInfo.propTypes = {
    userProfile: proptypes.object.isRequired
}
export default PhotoAndInfo