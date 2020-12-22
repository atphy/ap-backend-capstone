import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUserProfile, setCurrentUserProfile] = useState({})

    const getUsers = () => {
        return fetch("http://localhost:8000/profiles", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/profiles/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentUser)
                .then(console.warn(currentUser))
    }

    const getUserProfile = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())

    }

    return (
        <UserContext.Provider value={{
            users, getUsers, currentUser, getCurrentUser, getUserProfile, loggedIn, setLoggedIn, setCurrentUser, currentUserProfile, setCurrentUserProfile,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}