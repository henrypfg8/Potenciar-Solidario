import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import Styles from './users.module.css' 
import {useDispatch, useSelector} from 'react-redux'
import { getUsers } from '../../../Redux/actions/usersActions'
import UserCard from './userCard'
const Users = () => {

  const dispatch = useDispatch()
  const {users} = useSelector(state => state.users)
  

  useEffect(() =>{
    dispatch(getUsers())
  }, [])

  return (
    <div className={Styles.users__container}>
      <div className={Styles.users__flex}>
        <table className={Styles.users__table}>
          <thead className={Styles.users__head}>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Naciemineto</th>
              <th>País</th>
              <th>Telefono</th>
            </tr>
          </thead>
          {users && users?.map(user => {
            return (
              <UserCard key={user.id} user={user}/>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default Users