/* eslint-disable react/prop-types */
import style from './QuestionDetail.module.css'
import data from '../../assets/data'
import { useState } from 'react';
import { FlechaAbajoIcon } from '../../assets/FlechaParaAbajoIcon';
import { FlechaParaArriba } from '../../assets/FlechaParaArribaIcon';
import io from 'socket.io-client'

function QuestionView({ preguntaUsuario, respuestasUsuario }) {
    const socket = io('/')
    const { usuariosRespuestas } = data;

    const [view, setView] = useState({});
    const [chat, setChat] = useState('')

    const handleChange = (event) => {
        event.preventDefault()
        setChat(event.target.value)
    }
    const handleSubmit = (chat) => {
        socket.emit('chat', chat)
        
    }
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
                {
                    respuestasUsuario.length > 0 ?
                        <div className={style.title}>
                            <h2>
                                {respuestasUsuario.length > 1 ? <h2><p>{respuestasUsuario.length}</p> Respuestas</h2> : <
                                    h2><p>1</p>Respuesta</h2>}

                            </h2>
                        </div>
                        :
                        <div>
                            <h2>No hay respuestas</h2>
                        </div>
                }

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


                            {!view[index] ?  <a onClick={() => handleView(index)}>Añadir comentario<FlechaAbajoIcon/></a> : <a onClick={() => handleView(index)}>Añadir comentario<FlechaParaArriba/></a>
                            }
                           
                            {view[index] && <div className={style.comment}>
                            <p>Comentar</p>
                                <textarea type="text" cols="6" rows="5" onChange={()=>handleChange(event)} />
                                <button onClick={()=> handleSubmit(chat)}>Añadir comentario</button>
                            </div>}
                        </div>
                    )
                })}
                <div className={style.question}>
                    <textarea type="text" rows="8"/>
                    <button>Responder</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionView;
