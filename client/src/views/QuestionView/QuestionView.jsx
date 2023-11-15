/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import style from "./QuestionDetail.module.css";
import { useEffect, useState } from "react";
import { FlechaAbajoIcon } from "../../assets/FlechaParaAbajoIcon";
import { FlechaParaArriba } from "../../assets/FlechaParaArribaIcon";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { jwtDecode } from "jwt-decode";
import {
  createAnswer,
  createAnswerComment,
  updateAnswer,
} from "../../Redux/actions/answersActions";
import { useNavigate } from "react-router";
import {
  getQuestionDetail,
} from "../../Redux/actions/questionsActions";
import validation from "./validation";
import CustomizedMenus from "../../assets/MenuDespegable";
import ImageAvatars from "../../assets/AvatarImage";
import Notifications from "../../components/Notifications/Notifications";
import { Oval } from "react-loader-spinner";
import { MaterialSymbolsEdit } from "../../assets/MaterialSymbolsEdit";
import { MaterialSymbolsDelete } from "../../assets/MaterialSymbolsDelete";

function QuestionView({ question, answers, deleteAnswers, deleteQuestions }) {
  const [userId, setUserId] = useState("");
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingAnswer, setEditingAnswer] = useState("");
  const [view, setView] = useState({});
  const navigate = useNavigate();

  const [comment, setComment] = useState({
    thread: "",
    userId: "",
    answerId: "",
  });

  const [errores, setErrores] = useState({
    answer: "",
  });
  const handleEditClick = (answerId, answerText) => {
    setEditingAnswerId(answerId);
    setEditingAnswer(answerText);
  };

  const [answer, setAnswer] = useState({
    answer: "",
    userId: "",
    questionId: "",
  });

  const handleChange = (event, id) => {
    event.preventDefault();
    setComment({
      ...comment,
      thread: event.target.value,
      userId: userId,
      answerId: id,
      questionId: question.id,
    });
  };

  const answersSubmit = (answer) => {
    setDisable(true)
    if (Object.keys(errores).length === 0) {
      dispatch(createAnswer(answer)).then(() => {
        dispatch(getQuestionDetail(question.id));
        setAnswer({
          answer: "",
        });
        swal({
          icon: "success",
          text: "Respuesta creada con exito",
        }).catch(() => {
          setDisable(false);
          swal({
            icon: "error",
            text: `contacte a soporte`,
          });
        });
      }).catch(() => {
        setDisable(false);
      });
    }
    <Notifications />;
  };

  const handleSubmit = (message) => {
    dispatch(createAnswerComment(message))
      .then(() => {
        setComment({ thread: "" });
        swal({
          icon: "success",
          text: "Comentario creado con éxito",
        });
        dispatch(getQuestionDetail(question.id));
      })
      .catch(() => {
        swal({
          icon: "error",
          text: "contacte a soporte",
        });
      });
  };
  useEffect(() => {
    if (!token || !isAuthenticated) {
      swal("Necesita loguearse para poder realizar una pregunta").then(
        () => {
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

  const handleView = (id) => {
    setView((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleAnswers = (event) => {
    setErrores(
      validation({
        ...answer,
        answer: event.target.value,
      })
    );
    setAnswer({
      ...answer,
      answer: event.target.value,
      userId: userId,
      questionId: question.id,
    });
  };

  useEffect(() => {
    if (errores.answer) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [errores.answer]);

  const handleAnswerEdit = (event) => {
    setEditingAnswer(event.target.value)
  }

  const handleSubmitEditAnwer = (id) => {
    setDisable(true)
    dispatch(updateAnswer(id, { answer: editingAnswer })).then(() => {
      dispatch(getQuestionDetail(question.id))
      swal("Tu respuesta ha sido editada con exito!", {
        icon: "success",
      });
      setEditingAnswerId(null)
      setDisable(false)

    }).catch(() => {
      swal(
        "Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.",
        {
          icon: "error",
        }
      );
      setEditingAnswerId(null)
      setDisable(false)
    })

  }

  const editQuestion = (handleClose) => {
    handleClose();
    navigate(`/foro/edit/${question.id}`);
  };


  const dateQuestion = new Date(question?.createdAt)

  return (
    <div className={style.container}>
      {question ? (
        <div className={style.container}>
          <div className={style.div1}>
            <h1>{question?.title}</h1>
            {question.userId === userId && (
              <div className={style.option}>
                <CustomizedMenus
                  deleteQuestion={deleteQuestions}
                  editQuestion={editQuestion}
                />
              </div>
            )}
            <div className={style.date}>
              <ImageAvatars
                image={question?.User?.profile_picture}
                name={question?.User?.name}
              />



              <a>
                Fecha de publicacion:{<h4>{dateQuestion.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</h4>}
              </a>
            </div>

            <p>{question?.text}</p>
            {answers?.map((answer) =>
              answer.Comments?.map((comment) => (
                <div key={comment.id}>
                  <h3>{comment.User.name}</h3>
                  <p>{comment.thread}</p>
                  <p>{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
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
              var date = new Date(respuesta.createdAt);
              return (
                <div key={index} className={style.response}>
                  {
                    editingAnswerId === respuesta.id ?
                      (
                        <div className={style.editAnwer}>
                          <input type="text" value={editingAnswer} onChange={handleAnswerEdit} />
                          {
                            disable
                              ?
                              <button disabled
                                className={style.buttonDisable}>Guardar</button>
                              :
                              <button onClick={() => handleSubmitEditAnwer(respuesta.id)}>Guardar</button>
                          }
                        </div>
                      )
                      :

                      <div>

                        <p>{respuesta.answer}</p>
                        <h4>{respuesta.User.name} - {date.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}<h4></h4></h4>
                      </div>

                  }

                  {
                    userId === respuesta.userId &&
                    editingAnswerId !== respuesta.id &&
                    <div className={style.edit}>
                      <a onClick={() => deleteAnswers(respuesta.id)}>Eliminar Respuesta <MaterialSymbolsDelete /></a>
                      <a onClick={() => handleEditClick(respuesta.id, respuesta.answer)}>Editar Respuesta <MaterialSymbolsEdit /></a>
                    </div>
                  }
                  <div>
                    {respuesta?.Comments?.map((el, index) => {
                      var date = new Date(el.createdAt);
                      return (
                        <div
                          key={el.id}
                          className={style.comments}
                        >
                          <h4>{index + 1}</h4>
                          <p>{el.thread} -</p>
                          <h3>{el.User?.name}</h3>
                          <h4>{date.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</h4>
                        </div>
                      );
                    })}

                  </div>
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
                      <p>Comentar</p>
                      <textarea
                        style={{ resize: "none" }}
                        name="thread"
                        type="text"
                        cols="6"
                        rows="5"
                        value={comment.thread}
                        onChange={(e) => handleChange(e, respuesta.id)}
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
              <label htmlFor="">¿Cuál es tu respuesta? </label>
              <textarea
                style={{ resize: "none" }}
                type="text"
                name="answer"
                rows="8"
                value={answer.answer}
                onChange={handleAnswers}
              />

              {disable ?
                <button
                  disabled
                  className={style.buttonDisable}
                >
                  Responder
                </button>
                :
                <button className={style.button} onClick={() => answersSubmit(answer)}>Responder</button>
              }
            </div>
          </div>
        </div>
      ) : (
        <Oval
          height={80}
          width={80}
          color="#005692"
          wrapperStyle={{ margin: "auto auto" }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#a4d4ff"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      )}
    </div>
  );
}

export default QuestionView;
