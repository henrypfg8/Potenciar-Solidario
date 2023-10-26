import Styles from './home.module.css';
//
import Cards from '../../components/Cards/Cards';
import LeftBar from '../../components/LeftBar/LeftBar';


export default function Home () {

    

    return (
        <div className={Styles.Home}>
          
            <LeftBar />

            <Cards />


        </div>
    )

}