import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/dashboard/Dashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import {jwtDecode} from 'jwt-decode';
//import DrawerSideBar from '../../components/dashboard/DrawerSideBar';
import './admin.css';

const Admin = () => {
    const [search, setSearch] = useState('');
    const [listSearchPost, setListSearchPost] = useState([]);
    const [userId, setUserId] = useState('');
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !isAuthenticated) {
            // Si no hay token o el estado no está autenticado, redirigir a login
            navigate('/login');
        } else {
            const token = localStorage.getItem('token')
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken)
           
        }
    }, [isAuthenticated, navigate, setUserId])


    return (
        <div >
            
            <div className='admin__container'>
                {/* <DrawerSideBar/> */} {/*Opcion 2 */}
                < Sidebar
                    search={search}
                    setSearch={setSearch}
                    listSearchPost={listSearchPost}
                    setListSearchPost={setListSearchPost}

                />
                <Dashboard
                    search={search}
                    setSearch={setSearch}
                    listSearchPost={listSearchPost}
             
                />
            </div>

        </div>
    )
}

export default Admin