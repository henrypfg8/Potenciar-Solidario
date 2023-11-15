import Styles from './pageNotFound.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import Spinner from '../components/auth/spinner/Spinner';


const PageNotFund = () => {
  const { pathname } = useLocation();


  return (
    <div className={Styles.container}>
      {Spinner ? <Spinner /> : (
        <div>
          {pathname === '/admin' ? (
            <div className={Styles.divFlex}>
              <h2 className={Styles.title}>No tenes permiso para entrar a esta pagina</h2>
              <div className={Styles.divEnlace}>
                <NavLink to='/' className={Styles.enlace}>Vlover al inicio</NavLink>
              </div>
            </div>
          ) : (
            <div className={Styles.divFlex}>
              <h1 className={Styles.title}>404</h1>
              <h2 className={Styles.title}>Esta Pagina no existe</h2>
              <div className={Styles.divEnlace}>
                <NavLink to='/' className={Styles.enlace}>Vlover al inicio</NavLink>
              </div>
            </div>
          )}
        </div>
      )
      }
    </div>
  )
}

export default PageNotFund