import Styles from "./post.module.css";
//
import { Link } from "react-router-dom";
//

const Post = (props) => {
  const { title, organization, category, image, description } = props;

  return (
    <Link to="/detalle" className={Styles.Post}>

      <h1 className={Styles.title}>{title}</h1>

      <h2 className={Styles.organization}>{organization}</h2>
      
      <p className={Styles.category}>{category}</p>

      <div className={Styles.description}>

        <img className={Styles.img} src={image} alt="imagen" />

        <p>{description}</p>

      </div>
    </Link>
  );
};

export default Post;
