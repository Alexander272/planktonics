import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import usersMock from '../../data/usersMock.json'

type UserState = {
    loading: boolean
    error: null | string
    name: string
    avatar: undefined | string
}

type LoginState = {
    email: string
    password: string
}

// 'https://www.pinclipart.com/picdir/big/164-1640714_user-symbol-interface-contact-phone-set-add-sign.png'

const initialState: UserState = {
    loading: false,
    error: null,
    name: '',
    avatar: undefined,
}

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: state => {
            state.loading = true
        },
        loginSuccess: (state, action: PayloadAction<{ name: string; avatar?: string }>) => {
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state.loading = false
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.loading = false
        },
    },
})

export const { loginStart, loginSuccess, loginFailure } = usersSlice.actions

export const login = ({ email, password }: LoginState): AppThunk => dispatch => {
    try {
        dispatch(loginStart())
        setTimeout(() => {
            const index = usersMock.users.findIndex(user => user.email === email)
            if (password === usersMock.users[index].password) {
                localStorage.setItem('name', usersMock.users[index].name)
                localStorage.setItem('avatar', usersMock.users[index].avatar || '')
                dispatch(
                    loginSuccess({
                        name: usersMock.users[index].name,
                        avatar: usersMock.users[index].avatar,
                    })
                )
            } else throw new Error('Введеные данные не корректны')
        }, 1500)
    } catch (error) {
        dispatch(loginFailure(error.message))
    }
}

export const avtoLogin = (): AppThunk => dispatch => {
    const name = localStorage.getItem('name')
    const avatar = localStorage.getItem('avatar')
    if (name)
        dispatch(
            loginSuccess({
                name,
                avatar: avatar ? avatar : undefined,
            })
        )
}

export const userSelectName = (state: RootState) => state.user.name
export const userSelectAvatar = (state: RootState) => state.user.avatar
export const userSelectLoading = (state: RootState) => state.user.loading
export const userSelectError = (state: RootState) => state.user.error

export default usersSlice.reducer
