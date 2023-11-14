import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../../Redux/actions/questionsActions';
import UserQuetionCard from './UserQuetionCard';
import Styles from './userQuestion.module.css'

const UserQuestions = () => {
  const dispatch = useDispatch()
  const { questions } = useSelector(state => state.questions);
  const [refreshData, setRefreshData] = useState(false)


  useEffect(() => {

    dispatch(getQuestions())

  }, [refreshData])



  return (
    <div className={Styles.question__container}>

      <div  className={Styles.question__grid}>
        {questions && questions?.map(question => (
          <UserQuetionCard 
            refreshData={refreshData}
            setRefreshData={setRefreshData}
            key={question.id} 
            question={question} />
        ))}
      </div>
    </div>
  )
}

export default UserQuestions