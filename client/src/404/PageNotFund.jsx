import Styles from './pageNotFound.module.css'
import {NavLink} from 'react-router-dom'




const PageNotFund = () => {

 
  return (
    <div className={Styles.container}>
        <div className={Styles.divFlex}>
            <h1 className={Styles.title}>Esta Pagina no existe</h1>
            <div className={Styles.divEnlace}>
              <NavLink to='/' className={Styles.enlace}>Vlover al inicio</NavLink>
            </div>
        </div>
    </div>
  )
}

export default PageNotFund