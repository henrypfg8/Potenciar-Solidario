import { notification } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
    const answerComments = useSelector(state => state.answerComments);
    useEffect(() => {
        const currentAnswerComments = answerComments?.Comments;
        const newAnswerComments = answerComments?.Comments;
        const newNotifications = newAnswerComments?.filter(
            (element) =>
                !currentAnswerComments?.some(
                    (element2) => element2.id == element.id
                )
        );
        newNotifications?.forEach((newNotification) =>
            notification.open({
                message: `Nueva respuesta de ${newNotification?.User?.name}`,
                description: newNotification?.answer,
                onClose: () => console.log("Notification was closed."),
            })
        );
    }, [answerComments]);
    return null;
};
export default Notifications;