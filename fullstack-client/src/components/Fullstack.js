import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Fullstack.css"
import { UserProvider } from "./users/UserProvider"
import { ShopProvider } from './Shops/ShopProvider'
import { CustomerProvider } from './Customers/CustomerProvider'

export const Fullstack = () => (
    <div className="main-container">
        <Route path="/" render={() => {
            if (localStorage.getItem("fullstack_token")) {

                return (
                    <>
                    <CustomerProvider>
                    <ShopProvider>
                    <UserProvider>
                        <Route render={props =>
                            <ApplicationViews
                            {...props}  />} />

                    </UserProvider>
                    </ShopProvider>
                    </CustomerProvider>
                    </>
                )
            }
            else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={(props) => {
            if (localStorage.getItem("fullstack_token")) {
                return <Redirect to="/" />
            } else {
                return (
                <div className="secondary-container">
                <UserProvider>
                    <Login {...props} />
                </UserProvider>
                </div>
                )
            }
        }} />

        <UserProvider>
            <Route path="/register" render={(props) => {
                if (localStorage.getItem("fullstack_token")) {
                    return <Redirect to="/" />
                }
                else {
                    return <div className="secondary-container">
                    <Register {...props}/>
                    </div>
                }
            }} />
        </UserProvider>

        <Route path="/test" render={(props) => {
                return (
                <>
                <h1>hi</h1>
                </>
                )
        }} />
    </div>
)