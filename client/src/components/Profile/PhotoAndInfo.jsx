import { useState } from 'react'
import proptypes from 'prop-types'
import { deleteProfile } from '../../Redux/auth/AuthActions';
import { Modal, Button, Avatar, } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined, } from '@ant-design/icons';
import Swiper from '../Form/Swiper';
import { updateProfile } from '../../Redux/auth/AuthActions';
import { uploadImageCloudinary } from '../Form/cloudinary';


const PhotoAndInfo = ({ userProfile,}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteSuccess } = useSelector(state => state.auth)
   
    const dispatch = useDispatch();

    // Mensaje de confirmación para eliminar la cuenta
    const confirmacion = 'Deseas Eliminar tu cuenta? Ya no podras recuperarla y se borraran todas tus publicaciones';

    // Función para abrir el modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleClose = () => {
        setIsModalOpen(false);
    };

    // Función para eliminar la cuenta
    const handleDeleteAccount = () => {
        dispatch(deleteProfile(userProfile.id))
            .then(() => {
                
        
            })
            .catch(error => {
                console.log(error.response.data)
               
            })
    }

    // Actualizar la foto de perfil
    const handleUpdatePhotoProfile = async (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('upload_preset', 'photo_users');
        const imgUrl = await uploadImageCloudinary(data);
        userProfile.profile_picture = imgUrl;

        dispatch(updateProfile(userProfile.id, { ...userProfile, profile_picture: imgUrl }))
            .then(() => {

            })
            .catch(error => {
                console.log(error.response.data)
            })

    };

    return (
        <div className='profile__container--info'>
          
            
            <div>
                <div className='profile__avatar'>
                    {userProfile.profile_picture ?
                        <div className='profile__picture--div'>
                            <Avatar
                                size={87}
                                defaultValue={userProfile.profile_picture}
                                src={userProfile.profile_picture}
                                alt="image-profile"
                                style={{ objectFit: 'contain' }} />
                        </div> : 
                        <Avatar
                            size={87}
                            icon={<UserOutlined />} />}

                    <div className="profile__upload--wrapper">
                        <input type="file" id="file-upload" accept="image/*" style={{ display: 'none' }} onChange={handleUpdatePhotoProfile} />
                        <label htmlFor="file-upload" className="profile__upload--label "><span>&#9998;</span></label>
                    </div>
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
                        style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
                    }}
                    okText='Sí, Eliminar'
                    onOk={handleDeleteAccount}
                    okButtonProps={{ danger: true }} />
                <Button danger title='Eliminar cuenta'
                    style={{ marginLeft: '1rem' }}
                    onClick={showModal}>
                    Eliminar cuenta
                </Button>
            </div>
        </div>
    )
}

PhotoAndInfo.propTypes = {
    userProfile: proptypes.object.isRequired,
 
}
export default PhotoAndInfo