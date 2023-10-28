/* eslint-disable react/prop-types */
import style from './QuestionDetail.module.css'
import data from '../../assets/data'
import { useState } from 'react';
function QuestionView({ preguntaUsuario, respuestasUsuario }) {
    const { usuariosRespuestas } = data;

    const [view, setView] = useState({})

    const handleView = (id) => {
        setView(prevState => ({
           ...prevState,
           [id]: !prevState[id]
        })
        )
    }

    
    return (
        <div className={style.container}>
            <div className={style.div1}>
                <div>

                <h1>{preguntaUsuario?.preguntas.titulo}</h1>
                <div className={style.date}>
                <a>Publicado: <h5>20-01-2021</h5></a>
                </div>
                <h3>{preguntaUsuario.username}</h3>
                <p>{preguntaUsuario?.preguntas.descripcion}</p>
                </div>
            </div>

            <div className={style.contain}>
                {respuestasUsuario && respuestasUsuario?.map((respuesta, index) => {
                    return (
                        <div key={index} className={style.response}>
                          
                            <p>{respuesta.texto}</p>
                                <h4>
                                    {usuariosRespuestas.map(usuario => {
                                        if (usuario.id === respuesta.id) {
                                            return usuario.username;
                                        }
                                    })}
                                </h4>
                        
                        
                        
                                <a onClick={() => handleView(index)}>Añadir comentario</a>
            {view[index] && <div className={style.comment}>
                <textarea type="text" cols="2" rows="4"></textarea>
                <button>Responder</button>
                </div>}
                        </div>
                    )
                })}
                <div className={style.question}>
                <textarea type="text" cols="4" rows="8"></textarea>
                <button>Responder</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionView;
