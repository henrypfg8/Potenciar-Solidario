import Styles from './home.module.css';
//
import Posts from '../../components/Posts/Posts';
import LeftBar from '../../components/LeftBar/LeftBar';


export default function Home () {

    

    return (
        <div className={Styles.Home}>
          
            <LeftBar />

            <Posts />


        </div>
    )

}