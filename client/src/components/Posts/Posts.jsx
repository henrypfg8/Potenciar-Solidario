import Styles from './posts.module.css';
//
import Post from '../Post/Post';
//
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';


export default function Posts () {

  const posts = useSelector(state => state.posts.posts);
  const [ postsLocal, setPostsLocal ] = useState(posts);

  console.log(postsLocal);

  useEffect(() => {
    setPostsLocal(posts);
    
  }, [posts])

  return (
    <div className={Styles.Posts}>

      <h1 style={{marginTop: '10px'}}>Publicaciones de la cartelera</h1>


      <div className={Styles.Cards}>
        {postsLocal?.map(({ id, title, organization, category, description }) => (
          <Post 
            key={id}
            id={id}
            title={title}
            organization={organization}
            category={category}
            description={description}
          />
        ))}
      </div>
      
    </div>
  )
    
}
