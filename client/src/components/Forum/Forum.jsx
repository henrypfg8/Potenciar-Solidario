import { useEffect } from "react";
import ForumView from '../../views/ForumView/ForumView';
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../Redux/actions/questionsActions";

function Forum(){
    const questions = useSelector(state => state.questions.questions)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getQuestions())
    }, [])

    return <ForumView questions={questions} />
}

export default Forum;
