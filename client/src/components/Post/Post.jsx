import Styles from "./post.module.css";
//
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
//
import DeleteIcon from "../../assets/DeleteIcon";
import CalendarIcon from "../../assets/CalendarIcon";
import { Like, LikeActive, Comment } from "../../assets/SocialIcons/";

//
import axios from "axios";
//
import { getPosts } from "../../Redux/actions/postsActions";
//
import Swal from "sweetalert2";

const Post = (props) => {
  const { id, title, organization, category, image, description, startDate } =
    props;

  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const start_date = startDate.split("-");
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
    12: "Diciembre",
  };

  const deleteHandler = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Seguro que quieres eliminar la publicación?",
      icon: "warning",
      iconColor: "#005692",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:19789/posts/${id}`);
        Swal.fire({
          title: "Publicación Eliminada",
          icon: "success",
          customClass: {
            confirmButton: "swallowOkButton",
          },
        });
      }
    });
    setTimeout(() => {
      dispatch(getPosts());
    }, 200);
  };
  const likeHandler = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
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
        <CalendarIcon className={Styles.BottomBar__calendarIcon} />

        <p className={Styles.BottomBar__startDate}>
          {start_date[2]} de {months[start_date[1]]} {start_date[0]}
        </p>

        <div className={Styles.BottomBar__SocialIcons}>
          <div
            className={Styles.SocialIcons__likeContainer}
            onClick={likeHandler}
          >
            {isLiked ? (
              <LikeActive className={Styles.likeIcon} />
            ) : (
              <Like className={Styles.likeIcon} onClick={likeHandler} />
            )}
          </div>

          <div className={Styles.SocialIcons__commentContainer}>
            <Comment className={Styles.commentIcon} />
          </div>
        </div>

        <DeleteIcon
          className={Styles.BottomBar__deleteIcon}
          onClick={deleteHandler}
        />
      </div>
    </Link>
  );
};

export default Post;
