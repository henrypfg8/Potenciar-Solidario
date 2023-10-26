import Styles from './pageHeader.module.css';
//
import { useEffect, useRef } from 'react';


export default function PageHeader () {

 
    
    return (
        <div className={Styles['PageHeader']} ref={PageHeader}>
            <div className={Styles.PageHeader__Title}>
                <p className={Styles.title}>CARTELERA</p>
            </div>

            <div className={Styles.PageHeader__Description}>
                <p>
                    Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina. Esta es la descripcion de la pagina.
                </p>
            </div>
            
        </div>
    )

}