/* eslint-disable react/prop-types */
import style from './QuestionDetail.module.css'
import data from '../../assets/data'
function QuestionView({ preguntaUsuario, respuestasUsuario }) {
    const { usuariosRespuestas } = data;

    
    return (
        <div className={style.container}>
            <div className={style.div1}>
                <h3>{preguntaUsuario?.preguntas.titulo}</h3>
                <strong><p>{preguntaUsuario.username}</p></strong>
                <p>{preguntaUsuario?.preguntas.descripcion}</p>
                <button>Responder</button>
            </div>

            <div className={style.contain}>
                {respuestasUsuario.map((respuesta, index) => {
                    return (
                        <div key={index} className={style.text}>
                            <strong>
                                <p>
                                    {usuariosRespuestas.map(usuario => {
                                        if (usuario.id === respuesta.id) {
                                            return usuario.username;
                                        }
                                    })}
                                </p>
                            </strong>
                            <p>{respuesta.texto}</p>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionView;
