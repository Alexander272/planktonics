import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userSelectAvatar, userSelectName } from '../../store/user/userSlice'
import classes from './sideBar.module.scss'

export const SideBar = () => {
    const username = useSelector(userSelectName)
    const avatar = useSelector(userSelectAvatar)

    return (
        <div className={classes.sideBar}>
            <div className={classes.userInfo}>
                <div className={classes.image}>
                    <img
                        src={
                            avatar ||
                            'https://www.pngfind.com/pngs/m/292-2924858_user-icon-business-man-flat-png-transparent-png.png'
                        }
                        alt={username}
                    />
                </div>
                <h5 className={classes.userName}>{username}</h5>
            </div>
            <div className={classes.chats}>
                <p className={classes.title}>Чаты</p>
                <NavLink to="/" exact className={classes.link} activeClassName={classes.activeLink}>
                    <img
                        src="https://cdn0.iconfinder.com/data/icons/seo-flat-icons/128/suitcase-512.png"
                        alt="Рабочий чат"
                        className={classes.linkImage}
                    />
                    Рабочий чат
                </NavLink>
                <NavLink
                    to="/society"
                    className={classes.link}
                    activeClassName={classes.activeLink}
                >
                    <img
                        src="https://www.pngkit.com/png/full/412-4125178_manage-users-learning-team-vector-icon-png.png"
                        alt="Чат для общения"
                        className={classes.linkImage}
                    />
                    Чат для общения
                </NavLink>
            </div>
        </div>
    )
}
