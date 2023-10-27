import Styles from './posts.module.css';
//
import Post from '../Post/Post';
import SearchBar from '../SearchBar/SearchBar';


export default function Posts () {

  


  return (
    <div className={Styles.Posts}>

      <h1 style={{marginTop: '10px'}}>Publicaciones de la cartelera</h1>

      <SearchBar />

      <div className={Styles.Cards}>
        
      </div>
      
    </div>
  )
    
}
