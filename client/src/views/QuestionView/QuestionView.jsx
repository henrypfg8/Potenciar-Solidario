/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import style from "./QuestionDetail.module.css";
import { useEffect, useState } from "react";
import { FlechaAbajoIcon } from "../../assets/FlechaParaAbajoIcon";
import { FlechaParaArriba } from "../../assets/FlechaParaArribaIcon";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { jwtDecode } from "jwt-decode";
import { createAnswer, createAnswerComment } from "../../Redux/actions/answersActions";
import { useNavigate } from "react-router";
import { deleteQuestion, getQuestionDetail } from "../../Redux/actions/questionsActions";
import validation from "./validation";
import CustomizedMenus from "../../assets/MenuDespegable";
const socket = io("/");

function QuestionView({ question }) {
  const [userId, setUserId] = useState("");
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [view, setView] = useState({});
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState({
    thread: "",
    userId: "",
    answerId: ""
  });
  console.log(comment);
  const [errores, setErrores] = useState({
    answer: ''
  });
  const [answer, setAnswer] = useState({
    answer: "",
    userId: "",
    questionId: "",
  });
  const dispatch = useDispatch();

  const handleChange = (event, id) => {
    event.preventDefault()
    setComment({
      ...comment,
      thread: event.target.value,
      userId: userId,
      answerId: id
    });

  };

  const answersSubmit = (answer) => {
    if (Object.keys(errores).length === 0) {
      dispatch(createAnswer(answer)).then(() => {
        dispatch(getQuestionDetail(question.id));
        setAnswer({
          answer: "",
        });
        swal({
          icon: 'success',
          text: "Respuesta creada con éxito"
        }).catch(() => {
          swal({
            icon: 'error',
            text: `Contacte a soporte`
          });
        });
      });
    }
  };

  const handleSubmit = (message) => {
    dispatch(createAnswerComment(message))
      .then((response) => {
        setMessages([...messages, { body: message.thread, from: "me" }]);
        socket.emit("message", message.thread);
      })
      .catch((error) => {
        console.error("Error al agregar el comentario", error);
        // Puedes mostrar un mensaje de error al usuario si falla el envío del comentario
      });

  };

  useEffect(() => {
    if (!token || !isAuthenticated) {
      swal("Necesita loguearse para poder realizar una pregunta").then(
        (value) => {
          navigate("/login");
        }
      );
    }
    if (token) {
      const decodify = jwtDecode(token);
      if (decodify) {
        setUserId(decodify.id);
      }
    }
  }, [isAuthenticated, navigate, token]);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const handleView = (id) => {
    setView((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleAnswers = (event) => {
    setErrores(validation({
      ...answer,
      answer: event.target.value
    }));
    setAnswer({
      ...answer,
      answer: event.target.value,
      userId: userId,
      questionId: question.id,
    });
  };

  useEffect(() => {
    socket.on("message", (message) => {
    });
  }, []);

  useEffect(() => {
    if (errores.answer) {
      setDisable(true);

    } else {
      setDisable(false);
    }

  }, [handleAnswers, errores.answer]);

  const deleteQuestions = (handleClose) => {
    handleClose();
    swal({
      title: "¿Estás seguro de que deseas eliminar esta pregunta?",
      text: "Una vez eliminada, no podrá ser recuperada.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteQuestion(question.id)).then(() => {
            swal("Tu pregunta ha sido eliminada con éxito!", {
              icon: "success",
            });
            navigate('/foro');
          }).catch(() => {
            swal("Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.", {
              icon: 'error',
            });
          });

        }
      });
  };

  const editQuetion = (handleClose) => {
    handleClose();
    navigate(`/foro/edit/${question.id}`);
  };

  const dateQuestion = question?.createdAt?.split("T")[0];


  return (
    <div>
      {question ? (
        <div className={style.container}>
          <div className={style.div1}>
            {
              question.userId === userId
              &&
              <div className={style.option}>
                <CustomizedMenus deleteQuestion={deleteQuestions} editQuestion={editQuetion} />
              </div>
            }
            <h1>{question?.title}</h1>
            <div className={style.date}>
              <a>
                Fecha de publicación: <h5>{dateQuestion}</h5>
              </a>
            </div>
            <h3>{question?.User?.name}</h3>
            <p>{question?.text}</p>
          </div>

          <div className={style.contain}>
            {question?.Answers?.length > 0 ? (
              <div className={style.title}>
                <h2>
                  {question?.Answers?.length > 1 ? (
                    <h2>
                      <p>{question?.Answers?.length}</p> Respuestas
                    </h2>
                  ) : (
                    <h2>
                      <p>1</p>Respuesta
                    </h2>
                  )}
                </h2>
              </div>
            ) : (
              <div>
                <h2>No hay respuestas</h2>
              </div>
            )}

            {question.Answers?.map((respuesta, index) => {
              return (
                <div key={index} className={style.response}>
                  <p>{respuesta.answer}</p>
                  <h4>{respuesta.User.name}</h4>

                  {!view[index] ? (
                    <a onClick={() => handleView(index)}>
                      Añadir comentario
                      <FlechaAbajoIcon />
                    </a>
                  ) : (
                    <a onClick={() => handleView(index)}>
                      Añadir comentario
                      <FlechaParaArriba />
                    </a>
                  )}

                  {view[index] && (
                    <div className={style.comment}>
                      <ul>
                        {messages.map((message, index) => {
                          return (
                            <li key={index}>
                              {message.from}:{message.body}
                            </li>
                          );
                        })}
                      </ul>
                      <p>Comentar</p>
                      <textarea
                        style={{ resize: 'none' }}
                        name="thread"
                        type="text"
                        cols="6"
                        rows="5"
                        value={comment.thread}
                        onChange={(event) => handleChange(event)}
                      />
                      <button onClick={() => handleSubmit(comment)}>
                        Añadir comentario
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            <div className={style.question}>
              <div className={style.errores}>
                {errores.answer && <p>{errores.answer}</p>}
              </div>

              <textarea style={{ resize: 'none' }} type="text" name='answer' rows="8" value={answer.answer} onChange={handleAnswers} />

              {
                disable ?
                  <button
                    disabled
                    className={style.buttonDisable}
                    onClick={() => answersSubmit(answer)}
                  >
                    Responder
                  </button>
                  :

                  <button
                    onClick={() => answersSubmit(answer)}
                  >
                    Responder
                  </button>
              }
            </div>
          </div>
        </div>
      ) : <div className={style.container}>
        <h1>Cargando</h1>
      </div>}
    </div>  
  );
}

export default QuestionView;