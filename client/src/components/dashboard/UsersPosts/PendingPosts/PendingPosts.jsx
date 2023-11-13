import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CardDashboard from '../CardDashboard'
import SearchDashBoard from '../SearchDashBoard';
import Styles from '../dashboard.module.css'
import { getPosts } from '../../../../Redux/actions/postsActions';


const PendingPosts = ( ) => {
    const { posts } = useSelector(state => state.posts);
    const [search, setSearch] = useState('');
    const [refreshData, setRefreshData] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPosts())
    }, [refreshData])
 
    const postsPending = posts.filter((post) => { //filtrar los posts que no estan publicados
        return post.status !== '1';
    
    });
    const [listSearchPost, setListSearchPost] = useState([]);


    return (
        <div className={Styles.dashboard}>
           <SearchDashBoard
               search={search}
               setSearch={setSearch}
               postsPending={postsPending}
               setListSearchPost={setListSearchPost}
           />
            <div className={Styles.dashboard__div}>
                <div className={Styles.dashboard__divCards}>

                    {listSearchPost.length > 0 ? listSearchPost.map((post) => {
                        return (
                            <CardDashboard
                                key={post.id}
                                post={post}
                            />
                        )
                    }) : postsPending.map((post) => {
                        return (
                            <CardDashboard
                                key={post.id}
                                post={post}
                                setRefreshData={setRefreshData}
                                refreshData={refreshData}
                                
                            />
                        )
                    })}
                </div>
                {/* <button className={Styles.dashboard__btn}
                    onClick={handlePulishPosts}
                >Publicar</button> */}
            </div>

        </div>
    )
}


export default PendingPosts