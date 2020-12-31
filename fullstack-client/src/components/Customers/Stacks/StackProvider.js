import React, { useState } from "react"

export const StackContext = React.createContext()

export const StackProvider = (props) => {
    const [stackItems, setStackItems] = useState([])

    const getMyStackItems = () => {
        return fetch("http://localhost:8000/my_stack", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setStackItems)
    }

    const addStackItem = (newStackItem) => {
        return fetch("http://localhost:8000/my_stack", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStackItem)
        })
        .then(getMyStackItems)
    }

    const removeStackItem = (stackId) => {
        return fetch(`http://localhost:8000/my_stack/${stackId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            },
        })
        .then(getMyStackItems)
    }

    return (
        <StackContext.Provider value={{stackItems, getMyStackItems, addStackItem, removeStackItem}}>
            {props.children}
        </StackContext.Provider>
    )

}