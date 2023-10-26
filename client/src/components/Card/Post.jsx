import Styles from './post.module.css';
//
import { Link } from "react-router-dom";
import Detail from "../../views/DetailView/DetailView";


const Post = (props) => {
    return (
        
        <div className={Styles.Post}>
            <h1>{props.title}</h1>
            <h2>{props.ong}</h2>
            <p>{props.category}</p>
            <img/>
            <p>{props.description}</p>
        </div>
    )
}

export default Post;