import React, {useEffect, useContext, useState} from "react";
import { Route, Redirect } from "react-router-dom"
import { ApproveShop } from './admin/ApproveShop'
import { MyShop } from './Shops/MyShop'
import { Customers } from './Customers/Customers'
import { UserProvider, UserContext } from './users/UserProvider'
import { ShopProvider } from './Shops/ShopProvider'
import { RecordProvider } from './Records/RecordProvider'
import { CustomerProvider } from './Customers/CustomerProvider' 

export const ApplicationViews = (props) => {

    const { getCurrentUser, currentUser } = useContext(UserContext)

    useEffect(()=>{
        getCurrentUser()
    }, [])
    
    return (
        <>
        <Route render={() => {
            if (currentUser.profile_type === 1) {

                return <Redirect to="/admin" />

            } else if (currentUser.profile_type === 2) {

                return <Redirect to="/myshop" />

            } else if (currentUser.profile_type === 3) {
                
                return <Redirect to="/home" />
            }
        }} />

        <Route path="/admin" render={(props) => {
            if (currentUser.profile_type !== 1) {
                return <Redirect to="/" />
            } else {
                return (
                <>
                <ShopProvider>
                    <ApproveShop {...props} />
                </ShopProvider>
                </>
                )
            }
        }} />

        <Route path="/myshop" render={(props) => {
            if (currentUser.profile_type !== 2) {
                return <Redirect to="/" />
            } else {
                return (
                <>
                <RecordProvider>
                <ShopProvider>
                    <MyShop {...props} />
                </ShopProvider>
                </RecordProvider>
                </>
                )
            }
        }} />

        <Route path="/home" render={(props) => {
            return (
            <>
            <RecordProvider>
            <ShopProvider>
            <CustomerProvider>
                <Customers {...props} />
            </CustomerProvider>
            </ShopProvider>
            </RecordProvider>
            </>
            )
        }} />
        </>  
    )

    
};