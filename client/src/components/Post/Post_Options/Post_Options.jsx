import Styles from "./post_Options.module.css";
//
import DeleteIcon from "../../../assets/DeleteIcon";
import { ModifyPost_Icon } from "../../../assets/PostOptions_Icons";
//
import Swal from "sweetalert2";
//
import axios from 'axios';
//
import { configureHeaders } from '../../../Redux/auth/configureHeaders ';
//
import { useDispatch } from 'react-redux'
import { getPosts } from "../../../Redux/actions/postsActions";


export default function Post_Options({ id }) {
  const config = configureHeaders();
  const dispatch = useDispatch()
  //
  const deleteHandler = (e) => {
    console.log('el delete', e)
    e.preventDefault();
    Swal.fire({
      title: "¿Seguro que quieres eliminar la publicación?",
      icon: "warning",
      iconColor: "#005692",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:19789/posts/${id}`, config);
        setTimeout(() => {
          dispatch(getPosts());
        }, 0);
        // Swal.fire({
        //   title: "Publicación Eliminada",
        //   icon: "success",
        //   customClass: {
        //     confirmButton: "swallowOkButton",
        //   },
        // });
      }
    });

  };

  ////////////////////////////////////////

  return (
    <div className={Styles.Options}>
      <div className={Styles.Options__option} id={Styles.deleteOption}>
        <p>Eliminar</p>
        <DeleteIcon className={Styles.Option_icon} onClick={deleteHandler} />
      </div>
      <div className={Styles.Options__option}>
        <p>Modificar</p>
        <ModifyPost_Icon className={Styles.Option_icon} />
      </div>
    </div>
  );
}
