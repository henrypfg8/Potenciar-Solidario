import { useState } from 'react'
import Styles from '../../views/UserPostsView/userPosts.module.css'
import propTypes from 'prop-types'
import { NavLink, useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import axios from 'axios'

const UserPostCard = ({ post, setRefreshData }) => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();


  const showModal = () => {
    setOpen(true);
  }
  const handleDeleteById = async () => {
    setRefreshData(true)
    const { data } = await axios.delete(`http://localhost:19789/posts/${post.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }

    });
    setRefreshData(false)
    return data

  }
  const handleOk = async () => {

    await handleDeleteById();
    navigate('/profile/posts')
    setOpen(false);

  }
  const handleCancel = () => {

    setOpen(false);
  }
  const handleIUpdatePost = (id) => {
    navigate(`/formulario/${id}`)
  }
  return (
    <div className={Styles.user__publication__card}>
      <Modal
        title='Estas seguro de eliminar esta publicación?'
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          danger: true,
        }}
        cancelButtonProps={{

          style: {
            color: '#005692',
            borderColor: '#005692'
          }

        }}
      />
      <h2 className={Styles.user__publication__h2}>{post.title}</h2>
      <div className={Styles.user__image__div}>
        <img className={Styles.user__image} src={post.image} alt="imagen del post" />
        <div className={Styles.user__publication__info}>
    
          <h2>{post.category}</h2>
          <p>{post.description}</p>
          <p>{post.contact}</p>
          <p>{post.organization}</p>
   
          <NavLink className={Styles.user__btn__link} to={`/detalle/${post.id}`}>Más Información</NavLink>
        </div>


        <div className={Styles.user__div__btns}>
          <button onClick={() => handleIUpdatePost(post.id)}>
          <img className={Styles.user__publication__icon} src="/images/lapiz.png" alt="" />
          </button>
          <button onClick={showModal}>
            <img className={Styles.user__publication__icon} src="/images/trash.png" alt="" />
          </button>
        </div>

      </div>



    </div>
  )
};

UserPostCard.propTypes = {
  post: propTypes.object.isRequired,
  setRefreshData: propTypes.func.isRequired

}



export default UserPostCard