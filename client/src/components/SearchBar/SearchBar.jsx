import Styles from "./searchBar.module.css";
//
import { useDispatch, useSelector } from "react-redux";
import { searchPosts, getPostsFiltered } from "../../Redux/actions/postsActions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const filters = useSelector(state => state.posts.postsFilters);
   

  function changeHandler({ target: { value } }) {
    if (value === '') dispatch(getPostsFiltered(filters));
    else dispatch(searchPosts(posts, value));
  }

  return (
    <div className={Styles["SearchBar"]}>
      <input
        type="text"
        className={Styles["searchBar__input"]}
        placeholder="Buscar por titulo o descripcion"
        onChange={changeHandler}
      ></input>
    </div>
  );
}
