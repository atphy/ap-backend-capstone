import React, { useState } from "react"

export const CustomerContext = React.createContext()

export const CustomerProvider = (props) => {

    const [singleCustomer, setSingleCustomer] = useState({})

    const getAuthedCustomer = () => {
        return fetch(`http://localhost:8000/customers/authed_customer`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setSingleCustomer)
    }

    return (
        <CustomerContext.Provider value={{
            getAuthedCustomer, singleCustomer, setSingleCustomer
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}