import Styles from "./post.module.css";
//
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//
import DeleteIcon from "../../assets/DeleteIcon";
import CalendarIcon from '../../assets/CalendarIcon';
//
import axios from "axios";
//
import { getPosts } from "../../Redux/actions/postsActions";

const Post = (props) => {
  const { id, title, organization, category, image, description, startDate } = props;
  const start_date = startDate.split('-');
  const months = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre"
};
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:19789/posts/${id}`);
    setTimeout(() => {
      dispatch(getPosts());
    }, 200);
  };

  return (
    <Link to={`/detalle/${id}`} className={Styles.Post}>
      <h1 className={Styles.Post__title}>{title}</h1>

      <p className={Styles.Post__category}>{category}</p>

      <div className={Styles.Post__Organization}>
        <h2 className={Styles.organization}> Organización: </h2>
        <h2 className={Styles.organizationName}>{organization}</h2>
      </div>

      {/* <div className={Styles.Post__Image}>
      </div> */}

      <div className={Styles.Post__description}>
        {image && <img className={Styles.image} src={image} alt="imagen" />}

        <p>{description}</p>
      </div>

      <div className={Styles.Post__BottomBar}>
        <CalendarIcon className={Styles.BottomBar__calendarIcon}/>
        <p className={Styles.BottomBar__startDate}> {start_date[2]} de {months[start_date[1]]} {start_date[0]} </p>
        <DeleteIcon className={Styles.BottomBar__deleteIcon} onClick={deleteHandler} />
      </div>
    </Link>
  );
};

export default Post;
