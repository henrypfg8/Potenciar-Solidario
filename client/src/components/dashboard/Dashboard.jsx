import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardDashboard from './CardDashboard'

const Dashboard = ({ listSearchPost }) => {
    const { posts } = useSelector(state => state.posts);


    const handlePulishPosts = () => { //funcion para publicar los posts 
        console.log('publicando posts');
        //hacer el dispatch de la acción para publicar los posts
    }
    return (
        <div className='dashboard'>
           
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