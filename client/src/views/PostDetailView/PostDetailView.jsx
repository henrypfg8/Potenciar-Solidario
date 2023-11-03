import Styles from "./postDetail.module.css";
//
import axios from "axios";
//
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, clearPostDetail } from '../../Redux/actions/postsActions';


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
      <h1>{title}</h1>
      <h2>{category}</h2>
      <p>Descripción: {description}</p>
      <p>ONG: {organization}</p>
      <p>Fecha de inicio: {startDate}</p>
      {endDate && <p>Fecha de fin: {endDate}</p>}
      {image && <img src={image} alt="Imagen" />}
      <p>Link para inscribirse: {registrationLink}</p>
      <p>Contacto: {contact}</p>
      {url && <p>URL para saber más: {url}</p>}
      <time dateTime={creationDate}>
        Fecha de alta: {creationDate}
      </time>
    </div>
  );
};
export default Detail;
