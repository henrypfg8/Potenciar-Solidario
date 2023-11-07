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
    const [success, setSuccess] = useState(false)
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !isAuthenticated) {
            // Si no hay token o el estado no está autenticado, redirigir a login
            navigate('/login');
        } else {
            const decodedToken = jwtDecode(token); // Decodificar el token y obtener el id del usuario
            console.log(decodedToken.id)
            dispatch(getProfile(decodedToken.id))
                .then(() => {
            
                 }).catch((error) => {
                    console.log(error.response.data);
                 })
        }
    }, [dispatch, isAuthenticated, navigate])

 

    if (!userProfile) return null;
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