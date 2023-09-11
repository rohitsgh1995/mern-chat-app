import styles from './styles.module.css';
import { useState, useEffect } from 'react';

const Messages = ({ socket }) => {

    const [messageReceived, setMessageReceived] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessageReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ]);
        });

        return () => socket.off('receive_message');
    }, [socket]);

    function formatDateFromTimeStamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className={styles.messageColumn}>
            {messageReceived.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimeStamp(msg.__createdtime__)}
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    );

};

export default Messages;