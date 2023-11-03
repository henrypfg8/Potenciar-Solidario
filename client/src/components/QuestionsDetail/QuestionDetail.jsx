import { useParams } from "react-router-dom";
import QuestionView from "../../views/QuestionView/QuestionView";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionDetail } from "../../Redux/actions/questionsActions";

function QuestionDetail(){
    const { id } = useParams();
    const dispatch = useDispatch()
    const questionDetail = useSelector(state => state.questions.questionDetail)

    useEffect(() => {
        dispatch(getQuestionDetail(id))
        // console.log(questionDetail);
    },[])
    
    


    return <QuestionView question={questionDetail}/>
}

export default QuestionDetail;
