import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import chatReducer from './chat/chatSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
