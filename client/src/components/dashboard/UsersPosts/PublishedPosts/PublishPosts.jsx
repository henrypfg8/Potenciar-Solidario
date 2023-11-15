import { useState, useEffect } from "react";
import { getPosts } from "../../../../Redux/actions/postsActions"
import { useSelector, useDispatch } from "react-redux";
import CardDashboard from "../CardDashboard";
import Styles from './published.module.css'
import axios from 'axios';
import { configureHeaders } from '../../../../Redux/auth/configureHeaders ';
import { Modal } from 'antd';
import SearchDashBoard from "../SearchDashBoard";

const PublishPosts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts);
  const [search, setSearch] = useState('');
  const [listSearchPost, setListSearchPost] = useState([]);

  const [selectedPosts, setSelectedPosts] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  //guardar los posts seleccionados para publicar

  const [isModalOpenLeftPublish, setIsModalOpenLeftPublish] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  
  const postsApproved = posts.filter(post => post.status === '1' || post.status === true);

  useEffect(() => {
    dispatch(getPosts())
  }, [refreshData])

  const handleCheckboxChange = (item) => {
    if (selectedPosts.includes(item)) {
      setSelectedPosts(selectedPosts.filter(i => i !== item));
    } else {
      setSelectedPosts([...selectedPosts, item]);
    }
  }
  const handleSelectAllPost = () => {
    if (selectedPosts.length === postsApproved.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(postsApproved);
    }
  }
  // Función para abrir el modal
  //Areas de modales para publicar 
  const showModal = () => {
    setIsModalOpenLeftPublish(true);

  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsModalOpenLeftPublish(false);
  };

  const handlePulishPosts = async () => {//publicar los posts seleccionados
    if (selectedPosts.length === 0) {

      return;
    }



    try {
      setRefreshData(true);
      const config = configureHeaders(); //configurar los headers

      const updatePromises = selectedPosts.map(post =>
        axios.put(`http://localhost:19789/posts/${post.id}`,//actualizar el post
          { ...post, status: false }, //cambiar el estado del post
          config)
      );

      const results = await Promise.all(updatePromises); //esperar a que todas las peticiones se completen
      setIsModalOpenLeftPublish(false)
      // Después de que todas las peticiones se han completado
      setSelectedPosts([]);
      setRefreshData(false);
      console.log(results);
    } catch (error) {
      console.log(error.response);
      // Manejar el error (por ejemplo, si alguna de las peticiones falla)
    }
  };
  //Areas de modales para eliminar

  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  }
  const handleCloseDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeletePosts = async () => {
    try {

      const config = configureHeaders(); //configurar los headers
      const deletePromises = selectedPosts.map(post =>
        axios.delete(`http://localhost:19789/posts/${post.id}`, config)
      );
      const results = await Promise.all(deletePromises); //esperar a que todas las peticiones se completen
      // Después de que todas las peticiones se han completado
      setIsModalOpenDelete(false)
      setSelectedPosts([]);
      setRefreshData(false);
      console.log(results);
    }
    catch (error) {
      console.log(error.response)
    }
  }
  return (
    <>
      <div className={Styles.dashboard}>
        {postsApproved.length === 0 && <p className={Styles.dashboard__post}>No hay publicaciones </p>}
        {postsApproved.length > 0 && (
          <div>
            <p className={Styles.dashboard__post}>Hay {postsApproved.length} publicaciones</p>
            <div className={Styles.button__flexDiv}>
              <button className={Styles.button__selected} onClick={handleSelectAllPost}>  {selectedPosts.length === postsApproved.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}</button>
            </div>
          </div>
        )}


          <SearchDashBoard
            search={search}
            setSearch={setSearch}
            postsPending={postsApproved}
            setListSearchPost={setListSearchPost}
          />

        <div className={Styles.dashboard__div}>

          <div className={Styles.dashboard__divCards}>

          {listSearchPost.length > 0 ? listSearchPost.map((post) => {
                        return (
                            <CardDashboard
                                key={post.id}
                                post={post}
                                setRefreshData={setRefreshData}
                                refreshData={refreshData}
                                isCheked={selectedPosts.includes(post)}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        )
                    }) : postsApproved?.map((post) => {
                        return (
                            <CardDashboard
                                key={post.id}
                                post={post}
                                setRefreshData={setRefreshData}
                                refreshData={refreshData}
                                isCheked={selectedPosts.includes(post)}
                                onCheckboxChange={handleCheckboxChange}

                            />
                        )
                    })}
          </div>
          {selectedPosts.length > 0 && (
            <div className={Styles.dashboard__buttons}>
              <button className={Styles.dashboard__btn}
                onClick={showModal}
              >Dejar, de publicar</button>
              <button className={Styles.dashboard__btn2}
                onClick={showModalDelete}
              >Eliminar</button>
            </div>
          )}
          <div>
            <Modal
              title={`Deseas dejar de publicar ${selectedPosts.length} posts`}
              open={isModalOpenLeftPublish}
              onCancel={handleClose}
              cancelText="Cancelar"
              okText="Sí, Dejar dePublicar"
              onOk={handlePulishPosts}
              cancelButtonProps={{
                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
              }}

            />
            <Modal
              title={`Deseas eliminar ${selectedPosts.length} posts?`}
              open={isModalOpenDelete}
              onCancel={handleCloseDelete}
              cancelText="Cancelar"
              okText="Sí,Eliminar"
              onOk={handleDeletePosts}
              cancelButtonProps={{
                style: { backgroundColor: '#fff', color: '#005692', border: '1px solid #005692' }
              }}
              okButtonProps={{ danger: true }}
            />
          </div>

        </div>

      </div>
    </>

  )
}

export default PublishPosts