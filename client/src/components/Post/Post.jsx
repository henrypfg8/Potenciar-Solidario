import Styles from './post.module.css';
//
import { Link } from "react-router-dom";



const Post = (props) => {
    return (
        
        <Link to='/detalle' className={Styles.Post}>
            <h1>{props.title}</h1>
            <h2>{props.organization}</h2>
            <p>{props.category}</p>
            <img className={Styles.img} src={props.image} alt='imagen'/>
            <p>{props.description}</p>
        </Link>
    )
}

export default Post;