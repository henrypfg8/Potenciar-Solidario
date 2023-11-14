import {useEffect,} from 'react'

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
            <tr  className={Styles.users__tr}>
              <th></th>
              <th className={Styles.users__td}>Nombre</th>
              <th className={Styles.users__td}>Apellido</th>
              <th className={Styles.users__td}>Correo</th>
              <th className={Styles.users__td}>Naciemineto</th>
              <th className={Styles.users__td}>País</th>
              <th className={Styles.users__td}>Telefono</th>
              <th></th>
              <th></th>
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