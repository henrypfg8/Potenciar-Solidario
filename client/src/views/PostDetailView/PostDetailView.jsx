import Styles from "./postDetail.module.css";
//
import axios from "axios";
//
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, clearPostDetail } from '../../Redux/actions/postsActions';
//


const Detail = () => {
  const postDetail = useSelector(state => state.posts.postDetail);
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
    url
  } = postDetail;


  useEffect(() => {
    dispatch(getPostDetail(id));

    return () => {
      dispatch(clearPostDetail());
    }
  }, []);



  return (
    <div className={Styles.DetailView}>
      <div className={Styles.Image}>
        {image && <img src={image} alt="Imagen" />}
      </div>
      <div className={Styles.Detail}>
        <h1>{title}</h1>
        <h2>{category}</h2>
        <h3>Descripción: </h3>
        <p>{description}</p>
        <h3>ONG: </h3>
        <p>{organization}</p>
        <h3>Fecha de inicio: </h3>
        <p>{startDate}</p>
        {endDate && <p><h3>Fecha de fin:</h3>{endDate}</p>}
        {registrationLink && <h3>Link para inscribirse:</h3>}
        <p>{registrationLink}</p>
        <h3>Contacto: </h3>
        <p>{contact}</p>
        {url && <p>URL para saber más: {url}</p>}
        <h3>Fecha de alta</h3>
        <time dateTime={creationDate}>
           {creationDate}
        </time>

      </div>



    </div>
  );
};
export default Detail;
