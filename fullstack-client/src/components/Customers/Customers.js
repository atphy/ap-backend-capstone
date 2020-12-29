import React, {useEffect, useContext, useState} from "react";
import { Loading } from "../Loading/Loading";
import { CustomerContext } from './CustomerProvider'
import { CustomerShopList } from './CustomerShopList/CustomerShopList'

export const Customers = (props) => {

    const { getAuthedCustomer, singleCustomer } = useContext(CustomerContext)

    useEffect(()=>{
        getAuthedCustomer()
    }, [])
    

    if (singleCustomer === undefined) {
        return <Loading />
    } else {

        return ( 
            <div>
            <h1>hi {singleCustomer.username}</h1>
            <CustomerShopList />
            </div>
        )
        }
    }