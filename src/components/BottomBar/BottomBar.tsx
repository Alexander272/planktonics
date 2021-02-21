import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    addMessage,
    chatSelectChatName,
    chatSelectEditId,
    chatSelectMessage,
    editMessage,
} from '../../store/chat/chatSlice'
import { userSelectAvatar, userSelectName } from '../../store/user/userSlice'
import classes from './bottomBar.module.scss'

export const BottomBar = () => {
    const [message, setMessage] = useState('')
    const [validError, setValidError] = useState(false)
    const username = useSelector(userSelectName)
    const avatar = useSelector(userSelectAvatar)
    const messages = useSelector(chatSelectMessage)
    const chatName = useSelector(chatSelectChatName)
    const editId = useSelector(chatSelectEditId)
    const dispatch = useDispatch()

    useEffect(() => {
        if (editId) {
            const index = messages.findIndex(message => message.id === editId)
            setMessage(messages[index].message)
        }
    }, [editId, messages])

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value)
    }

    const sendHandler = () => {
        if (!message.trim()) {
            setValidError(true)
            return
        }
        setValidError(false)
        if (editId) {
            dispatch(editMessage(editId, chatName, message))
        } else
            dispatch(
                addMessage(chatName, {
                    id: Date.now().toString(),
                    author: username,
                    message,
                    avatar,
                })
            )
        setMessage('')
    }

    return (
        <div className={classes.bottomBar}>
            <textarea
                className={[classes.textarea, validError ? classes.error : null].join(' ')}
                name="message"
                value={message}
                onChange={changeHandler}
                placeholder="Сообщение"
            />
            <div className={classes.emoji}></div>
            <div className={classes.send} onClick={sendHandler}>
                <svg
                    className={classes.svg}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                >
                    <path d="m4.7 15.8c-.7 1.9-1.1 3.2-1.3 3.9-.6 2.4-1 2.9 1.1 1.8s12-6.7 14.3-7.9c2.9-1.6 2.9-1.5-.2-3.2-2.3-1.4-12.2-6.8-14-7.9s-1.7-.6-1.2 1.8c.2.8.6 2.1 1.3 3.9.5 1.3 1.6 2.3 3 2.5l5.8 1.1c.1 0 .1.1.1.1s0 .1-.1.1l-5.8 1.1c-1.3.4-2.5 1.3-3 2.7z" />
                </svg>
            </div>
        </div>
    )
}
