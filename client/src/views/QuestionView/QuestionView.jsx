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
  deleteAnswerComment,
  updateAnswer,
  updateAnswerComment,
} from "../../Redux/actions/answersActions";
import { useNavigate } from "react-router";
import {
  getQuestionDetail,
} from "../../Redux/actions/questionsActions";
import CustomizedMenus from "../../assets/MenuDespegable";
import ImageAvatars from "../../assets/AvatarImage";
import Notifications from "../../components/Notifications/Notifications";
import { Oval } from "react-loader-spinner";
import { MaterialSymbolsEdit } from "../../assets/MaterialSymbolsEdit";
import { MaterialSymbolsDelete } from "../../assets/MaterialSymbolsDelete";
import validationAnswer from "./validationAnswer";
import validationEditAnswer from "./validationEditAnswer";
import validationComment from "./validationComment";
import validationEditComment from "./validationEditComment";

function QuestionView({ question, answers, deleteAnswers, deleteQuestions }) {
  const [userId, setUserId] = useState("");
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [disableAnwers, setDisableAnwers] = useState(false);
  const [disableAnwersEdit, setDisableAnwersEdit] = useState(false);
  const [disableComment, setDisableComment] = useState(false);
  const [disableCommentEdit, setDisableCommentEdit] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingAnswer, setEditingAnswer] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingComment, setEditingComment] = useState('')
  const [view, setView] = useState({});
  const navigate = useNavigate();

  const [comment, setComment] = useState({
    thread: "",
    userId: "",
    answerId: "",
  });

  const [erroresAnswer, setErroresAnswers] = useState({
    answer: "",
  });
  const [erroresAnswerEdit, setErroresAnswersEdit] = useState({
    editingAnswer: "",
    
  });
  const [erroresComment, setErroresComment] = useState({
    thread: ''
  })
  const [erroresCommentEdit, setErroresCommentEdit] = useState({
    editingComment: ''
  })
  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId)
    setEditingComment(commentText)
  }
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
    setErroresComment(validationComment({
      ...erroresComment,
      thread: event.target.value
    }))
  };
  const answersSubmit = (answer) => {
    setDisableAnwers(true)
    if (Object.keys(erroresAnswer).length === 0) {
      dispatch(createAnswer(answer)).then(() => {
        dispatch(getQuestionDetail(question.id));
        setAnswer({
          answer: "",
        });
        swal({
          icon: "success",
          text: "Respuesta creada con exito",
        }).catch(() => {
          setDisableAnwers(false);
          swal({
            icon: "error",
            text: `contacte a soporte`,
          });
        });
      }).catch(() => {
        setDisableAnwers(false);
      });
    }
    <Notifications />;
  };
  const handleSubmit = (message, index) => {
    if(message.thread === ''){
      swal({
        icon: "error",
        text: "No puedes enviar un comentario vacio",
      }); 
      return
    }
    if(Object.keys(erroresComment).length === 0){

      dispatch(createAnswerComment(message))
        .then(() => {
          setComment({ thread: "" });
          setView((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
          }));
          dispatch(getQuestionDetail(question.id));
          swal({
            icon: "success",
            text: "Comentario creado con éxito",
          });
        })
        .catch(() => {
          swal({
            icon: "error",
            text: "Contacte a soporte",
          });
        });
      }
      else{

        swal({
          icon: "error",
          text: "No puedes enviar un comentario vacio",
        }); 
      }
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
    setAnswer({
      ...answer,
      answer: event.target.value,
      userId: userId,
      questionId: question.id,
    });
    setErroresAnswers(
      validationAnswer({
        ...erroresAnswer,  
        answer: event.target.value,
      })
    );
  };

  useEffect(() => {
    if (erroresAnswer.answer) {
      setDisableAnwers(true);
    } else {
      setDisableAnwers(false);
    }
    if(erroresAnswerEdit.answer){
      setDisableAnwersEdit(true)
    }else{
      setDisableAnwersEdit(false)
    }
    if(erroresComment.thread){
      setDisableComment(true)
    }else{
      setDisableComment(false)
    }
    if(erroresCommentEdit.editingComment){
      setDisableCommentEdit(true)
    }else{
      setDisableCommentEdit(false)
    }
  }, [erroresAnswer.answer, erroresAnswerEdit.answer, erroresComment.thread, erroresCommentEdit.editingComment]);
  const handleAnswerEdit = (event) => {
    setEditingAnswer(event.target.value)
    setErroresAnswersEdit(
      validationEditAnswer({
        ...erroresAnswer,  
        editingAnswer: event.target.value,
      })
    );
  }
  const handleCommentEdit = (event) => {
    setEditingComment(event.target.value)
    setErroresCommentEdit(
      validationEditComment({
        ...erroresCommentEdit,  
        editingComment: event.target.value,
      })
    );
    
  }
  console.log(erroresCommentEdit);

  const handleSubmitEditAnwer = (id) => {
    setDisableAnwers(true)
    dispatch(updateAnswer(id, { answer: editingAnswer })).then(() => {
      dispatch(getQuestionDetail(question.id))
      swal("Tu respuesta ha sido editada con exito!", {
        icon: "success",
      });
      setEditingAnswerId(null)
      setDisableAnwers(false)
      
    }).catch(() => {
      swal(
        "Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.",
        {
          icon: "error",
        }
        );
        setEditingAnswerId(null)
        setDisableAnwers(false)
      })
      
}
console.log(erroresComment);
  const handleSubmitEditComment = (id) => {
    dispatch(updateAnswerComment(id, { thread: editingComment})).then(() => {
      dispatch(getQuestionDetail(question.id))
      swal("Tu comentario ha sido editada con exito!", {
        icon: "success",
      });
      setEditingCommentId(null)

    }).catch(() => {
      swal(
        "Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.",
        {
          icon: "error",
        }
        );
        setEditingCommentId(null)
      })
      
}
const deleteComment = (id) => {

  swal({
    title: "¿Estás seguro quse sea eliminar está pregunta?",
    text: "Una vez eliminada por puede ser recuperada!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      dispatch(deleteAnswerComment(id))
        .then(() => {
          swal("Tu comentario ha sido eliminada con éxito!", {
            icon: "success",
          });
          dispatch(getQuestionDetail(question.id))
        })
        .catch(() => {
          swal(
            "Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.",
            {
              icon: "error",
            }
          );
        });
    }
  });
}
  const editQuestion = (handleClose) => {
    handleClose();
    navigate(`/foro/edit/${question.id}`);
  };
  const cancelEditComment= () =>{
    setEditingCommentId(null)
  }
  const cancelEditAnwer= () =>{
    setEditingAnswerId(null)
  }


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
                          
              <div className={style.errores}>
                {erroresAnswerEdit && <h3>{erroresAnswerEdit.answer}</h3>}
              </div>
                          <input type="text" value={editingAnswer} onChange={handleAnswerEdit} />
                          <div className={style.buttonEdit}>

                            <button onClick={cancelEditAnwer} className={style.buttonError}>Cancelar</button>
                          {
                            disableAnwersEdit
                            ?
                            <button disabled
                            className={style.buttonDisable}>Guardar</button>
                            :
                            <button onClick={() => handleSubmitEditAnwer(respuesta.id)} className={style.button}>Guardar</button>
                          }
                          </div>
                        </div>
                      )
                      :

                      <div>
                        <p>{respuesta.answer}</p>

                        <div style={{display: 'flex', alignItems:'center', justifyContent:'end', marginTop:'2rem', marginBottom:'1rem'}}>
                            <ImageAvatars name={respuesta.User?.name} image={respuesta.User?.profile_picture}/>
                          <h4>- {date.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</h4>
                          </div></div>

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
                    {respuesta?.Comments?.map((el) => {
                      var date = new Date(el.createdAt);
                      return (
                        <div key={el.id} className={style.containComments}>
                        {
                           editingCommentId === el.id ?
                            (
                              <div className={style.editAnwer}>
                                  <div className={style.errores}>
                {erroresCommentEdit && <h3>{erroresCommentEdit.editingComment}</h3>}
              </div>
                                <input type="text" value={editingComment} onChange={handleCommentEdit} />
                                
                                <div className={style.buttonEdit}>

                                    <button onClick={cancelEditComment} className={style.buttonError}>Cancelar</button>
                                    {
                                     disableCommentEdit
                                     ? 
                                     <button disabled
                                     className={style.buttonDisable} >Guardar</button>
                                     :
                                     <button onClick={() => handleSubmitEditComment(el.id)}  className={style.button}>Guardar</button>

                                    }
                                </div>
                                
                              </div>
                            )

                            :
                             ( 
                            <div className={style.comments}>
                              <div style={{display: 'flex', alignItems:'center'}}>
                                <ImageAvatars name={el.User?.name} image={el.User?.profile_picture}/>
                              <h4>- {date.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</h4>
                              </div>
                              <p>{el.thread}</p>
                              </div>
                             )
                             
                             
                            } 
                            {
                      userId === el.userId &&
                      
                      <div className={style.edit}>
                        <a onClick={() => {deleteComment(el.id)}}>Eliminar comentario<MaterialSymbolsDelete/></a>
                        <a onClick={() => {handleEditComment(el.id, el.thread)}}>Editar comentario <MaterialSymbolsEdit/></a>
                      </div>  
                      }
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
                      <div className={style.errores}>
                {erroresComment && <h4>{erroresComment.thread}</h4>}
              </div>
                      <textarea
                        style={{ resize: "none" }}
                        name="thread"
                        type="text"
                        cols="6"
                        rows="5"
                        value={comment.thread}
                        onChange={(e) => handleChange(e, respuesta.id)}
                      />
                      {
                        disableComment 
                        ? 
                      <button disabled className={style.buttonDisable}>
                        Añadir comentario
                      </button>
                      :
                      <button onClick={() => handleSubmit(comment, index)} className={style.button}>
                        Añadir comentario
                      </button>
                        
                      }
                    </div>
                  )}
                </div>
              );
            })}
            <div className={style.question}>
              <div className={style.errores}>
                {erroresAnswer.answer && <h3>{erroresAnswer.answer}</h3>}
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

              {disableAnwers ?
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
