import { useNavigate, useParams } from "react-router-dom";
import QuestionView from "../../views/QuestionView/QuestionView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, getQuestionDetail } from "../../Redux/actions/questionsActions";
import { io } from "socket.io-client";
import swal from "sweetalert";
import { deleteAnswer } from "../../Redux/actions/answersActions";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const questionDetail = useSelector(
    (state) => state.questions?.questionDetail
  );
  const answers = useSelector((state) => state.answers?.answers);
  const navigate = useNavigate();
  const socket = io();
  const deleteAnswers = (index) => {
    swal({
      title: "¿Desea eliminar esta respuesta?",
      text: "! Una vez eliminada no se puede revertir !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
    console.log(index);
      if (willDelete) {
        dispatch(deleteAnswer(index))
        .then(() => {
          dispatch(getQuestionDetail(id))
          swal("Tu respuesta ha sido eliminada con exito!", {
            icon: "success",
          });

        }).catch(() => {
          swal(
            "Ha ocurrido un error. Por favor, inténtelo de nuevo o contacte al soporte.",
            {
              icon: "error",
            }
          );
        })
      }
    });
  }
  const deleteQuestions = (handleClose) => {
    handleClose();
    swal({
      title: "¿Estás seguro quse sea eliminar está pregunta?",
      text: "Una vez eliminada por puede ser recuperada!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteQuestion(id))
          .then(() => {
            swal("Tu pregunta ha sido eliminada con éxito!", {
              icon: "success",
            });
            navigate("/foro");
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
  };
  useEffect(() => {
    dispatch(getQuestionDetail(id));
    socket?.on(`question_${id}`, () => {
      dispatch(getQuestionDetail(id));
    });

    return () => {
      socket?.removeAllListeners(`question_${id}`);
    };
  }, []);

  /*   useEffect(() => {
      dispatch(getQuestionDetail(id));
  
      socket?.on(`answer_${id}`, () => {
        dispatch(getQuestionDetail(id));
      });
  
      return () => {
        socket?.removeAllListeners(`answer_${id}`);
      };
    }, []); */
  return <QuestionView question={questionDetail} answers={answers} deleteAnswers={deleteAnswers} deleteQuestions={deleteQuestions}/>;
}

export default QuestionDetail;
