import { Link } from "react-router-dom";

const PostDetail = (props) => {
    const { postDetail } = props;
    return (
        <div>
            <h1>{postDetail.title}</h1>
            <h2>Categoría: {postDetail.category}</h2>
            <p>Descripción: {postDetail.description}</p>
            <p>Usuario: {postDetail.user}</p>
            <p>ONG: {postDetail.ong}</p>
            <p>Fecha de inicio: {postDetail.startDate}</p>
            {postDetail.endDate && <p>Fecha de fin: {postDetail.endDate}</p>}
            {postDetail.image && <img src={postDetail.image} alt="Imagen" />}
            <p>Link para inscribirse: {postDetail.registrationLink}</p>
            <p>Contacto: {postDetail.contact}</p>
            {postDetail.moreInfoUrl && <p>URL para saber más: {postDetail.moreInfoUrl}</p>}
            <p>Estado: {postDetail.status}</p>
            <time dateTime={postDetail.createdAt}>Fecha de alta: {postDetail.createdAt}</time>
        </div>
    )
}

export default PostDetail;
