import Styles from './home.module.css';
//
import Cards from '../../Cards/Cards';
import LeftBar from '../LeftBar/LeftBar';


export default function Home () {

    

    return (
        <div className={Styles.Home}>
          
            <LeftBar />

            <Cards />


        </div>
    )

}