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

      <div className='sidebar'>

        <div className='sidebar__container'>

          <h1 className='sidebar__title'>Panel de adminisrtración</h1>
          <Avatar sx={{ width: 100, height: 100 }} />
          <div className={Styles.sidebar__links}>
            <NavLink  className={() => checkIsActive('/admin') ? Styles.bg_activo : ''} to='/admin'>Publicaciones</NavLink>
            <NavLink  className={() => checkIsActive('/admin/users') ? Styles.bg_activo : ''}to='/admin/users'>Usuarios</NavLink>
            <NavLink  className={() => checkIsActive('/admin/questions') ? Styles.bg_activo : ''}to='/admin/questions'>Preguntas</NavLink>
          </div>
        </div>


      </div>
    </>
  )
}



export default Sidebar