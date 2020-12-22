import React, {useEffect, useContext} from "react";
import { Route, Redirect } from "react-router-dom"
import { ApproveShop } from './admin/ApproveShop'
import { Shops } from './Shops/Shops'
import { Customers } from './Customers/Customers'
import { UserProvider, UserContext } from './users/UserProvider'
import { ShopProvider } from './Shops/ShopProvider'


// if admin
// if customer
// if shop
// if unauthed

export const ApplicationViews = (props) => {

    const { getCurrentUser, currentUser } = useContext(UserContext)

    useEffect(()=>{
        getCurrentUser()
    }, [])

//    const profileRouter = () => {
//        if (currentUser.profile_type === 1) {
//            return <Redirect to="/admin" />
//        } else if (currentUser.profile_type === 2) {
//            return <Redirect to="/home" />
//        }
//    }
    
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
                <UserProvider>
                    <Shops {...props} />
                </UserProvider>
                </>
                )
            }
        }} />

        <Route path="/home" render={(props) => {
            return (
            <>
            <UserProvider>
                <Customers {...props} />
            </UserProvider>
            </>
            )
        }} />
        </>  
    )

    
};