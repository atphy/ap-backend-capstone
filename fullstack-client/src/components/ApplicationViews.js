import React, {useEffect, useContext, useState} from "react";
import { Route, Redirect } from "react-router-dom"
import { ApproveShop } from './admin/ApproveShop'
import { MyShop } from './Shops/MyShop'
import { Customers } from './Customers/Customers'
import { UserProvider, UserContext } from './users/UserProvider'
import { ShopProvider } from './Shops/ShopProvider'
import { RecordProvider } from './Records/RecordProvider'
import { CustomerProvider } from './Customers/CustomerProvider'
import { MyStack } from './Customers/Stacks/MyStack'
import { StackProvider } from './Customers/Stacks/StackProvider'

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
                <StackProvider>
                <RecordProvider>
                <ShopProvider>
                    <MyShop {...props} />
                </ShopProvider>
                </RecordProvider>
                </StackProvider>
                </>
                )
            }
        }} />

        <Route path="/home" render={(props) => {
            if (currentUser.profile_type !== 3) {
                return <Redirect to="/" />
            } else {
            return (
            <>
            <StackProvider>
            <RecordProvider>
            <ShopProvider>
            <CustomerProvider>
                
                <Customers {...props} />
        
            </CustomerProvider>
            </ShopProvider>
            </RecordProvider>
            </StackProvider>
            </>
            )
            }
        }} />

        <Route path="/my_stack" render={(props) => {
            return (
            <>
            <StackProvider>
            <RecordProvider>
            <ShopProvider>
            <CustomerProvider>
                <MyStack {...props} />
            </CustomerProvider>
            </ShopProvider>
            </RecordProvider>
            </StackProvider>
            </>
            )
        }} />
        </>  
    )

    
};