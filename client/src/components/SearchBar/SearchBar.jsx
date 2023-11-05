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
      const { category, ong, fromDate, untilDate } = filters;
      value = value.trim();
      if (value.includes(" ")) value = value.split(" ");
      axios
        .get(`http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}`)
        .then(({ data }) => dispatch(searchPosts(data, value)));
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
