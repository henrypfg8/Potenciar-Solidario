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
        
      
    
      <div className={Styles.contain}>
      {
        image && <img src={image} alt="Imagen" />
      }
        <div className={Styles.title}>
      <h1>{title}</h1>
        <a>{category}</a>
      <p>{description}</p>
        </div>

      </div>

      <div className={Styles.Detail}>
        <div>

        <h2 className={Styles.title2}>Informacion sobre la publicación</h2>
        </div>
        <h3>ONG: </h3>
        <p>{organization}</p>
        <h3>Fecha de inicio: </h3>
        <p>{startDate}</p>
        {endDate && <h3>Fecha de fin:</h3>}
        {endDate && <p>{endDate}</p>}

        {registrationLink && <h3>Link para inscribirse:</h3>}
        {registrationLink && <p>{registrationLink}</p>}
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
