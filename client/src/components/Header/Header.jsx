import Styles from './header.module.css';
import { useLocation, Link } from 'react-router-dom';

export default function Header ({ isScrolled }) {

    const { pathname } = useLocation();


    return (
        <div className={Styles['HeaderMain']}>

            <div className={Styles['header']} id={isScrolled ? Styles.headerScrolled : ''}>

                <a className={Styles['title']}>
                    Portal <strong> Potenciar Solidario</strong>
                </a>
              

                {
                    pathname.includes('/foro') ?  

                    (
                        pathname === '/foro' ?
                        (<Link className={Styles.backButton}>
                            VOLVER AL INICIO
                        </Link>)
                        :
                        (<Link to='/foro' className={Styles.backButton}>
                            VOLVER AL FORO
                        </Link>)
                    )

                    :

                    (
                        pathname === '/formulario' ? 
                        (<Link to='/' className={Styles.backButton}>
                            VOLVER A LA CARTELERA
                        </Link>)
                        :
                        (<Link className={Styles.backButton}>
                            VOLVER AL INICIO
                        </Link>)
                    )       

                }

                
            </div>

        </div>  
    )

}