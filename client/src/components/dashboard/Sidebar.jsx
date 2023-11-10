import { useState } from 'react'
import {Divider,Avatar} from '@mui/material';
import {NavLink, Outlet} from 'react-router-dom'
import Styles from './dashboard.module.css'


const Sidebar = () => {
  const [imageAdmin, setImageAdmin] = useState('')


  return (

    <>
      
    <div className='sidebar'>

      <div className='sidebar__container'>

        <h1 className='sidebar__title'>Panel de adminisrtración</h1>
        <Avatar sx={{ width: 100, height: 100 }} />
        <div className={Styles.sidebar__links }>
            <NavLink className={({isActive}) => isActive ?Styles.bg_activo : ''} to='users'>Usuarios</NavLink>
            <NavLink className={({isActive}) => isActive ?Styles.bg_activo : ''} to='dashboard'>DashBoard</NavLink>
        </div>
      </div>

      
    </div>
    </>
  )
}



export default Sidebar