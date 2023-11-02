/* eslint-disable react/prop-types */
import style from './QuestionDetail.module.css'
import { useEffect, useState } from 'react';
import { FlechaAbajoIcon } from '../../assets/FlechaParaAbajoIcon';
import { FlechaParaArriba } from '../../assets/FlechaParaArribaIcon';
import io from 'socket.io-client'
const socket = io('/')

function QuestionView({ question }) {
    const [view, setView] = useState({});
    const [messages, setMessages] = useState('')
    const [answers, setAnswers] = useState('')

    const handleChange = (event) => {
        setMessages(event.target.value)
    }
    const handleAnswers = (event) => {
        setAnswers(event.target.value)

    }
    const handleSubmit = (message) => {
        socket.emit('message', message)
        event.preventDefault()

    }

    useEffect(() => {
        socket.on("message", message => {
            console.log(message);
            setMessages([...messages, message])
        });

    }, [])
    const handleView = (id) => {
        setView(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        })
        )
    }
    useEffect(() => {
        socket.on('message', message => {

            console.log(message);
        });
    }, [])

    console.log(question);

    return (
        <div >
            {
                question ?
                    <div className={style.container}>

                        <div className={style.div1}>
                            <div >

                                <h1>{question?.title}</h1>
                                <div className={style.date}>
                                    <a>Publicado: <h5>20-01-2021</h5></a>
                                </div>
                                {/* <h3>{question.username}</h3> */}
                                <p>{question.text}</p>
                            </div>
                        </div>

                        <div className={style.contain}>
                            {
                                question.Answers.length > 0 ?
                                    <div className={style.title}>
                                        <h2>
                                            {question.Answers.length > 1 ? <h2><p>{question.Answers.length}</p> Respuestas</h2> : <
                                                h2><p>1</p>Respuesta</h2>}

                                        </h2>
                                    </div>
                                    :
                                    <div>
                                        <h2>No hay respuestas</h2>
                                    </div>
                            }

                            {question.Answers?.map((respuesta, index) => {
                                return (
                                    <div key={index} className={style.response}>

                                        <p>{respuesta.text}</p>
                                        <h4>
                                            {/* {usuariosRespuestas.map(usuario => {
                                    if (usuario.id === respuesta.id) {
                                        return usuario.username;
                                    }
                                })} */}
                                        </h4>


                                        {!view[index] ? <a onClick={() => handleView(index)}>Añadir comentario<FlechaAbajoIcon /></a> : <a onClick={() => handleView(index)}>Añadir comentario<FlechaParaArriba /></a>
                                        }

                                        {view[index] && <div className={style.comment}>
                                            <p>Comentar</p>
                                            <textarea type="text" cols="6" rows="5" onChange={() => handleChange(event)} />
                                            <button onClick={() => handleSubmit(messages)}>Añadir comentario</button>
                                        </div>}
                                    </div>
                                )
                            })}
                            <div className={style.question}>
                                <textarea type="text" rows="8" />
                                <button>Responder</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        Cargando
                    </div>
            }
        </div>
    )
}

export default QuestionView;
