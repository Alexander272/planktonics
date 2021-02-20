import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from './routes'
import { avtoLogin, userSelectName } from './store/user/userSlice'

function App() {
    const dispatch = useDispatch()
    const username = useSelector(userSelectName)
    const routes = useRoutes(!!username)
    useEffect(() => {
        dispatch(avtoLogin())
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className="wrapper">{routes}</div>
        </BrowserRouter>
    )
}

export default App
