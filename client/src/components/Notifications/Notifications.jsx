import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';

const Notifications = () => {
    const answerComments = useSelector(state => state.answerComments);
    const audio = new Audio('/sounds/notification.mp3');
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
            }),
            audio.play()
        );
    }, [answerComments]);

    return null;
};

export default Notifications;