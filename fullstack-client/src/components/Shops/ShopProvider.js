import React, { useState } from "react"

export const ShopContext = React.createContext()

export const ShopProvider = (props) => {

    const [shops, setShops] = useState([])
    const [singleShop, setSingleShop] = useState({})


    const getShops = () => {
        return fetch("http://localhost:8000/shops", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setShops)
    }

    const getSingleShop = (shopId) => {
        return fetch(`http://localhost:8000/shops/${shopId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setSingleShop)
    }

    const getAuthedShop = () => {
        return fetch(`http://localhost:8000/shops/authed_shop`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setSingleShop)
    }

    const verifyShop = (shopId) => {
        return fetch(`http://localhost:8000/shops/${shopId}/verification`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("fullstack_token")}`,
                "Content-Type": "application/json"
            },
        })
            .then(getShops)
    }

    return (
        <ShopContext.Provider value={{
            shops, getShops, verifyShop, getSingleShop, getAuthedShop, singleShop
        }}>
            {props.children}
        </ShopContext.Provider>
    )
}