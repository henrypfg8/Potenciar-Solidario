import Styles from './header.module.css';

export default function Header ({ isScrolled }) {


    return (
        <div className={Styles['HeaderMain']}>

            <div className={Styles['header']} id={isScrolled ? Styles.headerScrolled : ''}>

                <a className={Styles['title']}>
                    Portal <strong> Potenciar Solidario</strong>
                </a>

                <a className={Styles['backButton']}>
                    VOLVER AL INICIO
                </a>

            </div>

        </div>  
    )

}