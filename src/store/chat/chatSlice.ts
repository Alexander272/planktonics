import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { Message } from '../../types/message'
import mockMessage from '../../data/messageMock.json'
import mockPublicMessage from '../../data/messagePublicMock.json'

type ChatState = {
    editId: null | string
    chatName: null | string
    message: Message[]
    loading: boolean
    error: null | string
}

const initialState: ChatState = {
    editId: null,
    chatName: null,
    message: [],
    loading: false,
    error: null,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        receiving: (state, action: PayloadAction<string>) => {
            state.chatName = action.payload
            state.loading = true
        },
        receivingSuccess: (state, action: PayloadAction<Message[]>) => {
            state.message = action.payload
            state.loading = false
        },
        receivingFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
        addMessageSuccess: (state, action: PayloadAction<Message>) => {
            state.message.push(action.payload)
        },
        removeMessageSuccess: (state, action: PayloadAction<string>) => {
            state.message = state.message.filter(message => message.id !== action.payload)
        },
        editMessageStart: (state, action: PayloadAction<string>) => {
            state.editId = action.payload
        },
        editMessageSuccess: (state, action: PayloadAction<{ id: string; text: string }>) => {
            state.message = state.message.map(message => {
                if (message.id === action.payload.id) message.message = action.payload.text
                return message
            })
            state.editId = null
        },
    },
})

export const {
    receiving,
    receivingSuccess,
    receivingFailure,
    addMessageSuccess,
    removeMessageSuccess,
    editMessageStart,
    editMessageSuccess,
} = chatSlice.actions

export const getChat = (slug: string): AppThunk => dispatch => {
    try {
        dispatch(receiving(slug))
        setTimeout(() => {
            const data = localStorage.getItem(slug)
            if (slug === 'home') {
                if (data) dispatch(receivingSuccess(mockMessage.messages.concat(JSON.parse(data))))
                else dispatch(receivingSuccess(mockMessage.messages))
            } else {
                if (data)
                    dispatch(receivingSuccess(mockPublicMessage.messages.concat(JSON.parse(data))))
                else dispatch(receivingSuccess(mockPublicMessage.messages))
            }
        }, 1500)
    } catch (error) {
        dispatch(receivingFailure('Что-то пошло не так'))
    }
}

export const addMessage = (chatName: string | null, message: Message): AppThunk => dispatch => {
    try {
        if (chatName) {
            const data = localStorage.getItem(chatName)
            if (data) {
                const messages = JSON.parse(data)
                messages.push({
                    id: message.id,
                    author: message.author,
                    message: message.message,
                    avatar: message.avatar,
                })
                localStorage.setItem(chatName, JSON.stringify(messages))
            } else {
                localStorage.setItem(
                    chatName,
                    JSON.stringify([
                        {
                            id: message.id,
                            author: message.author,
                            message: message.message,
                            avatar: message.avatar,
                        },
                    ])
                )
            }
        }
        dispatch(addMessageSuccess(message))
    } catch (error) {}
}

export const removeMessage = (id: string, chatName: string | null): AppThunk => dispatch => {
    try {
        if (chatName) {
            const data = localStorage.getItem(chatName)
            if (data) {
                const messages = JSON.parse(data)
                const newMessages = messages.filter((message: Message) => message.id !== id)
                if (newMessages.length) localStorage.setItem(chatName, JSON.stringify(newMessages))
                else localStorage.removeItem(chatName)
            }
        }
        dispatch(removeMessageSuccess(id))
    } catch (error) {}
}

export const editMessage = (
    id: string,
    chatName: string | null,
    text: string
): AppThunk => dispatch => {
    try {
        if (chatName) {
            const data = localStorage.getItem(chatName)
            if (data) {
                const messages = JSON.parse(data)
                const newMessages = messages.map((message: Message) => {
                    if (message.id === id) message.message = text
                    return message
                })
                localStorage.setItem(chatName, JSON.stringify(newMessages))
            }
        }
        dispatch(editMessageSuccess({ id, text }))
    } catch (error) {}
}

export const chatSelectEditId = (state: RootState) => state.chat.editId
export const chatSelectChatName = (state: RootState) => state.chat.chatName
export const chatSelectMessage = (state: RootState) => state.chat.message
export const chatSelectLoading = (state: RootState) => state.chat.loading
export const chatSelectError = (state: RootState) => state.chat.error

export default chatSlice.reducer
