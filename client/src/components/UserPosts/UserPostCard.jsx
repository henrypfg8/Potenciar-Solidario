import Styles from '../../views/UserPostsView/userPosts.mudule.css'
import propTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'

const UserPostCard = ({post}) => {

  const navigate = useNavigate()
  const handleDeletePost = (id) => {
    console.log(id)
  };
  const handleIUpdatePost = (id, post) => {
    navigate(`/formulario/${id}`)
  }
  return (
    <div>

      <p>{post.title}</p>
      <p>{post.category}</p>
      <p>{post.description}</p>
      <p>{post.contact}</p>
      <p>{post.organization}</p>
      <p>{post.registrationLink}</p>
      <p>{post.likes}</p>
      <div>
        <button onClick={() => handleIUpdatePost(post.id, post)}>Actualizar</button>
        <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
      </div>
    </div>
  )
};

UserPostCard.propTypes = {
  post: propTypes.object.isRequired

}



export default UserPostCard