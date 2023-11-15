import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom'
import './notification.css';
const Notifications = () => {
    const navigate = useNavigate();
    const answerComments = useSelector(state => state.answerComments);

    useEffect(() => {
        const currentAnswerComments = answerComments?.Comments;
        const newAnswerComments = answerComments?.Comments; //!
        const newNotifications = newAnswerComments?.filter(
            (element) =>
                !currentAnswerComments?.some(
                    (element2) => element2.id === element.id
                )
        );
        newNotifications?.forEach((newNotification) => {
            const sound = new Audio('/NotificationSound.mp3');
            sound.play();
            // const notificationContent = (
            //     <div onClick={() => {
            //         console.log("Notification was clicked.");
            //         navigate(`/questions/${newNotification?.QuestionId}`);
            //     }}>
            //         <p>{`New answer from ${newNotification?.User?.name}`}</p>
            //         <p>{newNotification?.content}</p>
            //     </div>
            // );

            // const notificationContainer = document.createElement('div');
            // document.body.appendChild(notificationContainer);

            notification.open({
                message: `Nueva respuesta de ${newNotification?.User?.name}`,
                description: createPortal(newNotification?.answer),
                onClick: () => {
                    console.log("Notification was clicked.");
                    navigate(`/questions/${newNotification?.QuestionId}`);
                },
                onClose: () => {
                    // document.body.removeChild(notificationContainer);
                    console.log('Notification was closed.');
                },
                maxCount: 5,
            });
        });
    }, [answerComments, navigate]);

    return null;
};

export default Notifications;
