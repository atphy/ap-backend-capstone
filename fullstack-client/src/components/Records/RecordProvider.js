import React from "react"

export const RecordContext = React.createContext()

export const RecordProvider = (props) => {


    const deleteRecord = id => {
        return fetch(`http://localhost:8000/records/${id}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`
            }
        })
    }

    return (
        <RecordContext.Provider value={{
            deleteRecord,
        }}>
            {props.children}
        </RecordContext.Provider>
    )
}