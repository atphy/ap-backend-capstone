import React, {useEffect, useContext, useState} from "react";
import { Redirect } from "react-router-dom"
import { Loading } from "../Loading/Loading";
import { ShopContext } from './ShopProvider'
import { ShopRecordList } from "./ShopRecordList/ShopRecordList";
import { ShopVerification } from './ShopVerification';

export const MyShop = (props) => {

    const { getAuthedShop, singleShop } = useContext(ShopContext)

    useEffect(()=>{
        getAuthedShop()
    }, [])
    

    if (singleShop === undefined || !props.currentUserProfile) {

        return <Loading />

    } else {
        if (props.currentUserProfile !== 2) {
            return <Redirect to="/" />
            } else {

        return (
            <div>{singleShop.verified ? 
            <div>
            <h1>{singleShop.username}</h1>
            <button>Add Record</button>
            <ShopRecordList getAuthedShop={getAuthedShop} profile_type={"shop"} currentShop={singleShop}/>
            </div>
            :<ShopVerification currentShop={singleShop}/> }</div>
        )
        }
    }
    }