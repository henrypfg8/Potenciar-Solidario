import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getQuestions } from '../../../Redux/actions/questionsActions';
import UserQuetionCard from './UserQuetionCard';


const UserQuestions = () => {
    const dispatch = useDispatch()  
    const {questions} = useSelector(state => state.questions)
   useEffect(() => {
    dispatch(getQuestions())
   }, [])
   console.log(questions)
  return (
    <div>

      {questions && questions?.map (question => (
        <UserQuetionCard key={question.id} question={question}/>
      ))}
    </div>
  )
}

export default UserQuestions