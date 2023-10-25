import { Link } from "react-router-dom";
import Detail from "../../views/DetailView/DetailView";

const Post = (props) => {
    return (
        <Link to={Detail}>
        <div>
            <h1>{props.title}</h1>
            <h2>{props.ong}</h2>
            <p>{props.category}</p>
            <img/>
            <p>{props.description}</p>
        </div>
        </Link>
    )
}

export default Post;