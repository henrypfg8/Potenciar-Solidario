import Styles from './posts.module.css';
//
import Post from '../Post/Post';
//
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
//



export default function Posts () {

  
  

  const posts = useSelector(state => state.posts.posts);
  return (
    <div className={Styles.Posts}>

      <h1 style={{marginTop: '10px'}}>Publicaciones de la cartelera</h1>


      <div className={Styles.Cards}>
        {posts?.map(post => (
          <Post 
            key={post.id}
            id={post?.id}
            title={post?.title}
            organization={post?.organization}
            category={post?.category}
            description={post?.description}
            image={post?.image}
            startDate={post?.startDate}
            userID={post?.userID}
            likes={post?.likes}
            userLikes={post?.Likes}
          />
        ))}
      </div>
      
    </div>
  )
    
}
