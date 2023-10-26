import Styles from './posts.module.css';
//
import Post from '../Post/Post';
import SearchBar from '../SearchBar/SearchBar';


export default function Cards () {

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15]

  return (
    <div className={Styles.Publications}>

      <h1 style={{marginTop: '10px'}}>Publicaciones del muro</h1>

      <SearchBar />

      <div className={Styles.Cards}>
        {
          cards?.map(e => (
            <Post key={e}/>
          ))
        }
      </div>
      
    </div>
  )
    
}