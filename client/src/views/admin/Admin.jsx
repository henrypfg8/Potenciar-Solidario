import {  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar/Sidebar';
import './admin.css';

const Admin = () => {
    const { isAuthenticated, userProfile, isAdmin} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !isAuthenticated  ) {
            // Si no hay token o el estado no está autenticado, redirigir a login
            navigate('/login');
            return
        } 
    }, [dispatch, isAuthenticated, navigate]);


    useEffect(() => {
 
        if (!userProfile.admin || !isAdmin ) {
            
            // Si no hay token o el estado no está autenticado, redirigir a login
          
            return
        } 
        
    }, [dispatch, isAuthenticated, navigate]);
 

    return (
        <div >
    
            <div className='admin__container'>
                < Sidebar />  
                <Outlet/> 
            </div>
           
        </div>
    )
}

export default Admin