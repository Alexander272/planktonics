import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatSelectChatName, editMessageStart, removeMessage } from '../../store/chat/chatSlice'
import { userSelectName } from '../../store/user/userSlice'
import { Message } from '../../types/message'
import classes from './chat.module.scss'

type Props = {
    messages: Message[]
}

export const Chat: React.FC<Props> = ({ messages }) => {
    const dispatch = useDispatch()
    const username = useSelector(userSelectName)
    const chatName = useSelector(chatSelectChatName)
    const messRef = useRef(null)

    useEffect(() => {
        let current: any = messRef.current
        if (current) {
            // current.scrollIntoView({ behavior: 'smooth', block: 'end' })
            current.scrollTop = current.scrollHeight
        }
    }, [messages])

    const removeHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { id } = (event.target as HTMLParagraphElement).dataset
        if (id) dispatch(removeMessage(id, chatName))
    }
    const editHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const { id } = (event.target as HTMLParagraphElement).dataset
        if (id) dispatch(editMessageStart(id))
    }

    const createMessage = (message: Message) => {
        return (
            <>
                <div className={classes.avatar}>
                    <img
                        src={
                            message.avatar
                                ? message.avatar
                                : 'https://www.pngfind.com/pngs/m/292-2924858_user-icon-business-man-flat-png-transparent-png.png'
                        }
                        alt={message.author}
                    />
                </div>
                <div className={classes.content}>
                    <p className={classes.author}>{message.author}</p>
                    <div className={classes.textContainer}>
                        <p className={classes.text}>{message.message}</p>
                        {username === message.author && (
                            <div className={classes.btns}>
                                <p
                                    data-id={message.id}
                                    className={[classes.btn, classes.btnEdit].join(' ')}
                                    onClick={editHandler}
                                >
                                    &#9998;
                                </p>
                                <p
                                    data-id={message.id}
                                    className={[classes.btn, classes.btnDelete].join(' ')}
                                    onClick={removeHandler}
                                >
                                    &times;
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={classes.chat} ref={messRef}>
            {messages.map((message, index) => {
                return (
                    <div
                        key={message.id}
                        className={
                            username === message.author ? classes.myMessage : classes.message
                        }
                    >
                        {index > 0 ? (
                            message.author !== messages[index - 1].author ? (
                                createMessage(message)
                            ) : (
                                <div
                                    className={[
                                        classes.content,
                                        username === message.author ? classes.mr : classes.ml,
                                    ].join(' ')}
                                >
                                    <div
                                        className={[
                                            classes.textContainer,
                                            classes.textContainerRounded,
                                        ].join(' ')}
                                    >
                                        <p className={classes.text}>{message.message}</p>
                                        {username === message.author && (
                                            <div className={classes.btns}>
                                                <p
                                                    data-id={message.id}
                                                    className={[classes.btn, classes.btnEdit].join(
                                                        ' '
                                                    )}
                                                    onClick={editHandler}
                                                >
                                                    &#9998;
                                                </p>
                                                <p
                                                    data-id={message.id}
                                                    className={[
                                                        classes.btn,
                                                        classes.btnDelete,
                                                    ].join(' ')}
                                                    onClick={removeHandler}
                                                >
                                                    &times;
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        ) : (
                            createMessage(message)
                        )}
                    </div>
                )
            })}
        </div>
    )
}
