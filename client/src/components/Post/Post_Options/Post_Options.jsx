import Styles from "./post_Options.module.css";
//
import DeleteIcon from "../../../assets/DeleteIcon";
import { ModifyPost_Icon } from "../../../assets/PostOptions_Icons";

export default function Post_Options() {
  const deleteHandler = (e) => {
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
        // Swal.fire({
        //   title: "Publicación Eliminada",
        //   icon: "success",
        //   customClass: {
        //     confirmButton: "swallowOkButton",
        //   },
        // });
      }
    });
    setTimeout(() => {
      dispatch(getPosts());
    }, 200);
  };

  ////////////////////////////////////////

  return (
    <div className={Styles.Options}>
      <div className={Styles.Options__option} id={Styles.deleteOption}>
        <p>Eliminar</p>
        <DeleteIcon className={Styles.Option_icon} />
      </div>
      <div className={Styles.Options__option}>
        <p>Modificar</p>
        <ModifyPost_Icon className={Styles.Option_icon}/>
      </div>
    </div>
  );
}
