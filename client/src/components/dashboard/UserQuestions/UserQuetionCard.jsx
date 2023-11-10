import proptypes from 'prop-types'


const UserQuetionCard = ({question}) => {
  return (
    <div>

        <div>
            <h2>{question.title}</h2>
            <p>{ question.text}</p>
            <div>
                {question.User?.name}
            </div>
        </div>
    </div>
  )
}

UserQuetionCard.propTypes = {
    question: proptypes.object.isRequired
}
export default UserQuetionCard