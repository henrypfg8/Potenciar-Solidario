import Styles from './post.module.css';
//
import { Link } from "react-router-dom";



const Post = (props) => {
    return (
        
        <Link to='/detalle' className={Styles.Post}>
            <h1>{props.title}</h1>
            <h2>{props.ong}</h2>
            <p>{props.category}</p>
            <img/>
            <p>{props.description}</p>
        </Link>
    )
}

export default Post;