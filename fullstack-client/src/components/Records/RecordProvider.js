import React, { useState } from "react"

export const RecordContext = React.createContext()

export const RecordProvider = (props) => {

    const [singleRecord, setSingleRecord] = useState({})

    const getSingleRecord = (recordId) => {
        return fetch(`http://localhost:8000/records/${recordId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setSingleRecord)
    }

    const addRecord = record => {
        return fetch("http://localhost:8000/records", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(record)
        })
    }

    const updateRecord = (record_id, record) => {
        return fetch(`http://localhost:8000/records/${record_id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(record)
        })
    }

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
            deleteRecord, getSingleRecord, singleRecord, addRecord, updateRecord
        }}>
            {props.children}
        </RecordContext.Provider>
    )
}