
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../Redux/auth/AuthActions';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import UserPostCard from '../../components/UserPosts/UserPostCard';
import Styles from './userPosts.module.css'


const UserPostsView = () => {
    const { isAuthenticated, userProfile } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [refreshData, setRefreshData] = useState(false)
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
    }, [dispatch, isAuthenticated,refreshData])


    return (
        <div className={Styles.user__pulblications__container}>
            {userProfile.Publications && (<h1 className={Styles.user__title}>Mis Publicaciones</h1>)}
            <div className={Styles.user__pulblications__grid}>
                {!userProfile.Publications ? <h1>Aún no tienes publicaciones</h1> : userProfile.Publications?.map(post => {
                    return (
                        <UserPostCard 
                        refreshData={refreshData}
                        setRefreshData={setRefreshData}
                        key={post.id} post={post} />
                    )
                })}
            </div>
            <div>

            </div>
            <div className={Styles.user__publication__btn}>
                <button

                    className={Styles.user__button_add}
                    onClick={() => navigate('/formulario')}>+</button>
            </div>
        </div>
    )
}

export default UserPostsView