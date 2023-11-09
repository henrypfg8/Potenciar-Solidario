
import { useSelector } from 'react-redux';
import proptypes from 'prop-types'

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

SearchDashBoard.propTypes = {
  search: proptypes.string.isRequired,
  setSearch: proptypes.func.isRequired,
  setListSearchPost: proptypes.func.isRequired
}
export default SearchDashBoard