import { useState, useEffect } from "react";
import { getPosts } from "../../../../Redux/actions/postsActions"  
import { useSelector, useDispatch } from "react-redux";
import CardDashboard from "../CardDashboard";
import Styles from './published.module.css'

const PublishPosts = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.posts);
    //const [search, setSearch] = useState('');
    const [refreshData, setRefreshData] = useState(false);
    //const [listSearchPost, setListSearchPost] = useState([]);

    const postsApproved = posts.filter(post => post.status === '1' || post.status === true);

    useEffect(() => {
        dispatch(getPosts())
    }, [refreshData])


  return (
    <div className={Styles.container}>
      <h1 className={Styles.posts__title}>Publicaciones</h1>
      <div className={Styles.posts__cards}>
        {postsApproved.map((post) => {
          return (
              <CardDashboard 
              key={post.id}
              post={post}
              refreshData={refreshData}
              setRefreshData={setRefreshData}
              />
          )
        })}
      </div>
    </div>
  )
}

export default PublishPosts