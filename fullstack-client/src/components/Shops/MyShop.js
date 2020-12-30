import React, {useEffect, useContext, useState} from "react";
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"
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
            <Link to={{pathname:`/`}}>Back to home</Link>
            <h1>{singleShop.username}</h1>
            <button>Add Record</button>
            <ShopRecordList isMyShop={true} getAuthedShop={getAuthedShop} currentUserProfile={props.currentUserProfile} currentShop={singleShop}/>
            </div>
            :<ShopVerification currentShop={singleShop}/> }</div>
        )
        }
    }
    }