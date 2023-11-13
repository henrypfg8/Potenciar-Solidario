import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom'
import './notification.css';

const Notifications = () => {
    const navigate = useNavigate();
    const answerComments = useSelector(state => state.answerComments);
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        const currentAnswerComments = answerComments?.Comments;
        const newAnswerComments = answerComments?.Comments;

        const newNotifications = newAnswerComments?.filter(
            (element) =>
                !currentAnswerComments?.some(
                    (element2) => element2.id === element.id
                )
        );
        newNotifications?.forEach((newNotification) => {
            const notificationContent = (
                <div>
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
                    navigate(`/questions/${newNotification?.QuestionId}`);
                },
                onClose: () => {
                    document.body.removeChild(notificationContainer);
                    console.log('Notification was closed.');
                },
            });
        });
    }, [answerComments]);

    return null;
};

export default Notifications;
