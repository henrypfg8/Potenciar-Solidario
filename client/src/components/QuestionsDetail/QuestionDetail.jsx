import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { jwtDecode } from "jwt-decode";
import { createAnswer } from '../../Redux/actions/answersActions';
import { useNavigate } from 'react-router';
import { getQuestionDetail } from '../../Redux/actions/questionsActions';

const socket = io('/')

export function QuestionDetail() {

    const { id } = useParams();
    const questionDetail = useSelector(state => state.questions.questionDetail)

    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const { isAuthenticated, token } = useSelector(state => state?.auth)
    const [view, setView] = useState({});
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');
    const [decodify, setDecodify] = useState('')
    const [answer, setAnswer] = useState({
        answer: '',
        userId: jwtDecode(token)?.id || '',
        questionId: ''
    })

    useEffect(() => {
        dispatch(getQuestionDetail(id))
        // console.log(questionDetail);
    }, [])
    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    const handleAnswers = (event) => {
        setAnswer({
            ...answer,
            questionId: questionDetail?.id,
            answer: event.target.value
        })
    }
    const answersSubmit = (answer) => {
        console.log(answer)
        if (answer.answer.length < 20) {
            swal('Debe tener minimo 20 caracteres la respuesta')
        } else {

            dispatch(createAnswer(answer)).then(() => {
                dispatch(getQuestionDetail(questionDetail.id))
                swal({
                    icon: 'success',
                    text: 'Respuesta realizada con exito!'
                }).then(() => {

                })
            }).catch(() => {
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
    useEffect(() => {
        if (!token || !isAuthenticated) {
            swal("Necesita loguearse para poder realizar una pregunta")
                .then((value) => {
                    navigate('/login')
                });
        }
        if (token) {
            setDecodify(jwtDecode(token))
            if (decodify) {
                setUserId(decodify.id)
            }
        }
    }, [])
    const receiveMessage = (message) => {

        setMessages((state) => [...state, message]);
    }
    useEffect(() => {
        socket.on("message", receiveMessage);

        return () => {
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
    let dateQuestion;
    useEffect(() => {
        socket.on('message', message => {

            console.log(message);
        });
    }, [])
    if (questionDetail) {
        dateQuestion = questionDetail?.createdAt?.split('T')[0]
    }


    return {
        userId,
        dateQuestion,
        questionDetail,
        view,
        messages,
        message,
        decodify,
        answer,
        handleChange,
        handleAnswers,
        answersSubmit,
        handleSubmit,
        handleView
    }
}
