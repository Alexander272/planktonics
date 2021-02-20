import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from './pages/Home/Home'
import { PublicPage } from './pages/Public/Public'
import { PageNotFound } from './pages/PageNotFound/404'
import { AuthPage } from './pages/Auth/Auth'

export const useRoutes = (isAuth: boolean) => {
    if (isAuth)
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/society" exact>
                    <PublicPage />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        )
    else
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        )
}
