import Styles from './leftBar.module.css';

export default function LeftBar () {

    const arr = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <div className={Styles['LeftBar']}>
            
            {
                arr?.map(e => (
                    <div className={Styles['LeftBar__button']} key={e}> 
                     
                    </div>
                ))
            }

        </div>
    )

}