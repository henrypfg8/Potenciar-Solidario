import { useState } from "react";
import proptypes from "prop-types";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../Redux/actions/postsActions";
import { Modal } from "antd";
import Styles from "./dashboard.module.css";
import { configureHeaders } from "../../../Redux/auth/configureHeaders ";
import axios from "axios";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
const CardDashboard = ({
  post,
  setRefreshData,
  isCheked,
  onCheckboxChange,
}) => {
  //Inicializar los estados para mostrar modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChekedModal, setIsChekedModal] = useState(false);

  const dispatch = useDispatch();
  //contiene los datos del header authorizathion
  const config = configureHeaders();

  //Funcion para mostrar le modal de checkbox
  const handleCloseModalCheked = () => {
    setIsChekedModal(false);
  };

  //Funcion para publicar un post
  const handleUpdatePostPublish = async (id) => {
    try {
      setRefreshData(true);
      const { data } = await axios.put(
        `http://localhost:40781/posts/${id}`, //actualizar el post
        { ...post, status: post.status === true ? false : true },
        config
      ); //cambiar el estado del post

      setIsChekedModal(false);
      setRefreshData(false);
      return data;
    } catch (error) {
      return(error.response);
    }
  };

  // Función para abrir el modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsModalOpen(false);
  };
  //Funcion para borrar un post por id
  const handleDeletePostById = (id) => {
    // hacer el dispatch de la acción para eliminar el post de la base de datos
    setRefreshData(true);
    dispatch(deletePost(id))
      .then(() => {
        setIsModalOpen(false);
        setRefreshData(false);
      })
      .catch((error) => {
        return error.response;
      });
  };

  return (
    <>
      <div className={Styles.dashboard__card}>

        {/* div de la imagenes */}
        <div >
          {/* Si hay una image se mostrará, de lo contrario se mostrará una por defecto */}
          {post.image ? (
            <img
              className={Styles.dashboard__img}
              src={post.image}
              alt="imagen"
            />
          ) : (
            <img
              style={{ padding: "0.5rem" }}
              className={Styles.dashboard__img}
              alt="image-none"
              src="/images/no-image.png"
            />
          )}
        </div>
        {/* fin de la imagenes */}

            {/* holis */}
        <div className={Styles.dashboard__flex}>
          {/* Div de la info*/}
          <div className={Styles.dashboard__data}>
            {post.User?.profile_picture ? (
              <Avatar src={`${post.User?.profile_picture}`} size={40} />
            ) : (
              <Avatar icon={<UserOutlined />} size={40} />
            )}
            <div >
              <p className={Styles.dashboard__name}>
                Ususario:
                <span >
                  { post.User?.name}
                </span>
              </p>
          
            </div>
            <div >
              <div >
                <p className={Styles.dashboard__ong} >
                  ONG:<span>{post.organization}</span>
                </p>
              </div>
              <div>
                <p className={Styles.dashboard__p}>
                  {post.description}
                </p>
              </div>
            </div>
          </div>
          {/* Fin de la info */}

          {/* div de los selects */}
          <div className={Styles.dashboard__selected}>
            <input
              type="checkbox"
              checked={isCheked}
              onChange={() => onCheckboxChange(post)}
            />
            <button
              onClick={showModal}
              style={{ marginTop: "1rem", border: "none" }}
            >
              <i
                className={`fa fa-trash ${Styles.dashboard__trash_icon}`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
          {/* fin de los selects */}
        </div>
      </div>
      {/* Fin del card */}

      {/* Modales */}
      <div>
        <Modal
          title="Deseas eliminar este post?"
          open={isModalOpen}
          onCancel={handleClose}
          cancelText="Cancelar"
          okText="Sí,Eliminar"
          onOk={() => handleDeletePostById(post.id)}
          cancelButtonProps={{
            style: {
              backgroundColor: "#fff",
              color: "#005692",
              border: "1px solid #005692",
            },
          }}
          okButtonProps={{ danger: true }}
        />

        {/* modal de confirmacion para publicar o dejar de publicar*/}
        <Modal
          title={
            post.status === "1"
              ? "Deseas dejar de publicar este post?"
              : "Deseas publicar este post?"
          }
          open={isChekedModal}
          onCancel={handleCloseModalCheked}
          cancelText="Cancelar"
          okText={
            post.status === "1" ? "Sí, dejar de publicar" : "Sí, publicar"
          }
          onOk={() => handleUpdatePostPublish(post.id)}
          cancelButtonProps={{
            style: {
              backgroundColor: "#fff",
              color: "#005692",
              border: "1px solid #005692",
            },
          }}
          okButtonProps={{
            style: { backgroundColor: "#005692", color: "#fff" },
          }}
        />
      </div>
      {/*Fin del div  */}
    </>
  );
};

CardDashboard.propTypes = {
  post: proptypes.object.isRequired,
  setRefreshData: proptypes.func.isRequired,
  isCheked: proptypes.bool,
  onCheckboxChange: proptypes.func,
};

export default CardDashboard;
