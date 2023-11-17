import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../Redux/auth/AuthActions';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import DataProfile from '../../components/Profile/DataProfile';
import PhotoAndInfo from '../../components/Profile/PhotoAndInfo';
import './Profile.css'

const ProfileView = () => {
    const { isAuthenticated, userProfile } = useSelector(state => state.auth);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Estados para, mostrar exito
    const [success, setSuccess] = useState(false)
    //Obtener el token
    const token = localStorage.getItem('token');
    //Escucha si no hay token o no esta autenticado
    useEffect(() => {
       
       if(!token || !isAuthenticated){
           navigate('/login')
            //redirigir al login si no hay token o no esta autenticado
       }
       else{

        const decoded = jwtDecode(token);
        //De lo contrario, obtener el usuario, por el dispatch
        dispatch(getProfile(decoded.id, token)).then(() =>{
            console.log(userProfile)
        })
        .catch(error => {
          return(error.response.data)
        })

       }
    }, [isAuthenticated, token])

 

    if (!userProfile) return null; // retornar null si no existen los datos del usuario
  
    return (
        <>
      
            <div className='profile__container'>
                <PhotoAndInfo userProfile={userProfile}
                 success={success}
                 setSuccess={setSuccess} />
                <DataProfile userProfile={userProfile}
                    success={success}
                    setSuccess={setSuccess} />
            </div>
        </>
    )
}

export default ProfileView