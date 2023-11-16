import { useEffect, useState } from 'react';
import { Drawer, Button } from 'antd';
import { NavLink, useLocation, } from 'react-router-dom';
import { logoutAction } from '../../Redux/auth/AuthActions';
import { useSelector, useDispatch } from 'react-redux'
import { MenuOutlined } from '@ant-design/icons';
import Styles from './profile.module.css';
import { getProfile } from '../../Redux/auth/AuthActions';
import {jwtDecode} from 'jwt-decode'


const DrawerProfile = () => {
  const { isAuthenticated, userProfile, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const location = useLocation();


    const token = localStorage.getItem('token');

    useEffect(() => {

        if(token){
            const decoded = jwtDecode(token);
            
            dispatch(getProfile(decoded.id, token))
        }
    }, []);

 

   
    // Función para abrir el drawer
    const showDrawer = () => {
        setOpen(true);
    };

  const lougout = () => {
    dispatch(logoutAction());
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false)
  }

    return (
        <>
            {
                isAuthenticated ? <Button
                    onClick={showDrawer}
                    className={Styles.profileButtonDrawer}
                >
                    <MenuOutlined />
                </Button  > : (
                    <div>
                        {location.pathname !== '/login' && location.pathname !== '/register' && <NavLink to='/login'><Button className={Styles.profileButtonLogin}>Login</Button></NavLink>}
                    </div>
                )
            }
            <Drawer title="Configuración de tu cuenta" placement="right" onClose={onClose} open={open}>

                <div className='profile__drawer--links' >
                    <NavLink onClick={() => setOpen(false)} to="/profile"> <p className='P__navLink'>Ver Perfil</p></NavLink>
                    <NavLink onClick={() => setOpen(false)} to='/profile/posts'><p className='P__navLink'>Publicaciones</p></NavLink>
                    { userProfile?.admin || isAdmin ? (
                           <div>
                             <NavLink onClick={() => setOpen(false)} to='/admin'><p className='P__navLink'>Admin</p></NavLink>
                           </div>
                    ) : () => {
                       
                    }}
                    <NavLink onClick={() => setOpen(false)} to='/'><p className='P__navLink'>Volver al inicio</p></NavLink>
                    <NavLink onClick={lougout} to='/login'><p className='P__navLink'>Salir de sesión</p></NavLink>

                </div>

            </Drawer>
        </>
    );
};

export default DrawerProfile;
