import Styles from "./postDetail.module.css";
//
import axios from "axios";
//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const [post, setPost] = useState({});
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
  } = post;
  

  useEffect(() => {
    axios
      .get(`http://localhost:19789/posts/${id}`)
      .then(({ data }) => setPost(data))
      .catch((error) => console.log(error.message));
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
