import Styles from './searchBar.module.css';
//
import { useRef } from 'react';


export default function SearchBar () {

    

    return (
        
        <div className={Styles['SearchBar']}>
            <input className={Styles['searchBar__input']} placeholder='Buscar por titulo o descripcion'></input>
        </div>
        
    )
        
       

}