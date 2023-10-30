import Styles from './postDetail.module.css';
//
import axios from 'axios';
//
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {

    const [ post, setPost ] = useState({});
    const { id } = useParams();
    
    
    useEffect(() => {
        axios.get(`http://localhost:19789/posts/${id}`)
        .then(({ data }) => setPost(data))
        .catch(error => console.log(error.message));
    }, [])

  return (
    <div className={Styles.DetailView}>
      <h1>{post?.title}</h1>
      <h2>{post?.category}</h2>
      <p>Descripción: {post?.description}</p>
      <p>Usuario: {post?.user}</p>
      <p>ONG: {post?.organization}</p>
      <p>Fecha de inicio: {post?.startDate}</p>
      {post?.endDate && <p>Fecha de fin: {post?.endDate}</p>}
      {post?.image && <img src={post?.image} alt="Imagen" />}
      <p>Link para inscribirse: {post?.registrationLink}</p>
      <p>Contacto: {post?.contact}</p>
      {post?.url && (
        <p>URL para saber más: {post?.url}</p>
      )}
      <time dateTime={post?.creationDate}>
        Fecha de alta: {post?.creationDate}
      </time>
    </div>
  );
};
export default Detail;
