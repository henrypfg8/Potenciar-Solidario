import { useState } from 'react'
import Dashboard from '../../components/dashboard/Dashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import DrawerSideBar from '../../components/dashboard/DrawerSideBar';
import './admin.css';


const Admin = () => {
    const [search, setSearch] = useState('');
    const [listSearchPost, setListSearchPost] = useState([]);
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