import Styles from "./searchBar.module.css";
//
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  searchPosts,
  getPostsFiltered,
  setSearchValue,
  setLoading,
  hideLoading,
} from "../../Redux/actions/postsActions";
//
import axios from "axios";
//
import { configureHeaders } from "../../Redux/auth/configureHeaders .js";

export default function SearchBar() {
  const dispatch = useDispatch();
  const config = configureHeaders();
  //
  const posts = useSelector((state) => state.posts.posts);
  const filters = useSelector((state) => state.posts.postsFilters);
  const searchValue = useSelector(state => state.posts.searchValue);
  const [inputValue, setInputValue] = useState('');
  const loading = useSelector(state => state.posts.loading);

  function changeHandler({ target: { value } }) {
    setInputValue(value);
  }

  useEffect(() => {
    if (!loading) dispatch(setLoading());
    dispatch(setSearchValue(inputValue));

    if (inputValue === "")
      dispatch(getPostsFiltered(filters)).then(dispatch(hideLoading()));
    else {
      const { category, ong, fromDate, untilDate, user } = filters;
      let value = inputValue.trim().includes(' ') ? inputValue.trim().split(' ') : inputValue.trim();

      let debounceTimeout = undefined;
      axios.get(
        `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}&user=${user}`,
        config
      ).then(({ data }) => {
        debounceTimeout = setTimeout(() => {
          dispatch(searchPosts(data, value)).then(() => {
            dispatch(hideLoading())
          })
        }, 400)
      })

      return () => {
        clearTimeout(debounceTimeout);
      }
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(searchValue);
  }, [])

  return (
    <div className={Styles.SearchBar}>
      <input
        type="text"
        className={Styles.searchBar__input}
        placeholder="Buscar por titulo, descripción y organización."
        onChange={changeHandler}
        value={inputValue}
      ></input>
    </div>
  );
}
