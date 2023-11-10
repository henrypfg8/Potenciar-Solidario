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
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Naciemineto</th>
              <th>País</th>
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