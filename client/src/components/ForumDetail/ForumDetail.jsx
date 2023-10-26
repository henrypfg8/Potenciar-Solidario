import { useParams } from "react-router-dom";
import data from '../../assets/data';
import style from './ForumDetail.module.css';

function ForumDetail(){

    const { id } = useParams();
    const { usuarios, respuestas } = data;
    

    const preguntaUsuario = usuarios.find(usuario => usuario.id === Number(id))
console.log(preguntaUsuario);
    const arrayRespuestas = preguntaUsuario?.preguntas.respuestas
    
    const respuestasUsuario = respuestas.filter(respuesta => arrayRespuestas.includes(respuesta.id))


    return(
        <div>
            <div>
               <h3>{preguntaUsuario?.preguntas.titulo}</h3>
               <strong><p>{preguntaUsuario.username}</p></strong>
               <p>{preguntaUsuario?.preguntas.descripcion}</p>
            </div>

            <div>
                {respuestasUsuario.map((respuesta, index) => {
                    return(
                        <div key={index} className={style.text}>
                            <p>{respuesta.texto}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ForumDetail;
