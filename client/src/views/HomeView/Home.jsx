import Styles from './home.module.css';
//
import Posts from '../../components/Posts/Posts';
import LeftBar from '../../components/LeftBar/LeftBar'
import SearchBar from '../../components/SearchBar/SearchBar'
//
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
//
import { getPosts } from '../../Redux/actions';



export default function Home () {

    const dispatch = useDispatch();
    
 
    

    return (
        <div className={Styles.HomeView}>



            <LeftBar />

            <Posts />
                
            
            
        </div>
    )

}