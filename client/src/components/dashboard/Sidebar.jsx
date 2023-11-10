import { useState } from 'react'
import { Divider, Avatar } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom'
import Styles from './dashboard.module.css'


const Sidebar = () => {
  const [imageAdmin, setImageAdmin] = useState('')
  const checkIsActive = (path) => {
    return window.location.pathname === path;
  };

  return (

    <>

      <div className={Styles.sidebar}>

        <div className={Styles.sidebar__container}>
          <div className={Styles.sidebar__header}>
            <h1 className={Styles.sidebar__title}>Panel de adminisrtración</h1>
            <Avatar sx={{ width: 80, height: 80 }} />
          </div>

          <div className={Styles.sidebar__links}>
            <NavLink className={() => checkIsActive('/admin') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin'><p className={Styles.sidebar__option}>Publicaciones</p></NavLink>
            <NavLink className={() => checkIsActive('/admin/users') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin/users'><p className={Styles.sidebar__option}>Usuarios</p></NavLink>
            <NavLink className={() => checkIsActive('/admin/questions') ? Styles.bg_activo : Styles.bg_noActivo} to='/admin/questions'><p className={Styles.sidebar__option}>Preguntas</p></NavLink>
          </div>
        </div>


      </div>
    </>
  )
}



export default Sidebar