import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionDetail } from "../../Redux/actions/questionsActions";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
import { createAnswer } from "../../Redux/actions/answersActions";

function QuestionDetail() {
    const { id } = useParams();
    const questionDetail = useSelector((state) => state.questions.questionDetail);
    const socket = io();

    
        dispatch(getQuestionDetail(id));
        // console.log(questionDetail);

        const dispatch = useDispatch();
        const [userId, setUserId] = useState('')
        const { isAuthenticated, token } = useSelector(state => state?.auth)
        const [view, setView] = useState({});
        const navigate = useNavigate()
        const [messages, setMessages] = useState([])
        const [message, setMessage] = useState({});
        const [decodify, setDecodify] = useState('')
        const [answer, setAnswer] = useState({
            answer: '',
            userId: jwtDecode(token)?.id || '',
            questionId: ''
        })
        console.log(message);
        console.log(messages);

        useEffect(() => {
            dispatch(getQuestionDetail(id))
            // console.log(questionDetail);
            socket?.on(`question_${id}`, () => {
                dispatch(getQuestionDetail(id));
            });

            return () => {
                socket?.removeAllListeners(`question_${id}`);
            };
        }, []);
    
    const handleChange = (event) => {
                setMessage((state) => ({
                    ...state,
                    message:[event.target.value]

                }))
    }

    const handleAnswers = (event) => {
        setAnswer({
            ...answer,
            questionId: questionDetail?.id,
            answer: event.target.value
        })
    }
    const answersSubmit = (answer) => {
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
    console.log(message);
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

        setMessages((state) => ({
            ...state,

            message


        }));
    }
    console.log(receiveMessage);
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

export default QuestionDetail;
