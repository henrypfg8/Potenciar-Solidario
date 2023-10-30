import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const SearchDashBoard = ({ search, setSearch, setListSearchPost }) => {
  const { posts } = useSelector(state => state.posts);
  return (
    <div className='search__container'>
      <input className='search__input' type="text" placeholder='realiza un a busqueda'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            const filteredPost = posts.filter((post) => {
              return post.title.toLowerCase().includes(e.target.value.toLowerCase()); //busca en el titulo del post
            });
            setListSearchPost(filteredPost);

        }}
      />
    </div>
  )
}

export default SearchDashBoard