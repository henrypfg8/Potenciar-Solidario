import Styles from "./postDetail.module.css";
//
import axios from "axios";
//
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostDetail,
  clearPostDetail,
} from "../../Redux/actions/postsActions";
import ImageAvatars from "../../assets/AvatarImage";
import {
  createPostReview,
  deletePostReview,
  updatePostReview,
} from "../../Redux/actions/postsActions";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { element } from "prop-types";
import { Oval } from "react-loader-spinner";
import swal from "sweetalert";

//

const Detail = () => {
  const postDetail = useSelector((state) => state.posts.postDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    title,
    category,
    description,
    organization,
    startDate,
    endDate,
    image,
    registrationLink,
    contact,
    creationDate,
    url,
    User,
  } = postDetail;

const [ reviews, setReviews ] = useState({
  comment: "",
  userId: "",
  publicationId: "",
})
const [commentList, setCommentList] = useState([])


const [ userId, setUserId ] = useState("");

const { isAuthenticated, token } = useSelector((state) => state.auth);

useEffect(() => {
  if (!token || !isAuthenticated) {
    swal("Necesita loguearse para poder realizar un comentario").then(
      (value) => {
        navigate("/login");
      }
    );
  }
  if (token) {
    const decodify = jwtDecode(token);
    if (decodify) {
      setUserId(decodify.id);
    }
  }
}, [isAuthenticated, navigate, token]);

  useEffect(() => {
    dispatch(getPostDetail(id));
    return () => {
      dispatch(clearPostDetail());
    };
  }, []);

  const handleChange = (event, id) => {
    event.preventDefault();
    setReviews({
      ...reviews,
      comment: event.target.value,
      userId: userId,
      publicationId: id,
    })
  }

  const handleSubmit = (comment) => {
    dispatch(createPostReview(comment))
    .then(() => {
      const newCommentList = [...commentList, comment]; // Agrega el comentario a la lista de comentarios
      setCommentList(newCommentList);
      setReviews({ comment: "" });
      swal({
        icon: "success",
        text: "Reseña creada con éxito",
      });
    })
    .catch(() => {
      swal({
        icon: "error",
        text: "contacte a soporte",
      });
    });
  }
  console.log(postDetail);

 
  return (
    <div className={Styles.DetailView}>
      {
        !Array.isArray(postDetail)
        ? 
        <div className={Styles.DetailView}>


      <div className={Styles.contain}>

        {image && <img src={image} alt="Imagen" />}

        <div className={Styles.Detail}>
          <div className={Styles.header}>
            <ImageAvatars image={User?.profile_picture} name={User?.name} />
            <h3>{organization}</h3>
          </div>

          <div>
            <h1>{title}</h1>
            <div className={Styles.header}>
              <div>
                <h3>Fecha de publicacion:</h3>
                <time dateTime={creationDate}>{creationDate}</time>
              </div>
              <div>
                <h3>Contacto:</h3>
                <p>{contact}</p>
              </div>
            </div>
          </div>
          <p className={Styles.text}>{description}</p>
          <div className={Styles.header}>
            <div className={Styles.date}>
              <div>
                <h3>Desde: </h3>
                <p>
                {startDate}
                </p>
                {endDate && <p>{endDate}</p>}
              </div>
            </div>
            {url && (
              <a
                href={url}
                className={Styles.link}
                target="_blank"
                rel="noreferrer"
              >
                Mas informacion
              </a>
            )}
            {registrationLink && (
              <a
                href={registrationLink}
                className={Styles.link}
                target="_blank"
                rel="noreferrer"
              >
                Inscribirse
              </a>
            )}
          </div>
          <a className={Styles.category}>{category}</a>
        </div>
    
    </div>
    <div className={Styles.container}>

      {postDetail?.PublicationComments?.map((element, index)=>{
        return(<div key={index} className={Styles.comment}><ImageAvatars name={element.User?.name} image={element.User?.profile_picture} /><p>{element.comment}</p> </div>)
      })
}
      {commentList.map((comment, index) => (
        <div key={index} >
      <p>Comentario {index + 1}:</p>
      <p>{comment.comment}</p>
    </div>
  ))}
    </div>
     
      <div>
        <p>Comentar</p>
        <textarea 
        style={{resize: "none"}}
        name="review"
        type="text"
        value={reviews.comment}
        onChange={(event) => handleChange(event, id)} />

        <button onClick={() => handleSubmit(reviews)}>
          Añadir reseña
        </button>
       
      
        
      </div>
    </div>
    :
    <Oval
    height={80}
    width={80}
    color="#005692"
    wrapperStyle={{ margin: "auto auto" }}
    wrapperClass=""
    visible={true}
    ariaLabel="oval-loading"
    secondaryColor="#a4d4ff"
    strokeWidth={3}
    strokeWidthSecondary={3}
  />
      }
      </div>
  );
};
export default Detail;
