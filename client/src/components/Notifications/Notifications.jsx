import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { createPortal } from 'react-dom';
import { SmileOutlined } from '@ant-design/icons';
import './notification.css';
const Notifications = () => {
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
                <div style={{ border: '1px solid black', backgroundColor: 'yellow' }}>
                    <a href={`/questions/${newNotification?.QuestionId}`}><p>{`New answer from ${newNotification?.User?.name}`}</p>
                        <p>{newNotification?.content}</p>
                    </a>
                </div>
            );

            const notificationContainer = document.createElement('div');
            document.body.appendChild(notificationContainer);

            api.open({
                message: 'Notification',
                description: createPortal(notificationContent, notificationContainer),
                onClose: () => {
                    document.body.removeChild(notificationContainer);
                    console.log('Notification was closed.');
                },
                onClick: () => {
                    console.log('Notification was clicked.');
                },
                icon: (
                    <SmileOutlined />
                ),
                type: 'info',
            });
        });

        const handleClick = (event, path) => {

            console.log('Handling click event:', event);

        };
    }, [answerComments]);

    return null;
};

export default Notifications;
