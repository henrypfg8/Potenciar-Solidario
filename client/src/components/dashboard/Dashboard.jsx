import {useState} from 'react'
import { useSelector } from 'react-redux'
import CardDashboard from './CardDashboard'
import proptypes from 'prop-types'
import SearchDashBoard from './SearchDashBoard'
const Dashboard = ( ) => {
    const { posts } = useSelector(state => state.posts);
    const [search, setSearch] = useState('');
    const [listSearchPost, setListSearchPost] = useState([]);

    const handlePulishPosts = () => { //funcion para publicar los posts 
        console.log('publicando posts');
        //hacer el dispatch de la acción para publicar los posts
    }
    return (
        <div className='dashboard'>
           <SearchDashBoard
               search={search}
               setSearch={setSearch}
              
               setListSearchPost={setListSearchPost}
           />
            <div className='dashboard__div'>
                <div className='dashboard__div--cards'>

                    {listSearchPost.length > 0 ? listSearchPost.map((post) => {
                        return (
                            <CardDashboard
                                key={post.id}
                                post={post}
                            />
                        )
                    }) : posts.map((post) => {
                        return (
                            <CardDashboard
                                key={post.id}
                                post={post}
                                
                            />
                        )
                    })}
                </div>
                <button className='dashboard__btn'
                    onClick={handlePulishPosts}
                >Publicar</button>
            </div>

        </div>
    )
}


export default Dashboard