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
  //funcion para eliminar el post
  const handleOk = async () => {

    await handleDeleteById();
    setOpen(false);

  }
  const handleCancel = () => {

    setOpen(false);
  }

  //funcion para editar el post
  const handleIUpdatePost = (id) => {
    navigate(`/formulario/${id}`) // redirigir a la ruta de edición
  }
  return (
    <div className={Styles.user__publication__card}>
      <Modal
        title='Estas seguro de eliminar esta publicación?'
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText='Cancelar'
        okText='Sí,Eliminar'
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
        {post?.image ? (<img className={Styles.user__image} src={post.image} alt="imagen del post" />) : (
          <img src='/images/no-image.png' className={Styles.user__image} />
        )}
        <div className={Styles.user__publication__info}>

          <h2>{post.category}</h2>
          <p className={Styles.user__Description}>{post.description}</p>
          <p>{post.contact}</p>
          <p>{post.organization}</p>

          <NavLink className={Styles.user__btn__link} to={`/detalle/${post.id}`}>Más Información</NavLink>
        </div>

      </div>


      <div className={Styles.user__btns_flex}>
        <button className={Styles.user__btn_edit} onClick={() => handleIUpdatePost(post.id)}>
          <img className={Styles.user_edit_icon} src='/images/icons8.png'/>
        </button>
        <button onClick={showModal} className={Styles.user__btn__delete}>
        <i className={`fa fa-trash ${Styles.user__trash_icon}`} aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
};

UserPostCard.propTypes = {
  post: propTypes.object.isRequired,
  setRefreshData: propTypes.func.isRequired

}

export default UserPostCard