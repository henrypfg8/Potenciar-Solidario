import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom'
import { getAnswers } from '../../Redux/actions/answersActions';
import './notification.css';
const Notifications = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const answerComments = useSelector(state => state.answerComments);
    const answers = useSelector(state => state.answers);
    const [api] = notification.useNotification();

    useEffect(() => {
        dispatch(getAnswers());
    }, [dispatch]);
    useEffect(() => {
        const currentAnswerComments = answerComments?.Comments;
        const newAnswerComments = answers; //!
        // const newAnswerComments = getNewComments();
        const newNotifications = newAnswerComments?.filter(
            (element) =>
                !currentAnswerComments?.some(
                    (element2) => element2.id === element.id
                )
        );
        newNotifications?.forEach((newNotification) => {
            const sound = new Audio('/NotificationSound.mp3');
            sound.play();
            const notificationContent = (
                <div onClick={() => {
                    console.log("Notification was clicked.");
                    navigate(`/questions/${newNotification?.QuestionId}`);
                }}>
                    <p>{`New answer from ${newNotification?.User?.name}`}</p>
                    <p>{newNotification?.content}</p>
                </div>
            );

            const notificationContainer = document.createElement('div');
            document.body.appendChild(notificationContainer);

            api.open({
                message: 'Notification',
                description: createPortal(notificationContent, notificationContainer),
                onClick: () => {
                    console.log("Notification was clicked.");
                    navigate(`/questions/${newNotification?.QuestionId}`);
                },
                onClose: () => {
                    document.body.removeChild(notificationContainer);
                    console.log('Notification was closed.');
                },
                maxCount: 10,
            });
        });
    }, [answerComments, api, navigate]);

    return null;
};

export default Notifications;
