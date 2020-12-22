import React, {useEffect, useContext} from "react";
import { Route } from "react-router-dom"
import { ShopProvider, ShopContext } from './ShopProvider'
import { ShopVerification } from "./ShopVerification";

export const MyShop = (props) => {

    const { getSingleShop, singleShop } = useContext(ShopContext)

    useEffect(()=>{
        getSingleShop(2)
    }, [])
    
    return (
            <> 
            <h1>hi {singleShop.shop.username}</h1>
            </>  
        )
    }