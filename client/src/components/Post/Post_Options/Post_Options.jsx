import Styles from "./post_Options.module.css";
//
import DeleteIcon from "../../../assets/DeleteIcon";
import { ModifyPost_Icon } from "../../../assets/PostOptions_Icons";
//
//
import axios from "axios";
//
import { configureHeaders } from "../../../Redux/auth/configureHeaders ";
//
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
//
import { Modal } from 'antd';

export default function Post_Options({ id, setRefreshData }) {
  const config = configureHeaders();
  const navigate = useNavigate();
  //
  const [isOpen, setIsOpen] = useState(false);
  
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
    try {
      await handleDeleteById(id);
      setIsOpen(false);
    } catch (error) {
      console.log(error)
    }
  }
  

 
  ////////////////////////////////////////

  return (
    <div className={Styles.Options}>
      <div className={Styles.Options__option} id={Styles.deleteOption} onClick={() => {setIsOpen(true)}}>
        <p>Eliminar</p>
        <DeleteIcon className={Styles.Option_icon}  />
      </div>
      <div className={Styles.Options__option} onClick={() => navigate(`/formulario/${id}`)}>
        <p>Modificar</p>
        <ModifyPost_Icon className={Styles.Option_icon} />
      </div>

      <Modal
        title="Estas seguro de eliminar esta publicación?"
        open={isOpen}
        onOk={handleOk}
        onCancel={() => setIsOpen(false)}
        cancelText="Cancelar"
        okText="Sí,Eliminar"
        okButtonProps={{
          danger: true,
        }}
        cancelButtonProps={{
          style: {
            color: "#005692",
            borderColor: "#005692",
          },
        }}
      />
    </div>
  );
}
