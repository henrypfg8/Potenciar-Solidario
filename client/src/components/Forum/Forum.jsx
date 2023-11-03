import { useEffect } from "react";
import ForumView from '../../views/ForumView/ForumView';
import { useDispatch, useSelector } from "react-redux";
import { clearQuestionDetail, getQuestions } from "../../Redux/actions/questionsActions";

function Forum(){
    const questions = useSelector(state => state.questions?.questions)
    const dispatch = useDispatch()
    const questionDetail = useSelector(state => state.questions?.questionDetail)

    useEffect(() => {

        if(questionDetail){
            dispatch(clearQuestionDetail())
        }
    },[])
    
    useEffect(() => {
        dispatch(getQuestions())
        
    }, [dispatch])

    return <ForumView questions={questions} />
}

export default Forum;
