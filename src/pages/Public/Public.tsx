import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chatSelectLoading, chatSelectMessage, getChat } from '../../store/chat/chatSlice'
import { BottomBar } from '../../components/BottomBar/BottomBar'
import { Chat } from '../../components/Chat/Chat'
import { Header } from '../../components/Header/Header'
import { SideBar } from '../../components/SideBar/SideBar'
import { Loader } from '../../components/Loader/Loader'

export const PublicPage = () => {
    const message = useSelector(chatSelectMessage)
    const loading = useSelector(chatSelectLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChat('society'))
    }, [dispatch])

    return (
        <div className="container">
            <SideBar />
            <div className="chatContainer">
                <Header title="Чат для общения" />
                {loading || !message.length ? <Loader size="md" /> : <Chat messages={message} />}
                <BottomBar />
            </div>
        </div>
    )
}
