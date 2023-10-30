import Styles from "./post.module.css";
//
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
//
import DeleteIcon from '../../assets/DeleteIcon';
//
import axios from 'axios';
//
import { getPosts } from "../../Redux/actions";


const Post = (props) => {
  const { id, title, organization, category, image, description } = props;
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:19789/posts/${id}`);
    setTimeout(() => {
      dispatch(getPosts());
    }, 200)
  }

  return (
    <Link to={`/detalle/${id}`} className={Styles.Post}>
      <DeleteIcon className={Styles.Post__icon} onClick={deleteHandler}/>

      <h1 className={Styles.Post__title}>{title}</h1>

      <h2 className={Styles.Post__organization}>{organization}</h2>

      <p className={Styles.Post__category}>{category}</p>

      <div className={Styles.Post__description}>
        <img className={Styles.Post__img} src={image} alt="imagen" />

        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Post;
