/* eslint-disable react/prop-types */
import style from './QuestionDetail.module.css'
import { useEffect, useState } from 'react';
import { FlechaAbajoIcon } from '../../assets/FlechaParaAbajoIcon';
import { FlechaParaArriba } from '../../assets/FlechaParaArribaIcon';
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';
import { createAnswer } from '../../Redux/actions/answersActions';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import {jwtDecode} from 'jwt-decode'; // Corrección aquí: importa jwtDecode directamente
const socket = io('/')

function QuestionView({ question }) {
    const [userId, setUserId] = useState('')
    const {isAuthenticated, token} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [view, setView] = useState({});
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');
    const [answer, setAnswer] = useState({
        userId,
        questionId: '',
        answer:''
    })
    const dispatch = useDispatch()
     useEffect(()=>{
        if (!token || !isAuthenticated) {
            swal("Necesita loguearse para poder realizar una respuesta")
                .then((value) => {
                    console.log(value);
                    navigate('/login')
                });
        }
        if(token){
            const decodify = jwtDecode(token)
            if(decodify){
                setUserId(decodify.id)
                setAnswer(prev => ({ ...prev, userId: decodify.id })); // Corrección aquí: actualiza el userId en el estado de answer
            }
        }
    },[])

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    console.log(answer);
    const handleAnswers = (event) => {
        setAnswer({...answer,
            answer:event.target.value})

    }
    const answersSubmit = (event) => {
        event.preventDefault(); // Corrección aquí: previene el comportamiento predeterminado del formulario
        dispatch(createAnswer(answer)) // Corrección aquí: pasa el estado de answer a la acción createAnswer
        console.log(answer);
    }
    const handleSubmit = (event, message) => { // Corrección aquí: agrega event a los argumentos de la función
        event.preventDefault()
        const newMessage = {
            body: message,
            from: 'me'
        }
        setMessages([...messages, newMessage])
        socket.emit('message', message)
        
    }
    const receiveMessage = (message) => 
    setMessages((state) => [...state, message]);

    useEffect(() => {
        socket.on("message", receiveMessage);

        return () =>{
            socket.off("message", receiveMessage)
        }

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
                                            <ul>
                                                {messages.map((message, index) => {
                                                    return(
                                                        <li key={index}>{message.from}:{message.body}</li>
                                                    )
                                                } )}
                                            </ul>
                                            <p>Comentar</p>
                                            <textarea type="text" cols="6" rows="5" onChange={() => handleChange(event)} />
                                            <button onClick={() => handleSubmit(message)}>Añadir comentario</button>
                                        </div>}
                                    </div>
                                )
                            })}
                            <div className={style.question}>
                                <textarea type="text" rows="8" onChange={handleAnswers} />
                                <button onClick={() => answersSubmit(answer)}>Responder</button>
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
