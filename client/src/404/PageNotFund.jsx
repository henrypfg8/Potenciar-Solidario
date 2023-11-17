import Styles from './pageNotFound.module.css'
import { NavLink, useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react';
import Oval_Loader from '../assets/Oval_Loader';

const PageNotFund = () => {
  const { pathname } = useLocation(); 

  //un louder que  empiza en false, para caragar un spiner
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, []);


  return (
    <>
      {isLoading ? <Oval_Loader /> : (
        <div className={Styles.container}>
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
    </>
  )
}

export default PageNotFund