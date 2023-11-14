///import { useState } from 'react'
import { Avatar } from 'antd';
import { NavLink, } from 'react-router-dom'
import Styles from './sidebar.module.css';
import { getProfile } from '../../../Redux/auth/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageCloudinary } from '../../Form/cloudinary';
import { updateProfile } from '../../../Redux/auth/AuthActions';
import { useEffect,  } from 'react';
import {jwtDecode} from 'jwt-decode'


const Sidebar = () => {
  const dispatch = useDispatch();


  const {userProfile} = useSelector(state => state.auth)
  
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  useEffect(() => {
      dispatch(getProfile(decoded.id, token))
  }, []);


  const checkIsActive = (path) => {

    return window.location.pathname === path;

  };


  const handleUpdatePhotoProfile = async (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'photo_users');
    const imgUrl = await uploadImageCloudinary(data);
    userProfile.profile_picture = imgUrl;
   
    dispatch(updateProfile(decoded.id, { ...userProfile, profile_picture: imgUrl }))
        .then(() => {
          
        })
        .catch(error => {
            console.log(error.response.data)
        })

};


  return (

    <>

      <div className={Styles.sidebar}>

        <div className={Styles.sidebar__container}>
          <div className={Styles.sidebar__header}>
            <h1 className={Styles.sidebar__title}>Panel de adminisrtración</h1>
            <div className={Styles.sidebar__photoFlex}>
             {userProfile?.profile_picture && userProfile?.admin ?<Avatar src={userProfile?.admin && userProfile?.profile_picture} size={80}/>:  <Avatar size={80} /> }
              <label  className={Styles.button__photo} htmlFor="image">{userProfile?.profile_picture && userProfile?.admin? 'Cambiar de foto' : 'Agregar foto'}</label>
              <input type="file" id='image' style={{display : 'none'}} onChange={handleUpdatePhotoProfile}/>
            </div>

          </div>
          <div className={Styles.sidebar__links}>
            <NavLink className={() => checkIsActive('/admin') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin'><p className={Styles.sidebar__option}>Pendientes</p></NavLink>
            <NavLink className={() => checkIsActive('/admin/posts') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin/posts' ><p className={Styles.sidebar__option}>Publicaciones</p></NavLink>
            <NavLink className={() => checkIsActive('/admin/users') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin/users'><p className={Styles.sidebar__option}>Usuarios</p></NavLink>
            <NavLink className={() => checkIsActive('/admin/questions') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin/questions'><p className={Styles.sidebar__option}>Preguntas</p></NavLink>
            <NavLink className={() => checkIsActive('/admin/coments') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin/coments' ><p className={Styles.sidebar__option}>Comentarios</p></NavLink>
          </div>
        </div>


      </div>
    </>
  )
}



export default Sidebar;