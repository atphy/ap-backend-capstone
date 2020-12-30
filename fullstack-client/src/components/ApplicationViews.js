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
        <Route path="/" render={(props) => {
            return (
            <>
            <StackProvider>
            <RecordProvider>
            <ShopProvider>
            <CustomerProvider>
                <Route exact path="/" render={(props) =>
                    <Customers currentUserProfile={currentUser.profile_type} {...props} />}/>
                <Route exact path="/my_stack" render={(props) =>
                    <MyStack {...props} />}/>
                <Route exact path="/admin" render={(props) =>
                    <ApproveShop currentUserProfile={currentUser.profile_type} {...props} />}/>
            <Route exact path="/myshop" render={(props) =>
                    <MyShop currentUserProfile={currentUser.profile_type} {...props} />}/>
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