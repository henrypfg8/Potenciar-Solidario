import { useState } from "react";
import proptypes from "prop-types";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../Redux/actions/postsActions";
import { Modal } from "antd";
import { Styles } from "./dashboard.module.css";
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
      console.log(error.response);
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
    <div>
      <div className={Styles.dashboard__card}>
        <div style={{ padding: "0.5rem" }}>
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
        {/* fin del div */}
        <div
          id="divContenedor"
          style={{ display: "flex", flexDirection: "column", width: "80%" }}
        >
          {post.User?.profile_picture ? (
            <Avatar src={`${post.User?.profile_picture}`} size={40} />
          ) : (
            <Avatar icon={<UserOutlined />} size={40} />
          )}
          <div style={{ display: "flex" }}>
            <p
              style={{
                color: "#06213d",
                fontWeight: "900",
                display: "inline-block",
              }}
            >
              nombre:{" "}
              <span style={{ color: "#06213d", fontWeight: "900" }}>
                {post.User?.name}
              </span>
            </p>
            <p style={{ color: "#06213d", fontWeight: "900" }}>
              {post.User?.lastname}
            </p>
          </div>
          <div
            style={{
              width: "40%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="infomation" style={{ display: "flex" }}>
              <p style={{ color: "#06213d", fontWeight: "900" }}>
                ONG: {post.organization}
              </p>
            </div>
            <div
              id="descriptionDiv"
              style={{
                overflow: "hidden",
                width: "80%",
              }}
            >
              <p
                id="description"
                style={{
                  width: "90%",
                }}
              >
                {post.description}
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard__selected">
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
      </div>
      {/*Fin del div  */}
    </div>
  );
};

CardDashboard.propTypes = {
  post: proptypes.object.isRequired,
  setRefreshData: proptypes.func.isRequired,
  isCheked: proptypes.bool,
  onCheckboxChange: proptypes.func,
};

export default CardDashboard;
