import { useState } from 'react';
import { Drawer, Button } from 'antd';
import { NavLink, useLocation, } from 'react-router-dom';
import { logoutAction } from '../../Redux/auth/AuthActions';
import { useSelector, useDispatch } from 'react-redux'
import { MenuOutlined } from '@ant-design/icons';
import Styles from './profile.module.css';

const DrawerProfile = () => {

    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Función para abrir el drawer
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const lougout = () => {
        dispatch(logoutAction())
        setOpen(false);
    };


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
                    <NavLink onClick={() => setOpen(false)} to='/'><p className='P__navLink'>Volver al inicio</p></NavLink>
                    <NavLink onClick={lougout} to='/login'><p className='P__navLink'>Salir de sesión</p></NavLink>

                </div>

            </Drawer>
        </>
    );
};


export default DrawerProfile