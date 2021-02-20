import React from 'react'
import classes from './header.module.scss'

type Props = {
    title: string
}

export const Header: React.FC<Props> = ({ title }) => {
    return (
        <header className={classes.header}>
            <h1 className={classes.title}>{title}</h1>
        </header>
    )
}
