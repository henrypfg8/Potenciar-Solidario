import { useParams } from "react-router-dom";
import QuestionView from "../../views/QuestionView/QuestionView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionDetail } from "../../Redux/actions/questionsActions";
import { io } from "socket.io-client";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const questionDetail = useSelector(state => state.questions?.questionDetail)
  console.log("question detail", questionDetail);
 

  const socket = io();
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
  return <QuestionView question={questionDetail} />;
}

export default QuestionDetail;
