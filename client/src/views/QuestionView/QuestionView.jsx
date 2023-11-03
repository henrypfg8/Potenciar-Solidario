    /* eslint-disable react/prop-types */
    import style from './QuestionDetail.module.css'
    import { useEffect, useState } from 'react';
    import { FlechaAbajoIcon } from '../../assets/FlechaParaAbajoIcon';
    import { FlechaParaArriba } from '../../assets/FlechaParaArribaIcon';
    import io from 'socket.io-client'
    import { useDispatch, useSelector } from 'react-redux';
    import swal from 'sweetalert';
    import { jwtDecode } from "jwt-decode";
    import { createAnswer } from '../../Redux/actions/answersActions';
    import { useNavigate } from 'react-router';
    import { getQuestionDetail } from '../../Redux/actions/questionsActions';
    const socket = io('/')

    function QuestionView({ question }) {
        const dispatch = useDispatch()
        const [userId, setUserId] = useState('')
        const {isAuthenticated, token} = useSelector(state => state?.auth)
        const [view, setView] = useState({});
        const navigate = useNavigate()
        const [messages, setMessages] = useState([])
        const [message, setMessage] = useState('');
        const [ decodify, setDecodify] = useState('')
        const [answer, setAnswer] = useState({
            answer:'',
            userId: jwtDecode(token)?.id || '',
            questionId: ''
        })
        // console.log(question?);
        
        const handleChange = (event) => {
            setMessage(event.target.value)
        }
        
        const handleAnswers = (event) => {
            setAnswer({
                ...answer,
                questionId: question?.id,
                answer: event.target.value
            })
        }
        const answersSubmit = (answer) => {
            console.log(answer)
            if(answer.answer.length < 20){
                swal('Debe tener minimo 20 caracteres la respuesta')
            }else{

                dispatch(createAnswer(answer)).then(() => {
                    dispatch(getQuestionDetail(question.id))
                    swal({
                        icon: 'success',
                        text: 'Respuesta realizada con exito!'
                    }).then(() => {

                    })
                }).catch(()=>{
                    swal({
                        icon: 'error',
                        text: 'Error intente de nuevo!'
                    })
                })
            }
            }
        
        
        const handleSubmit = (message) => {
            event.preventDefault()
            const newMessage = {
                body: message,
                from: 'me'
            }
            setMessages([...messages, newMessage])
            socket.emit('message', message)
            
        }
        useEffect(()=>{
            if (!token || !isAuthenticated) {
                swal("Necesita loguearse para poder realizar una pregunta")
                    .then((value) => {
                        navigate('/login')
                    });
            }
            if(token){
                setDecodify(jwtDecode(token))
                if(decodify){
                    setUserId(decodify.id)
                }
            }
        },[])
        const receiveMessage = (message) => {

            setMessages((state) => [...state, message]);
        }
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
        let dateQuestion;
        if(question){
            dateQuestion = question?.createdAt.split('T')[0]
        }

        return (
            <div >
                {
                    question ?
                        <div className={style.container}>

                            <div className={style.div1}>
                                <div >

                                    <h1>{question?.title}</h1>
                                    <div className={style.date}>
                                        <a>Fecha de publicacion: <h5>{dateQuestion}</h5></a>
                                    </div>
                                    <h3>{question.User.name}</h3>
                                    <p>{question.text}</p>
                                </div>
                            </div>

                            <div className={style.contain}>
                                {
                                    question?.Answers.length > 0 ?
                                        <div className={style.title}>
                                            <h2>
                                                {question?.Answers?.length > 1 ? <h2><p>{question?.Answers?.length}</p> Respuestas</h2> : <
                                                    h2><p>1</p>Respuesta</h2>}

                                            </h2>
                                        </div>
                                        :
                                        <div>
                                            <h2>No hay respuestas</h2>
                                        </div>
                                }

                                {question?.Answers?.map((respuesta, index) => {
                                    return (
                                        <div key={index} className={style.response}>

                                            <p>{respuesta.answer}</p>
                                            <h4>{respuesta.User.name}</h4>


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
