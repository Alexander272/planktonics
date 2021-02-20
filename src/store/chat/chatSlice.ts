import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { Message } from '../../types/message'
import mockMessage from '../../data/messageMock.json'
import mockPublicMessage from '../../data/messagePublicMock.json'

type ChatState = {
    chatName: null | string
    message: Message[]
    loading: boolean
    error: null | string
}

const initialState: ChatState = {
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
        addMessage: (state, action: PayloadAction<Message>) => {
            state.message.push(action.payload)
        },
    },
})

export const { receiving, receivingSuccess, receivingFailure, addMessage } = chatSlice.actions

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

export const chatSelectChatName = (state: RootState) => state.chat.chatName
export const chatSelectMessage = (state: RootState) => state.chat.message
export const chatSelectLoading = (state: RootState) => state.chat.loading
export const chatSelectError = (state: RootState) => state.chat.error

export default chatSlice.reducer
