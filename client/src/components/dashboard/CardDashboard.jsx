import { useState, useEffect } from 'react'
import proptypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../Redux/actions/postsActions'
import { Modal, } from 'antd';
import { getPosts } from '../../Redux/actions/postsActions';



const CardDashboard = ({ post }) => {
  const [addPostToList, setAddPostToList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [refreshData, setRefreshData] = useState(false);
  const [pendingList, setPendingList] = useState([])



  useEffect(() => {
    dispatch(getPosts())
  }, [refreshData])


  useEffect(() => {
    console.log(pendingList);
  }, [pendingList.length]);


  const handleCheckboxChange = (e) => {
    setPendingList(currentList => {
      if (e.target.checked) {
        // Agrega el post si no está presente
        if (!currentList.some(item => item.id === post.id)) {
          return [...currentList, post];
        }
        return currentList;
      } else {
        // Elimina el post si está presente
        return currentList.filter((item) => item.id !== post.id);
      }
    });
   
  };
  // Función para abrir el modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleDeletePostById = () => {
    // hacer el dispatch de la acción para eliminar el post de la base de datos
    setRefreshData(true);
    dispatch(deletePost(post.id))
      .then(() => {
        setIsModalOpen(false);
        setRefreshData(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }


  return (
    <div className='dashboard__card'>
      <div>
        <img className='dashboard__img' src={post.image} alt="imagen" />
      </div>
      <div className='dashboard__info'>
        <h1>{post.title}</h1>
        <p className='dashboard__p'>{post.description}</p>
      </div>
      <div className='dashboard__selected'>
        <input className='dashboard__check' type="checkbox"
        
          checked={pendingList.some(item => item.id === post.id)}
          onChange={handleCheckboxChange}
        />
        <img className='dashboard__trash' src="/images/trash.png" alt="img-trash"
          onClick={showModal}
        />

        <Modal
          title="Deseas eliminar este post?"
          open={isModalOpen}
          onCancel={handleClose}
          cancelText="Cancelar"
          okText="Sí,Eliminar"
          onOk={() => handleDeletePostById()}
          cancelButtonProps={{
            style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
          }}
          okButtonProps={{ danger: true }}
        />
      </div>
    </div>
  )
}

CardDashboard.propTypes = {
  post: proptypes.object.isRequired,

}

export default CardDashboard