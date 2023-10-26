import Styles from './leftBar.module.css';
//
import { useLocation, Link } from 'react-router-dom';

export default function LeftBar () {

    const { pathname } = useLocation();


    return (
        <div className={Styles.LeftBar}>
            
            <div className={Styles.NavigationButtons}>
                <Link to='/' className={Styles.LeftBar__button} id={pathname === '/' ? Styles.active : ''}>
                    PUBLICACIÓNES Y AVISOS
                </Link>
                <Link to='/foro' className={Styles.LeftBar__button} id={pathname === '/foro' ? Styles.active : ''}>
                    FORO
                </Link> 
            </div>

            {
                pathname === '/foro' ?
                <Link to='/formulario' className={Styles.LeftBar__button}>
                    REALIZAR COMENTARIO O PREGUNTA
                </Link>
                :
                <Link to='/foro/crear' className={Styles.LeftBar__button}>
                    REALIZAR AVISO O PUBLICACIÓN
                </Link>
            }
            

            

      

        </div>
    )

}