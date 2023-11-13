import Styles from "./postDetail.module.css";
//
import axios from "axios";
//
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail, clearPostDetail } from '../../Redux/actions/postsActions';
import ImageAvatars from "../../assets/AvatarImage";
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
    url,
    User
  } = postDetail;


  useEffect(() => {
    dispatch(getPostDetail(id));
    return () => {
      dispatch(clearPostDetail());
    }
  }, []);

console.log(postDetail);

  return (
    <div className={Styles.DetailView}>
      <div className={Styles.contain}>
        {
          image && <img src={image} alt="Imagen" />
        }

        <div className={Styles.Detail}>
          <div className={Styles.header}>

            <ImageAvatars image={User?.profile_picture} name={User?.name}/>
            <h3>{organization}</h3>
            </div>

            <div>
              <h1>{title}</h1>
              <div className={Styles.header}>
                <div>
                <h3>
                  Fecha de publicacion:
                </h3>
              <time dateTime={creationDate}>
                {creationDate}
              </time>
                </div>
              <div>
              <h3>
                Contacto:
              </h3>
            <p>{contact}</p>
              </div>
              </div>
          </div>
          <p className={Styles.text}>{description}</p>
          <div className={Styles.header}>
          <div className={Styles.date}>
            <div>
              <h3>Desde: </h3>
	@@ -90,10 +91,10 @@
          {endDate && <p>{endDate}</p>}
            </div>
          </div>
          {url && <a href={url} className={Styles.link} target="_blank" rel="noreferrer">Mas informacion</a>}
          {registrationLink && <a href={registrationLink} className={Styles.link} target="_blank" rel="noreferrer">Inscribirse</a>}
          </div>
          <a className={Styles.category}>{category}</a>
        </div>

      </div>
      <div>
Comentario1
      </div>
      <div>
Comentario2
      </div>
      <div>
Comentario3
      </div>
    </div>
  );
};
export default Detail;