import { useState } from 'react';
import { Drawer, Button } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { logoutAction } from '../../Redux/auth/AuthActions';
import { useSelector, useDispatch } from 'react-redux'
import {MenuOutlined} from '@ant-design/icons';

const DrawerProfile = () => {

    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const lougout = () => {
        dispatch(logoutAction())
        setOpen(false);
    }
    return (
        <>
            {
                isAuthenticated ? <Button  onClick={showDrawer}
                    style={
                        {
                            position: 'absolute',
                            top: '2rem',
                            right: '0.5rem',
                            zIndex: '1000',
                            color : '#005692',
                            border: '2px solid #005692',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }>
                  <MenuOutlined />
                </Button  > : (
                    <div style={{
              

                    }}>
                        {location.pathname !== '/login' && location.pathname !== '/register' && <NavLink to='/login'><Button style={{
                                                position: 'absolute',
                                                top: '2rem',
                                                right: '0.5rem',
                                                zIndex: '1000',
                                                color : '#005692',
                                                border: '2px solid #005692',
                                                width: '60px',
                                                height: '30px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                        }}>Login</Button></NavLink>}
                    </div>
                )
            }
            <Drawer title="Configuración de tu cuenta" placement="right" onClose={onClose} open={open}>
               
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',

                    height: '100%'

                }}>
                    <NavLink onClick={() => setOpen(false)} to="/profile">Ver Perfil</NavLink>
                    <NavLink onClick={lougout} to='/login'>Salir de sesión</NavLink>
                </div>

            </Drawer>
        </>
    );
};


export default DrawerProfile