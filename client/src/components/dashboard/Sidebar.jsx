import { useState } from 'react'
import {Divider,Avatar} from '@mui/material'
import SearchDashBoard from './SearchDashBoard';
import {NavLink} from 'react-router-dom'
import Styles from './dashboard.module.css'


const Sidebar = ({search, setSearch,listSearchPost, setListSearchPost}) => {
  const [imageAdmin, setImageAdmin] = useState('')

  return (

    <>    
    <div className='sidebar'>

      <div className='sidebar__container'>
        <Divider/>
        <h1 className='sidebar__title'>Panel de adminisrtración</h1>
        <Avatar sx={{ width: 100, height: 100 }} />
        <div>

        </div>
      </div>
    </div>
    </>
  )
}



export default Sidebar