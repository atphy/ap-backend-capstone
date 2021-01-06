/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Loading } from "../Loading/Loading";
import { CustomerShopList } from './CustomerShopList/CustomerShopList'
import "./Customers.css"

export const Customers = (props) => {

    if (props.singleCustomer === undefined) {
        return <Loading />
    } else {
        return ( 
            <div>
            <CustomerShopList {...props} searchZip={props.searchZip} key="customer_shop_list" currentUserProfile={props.currentUserProfile} searchRadius={props.searchRadius} singleCustomer={props.singleCustomer} />
            </div>
        )
        }
    }