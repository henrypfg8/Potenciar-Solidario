
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../Redux/auth/AuthActions';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const UserPostsView = () => {
    const { isAuthenticated,userProfile } = useSelector(state => state.auth);
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    
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
                    setPosts(userProfile.Posts)
                 }).catch((error) => {
                    console.log(error.response.data);
                 })
        }
    }, [dispatch, isAuthenticated, navigate, userProfile.Posts])
   
  return (
    <div>
        {!posts ? <h1>Aún no tienes publicaciones</h1> : posts?.map(post => {
            return <div key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
            </div>
        })}
    </div>
  )
}

export default UserPostsView