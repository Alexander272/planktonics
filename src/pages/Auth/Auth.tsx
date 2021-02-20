import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/Loader/Loader'
import { login, userSelectLoading } from '../../store/user/userSlice'
import classes from './auth.module.scss'

const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

type LoginState = {
    email: string
    password: string
}
type Valid = {
    name: string
    valid: boolean
}

export const AuthPage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(userSelectLoading)

    const [loginState, setLogin] = useState<LoginState>({
        email: '',
        password: '',
    })
    const [validErrors, setValidErrors] = useState({
        email: false,
        password: false,
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({ ...loginState, [event.target.name]: event.target.value })
    }

    const validation = (state: LoginState) => {
        let name = '',
            valid = true
        if (state.password.trim().length < 6) {
            name = 'password'
            valid = false
        }
        if (!reg.test(state.email)) {
            name = 'email'
            valid = false
        }
        return { name, valid }
    }

    const loginHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        const { name, valid }: Valid = validation(loginState)
        if (!valid)
            setValidErrors(prev => ({
                ...prev,
                [name]: true,
            }))
        else {
            dispatch(login(loginState))
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={[classes.container].join(' ')}>
                {loading && (
                    <div className={classes.loader}>
                        <Loader size="md" />
                    </div>
                )}
                <div className={[classes.formContainer, classes.signInContainer].join(' ')}>
                    <form className={classes.form}>
                        <h1 className={classes.h1}>Войти</h1>
                        <input
                            value={loginState.email}
                            name="email"
                            onChange={changeHandler}
                            className={classes.input}
                            required
                            type="email"
                            placeholder="Email"
                        />
                        {validErrors.email && (
                            <p className={classes.validErrors}>Поле содержит не корректный email</p>
                        )}
                        <input
                            value={loginState.password}
                            name="password"
                            onChange={changeHandler}
                            className={classes.input}
                            required
                            type="password"
                            placeholder="Пароль"
                        />
                        {validErrors.password && (
                            <p className={classes.validErrors}>
                                Пароль должен быть длинее 6 символов
                            </p>
                        )}
                        <button onClick={loginHandler} className={classes.button}>
                            Войти
                        </button>
                    </form>
                </div>
                <div className={classes.overlayContainer}>
                    <div className={classes.overlay}>
                        <div className={[classes.overlayPanel, classes.overlayRight].join(' ')}>
                            <h1 className={classes.h1}>Привет друг!</h1>
                            <p className={classes.p}>Введите свои данные и получи доступ к чатам</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
