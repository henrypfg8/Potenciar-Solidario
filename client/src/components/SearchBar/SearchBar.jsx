import Styles from "./searchBar.module.css";
//
import { useDispatch, useSelector } from "react-redux";
import {
  searchPosts,
  getPostsFiltered,
} from "../../Redux/actions/postsActions";
//
import axios from "axios";

export default function SearchBar() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const filters = useSelector((state) => state.posts.postsFilters);

  function changeHandler({ target: { value } }) {
    if (value === "") dispatch(getPostsFiltered(filters));
    else {
      if (posts.length === 0) {
        axios.get("http://localhost:19789/posts")
        .then(({ data }) => dispatch(searchPosts(data, value.trim())));
      }
      else dispatch(searchPosts(posts, value.trim()))
    }
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
