
import { useSelector, } from 'react-redux'
import Styles from './userComment.module.css'

import UserComentCard from './UserComentCard'
const UserComent = () => {
  const { posts } = useSelector((state) => state.posts);
  const p = 'creationDate'

  
  console.log(posts.sort((a, b) => a.creationDate -b.creationDate))
  return (
    <div className={Styles.container}>
      <div className={Styles.divGrid}>
        {posts && posts?.map(post => {
          if(post?.PublicationComments?.length){
            return (
         
         
                <UserComentCard key={post.id} post={post}/>
       
       
            )
          }
        })}
      </div>
    </div>
  )
}

export default UserComent