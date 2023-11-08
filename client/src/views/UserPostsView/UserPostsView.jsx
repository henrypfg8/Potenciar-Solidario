
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../Redux/auth/AuthActions';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import UserPostCard from '../../components/UserPosts/UserPostCard';
import  Styles from './userPosts.mudule.css'

const UserPostsView = () => {
    const { isAuthenticated, userProfile } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const token = localStorage.getItem('token');
    useEffect(() => {
      
        if (!token || !isAuthenticated) {
            // Si no hay token o el estado no está autenticado, redirigir a login
            navigate('/login');
        } else {
            const decodedToken = jwtDecode(token); // Decodificar el token y obtener el id del usuario
            dispatch(getProfile(decodedToken.id, token))
                .then(() => {

                }).catch((error) => {
                    console.log(error);
                })
        }
    }, [dispatch, isAuthenticated])

   

 
    return (
        <div>
            {userProfile.Publications && (<h1>Mis Publicaciones</h1>)}
            <div className={Styles.user__pulblications__container}>
                {!userProfile.Publications ? <h1>Aún no tienes publicaciones</h1> : userProfile.Publications?.map(post => {
                    return (
                        <UserPostCard key={post.id} post={post} />
                    )
                })}
            </div>

        </div>
    )
}

export default UserPostsView