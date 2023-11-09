import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/dashboard/Dashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import SearchDashBoard from '../../components/dashboard/SearchDashBoard';
//import DrawerSideBar from '../../components/dashboard/DrawerSideBar';
import './admin.css';

const Admin = () => {
    const [search, setSearch] = useState('');
    const [listSearchPost, setListSearchPost] = useState([]);
    const { isAuthenticated, } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !isAuthenticated) {
            // Si no hay token o el estado no está autenticado, redirigir a login
            navigate('/login');
            return
        } 
    }, [dispatch, isAuthenticated, navigate])


    return (
        <div >
          
            <div className='admin__container'>
                {/* <DrawerSideBar/> */} {/*Opcion 2 */}
                < Sidebar
     

                />
                <Dashboard
                    search={search}
                    setSearch={setSearch}
                    listSearchPost={listSearchPost}
                 
                    setListSearchPost={setListSearchPost}
             
                />
            </div>

        </div>
    )
}

export default Admin