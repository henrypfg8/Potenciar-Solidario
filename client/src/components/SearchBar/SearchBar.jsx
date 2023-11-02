import Styles from "./searchBar.module.css";
//
import { useDispatch } from 'react-redux';
import { searchPost, getPosts } from '../../Redux/actions/postsActions';


export default function SearchBar() {
    const dispatch = useDispatch();

    function changeHandler ({ target: { value } }) {
        if (value !== '') dispatch(searchPost(value));
        else dispatch(getPosts())
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
