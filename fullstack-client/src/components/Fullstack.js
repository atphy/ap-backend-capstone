import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Fullstack.css"
import { UserProvider } from "./users/UserProvider"
import { ShopProvider } from './Shops/ShopProvider'

export const Fullstack = () => (
    <div className="main-container">
        <div className="secondary-container">
        <Route path="/" render={() => {
            if (localStorage.getItem("fullstack_token")) {

                return (
                    <>
                    <ShopProvider>
                    <UserProvider>
                        <Route render={props =>
                            <ApplicationViews
                            {...props}  />} />

                    </UserProvider>
                    </ShopProvider>
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
                <>
                <UserProvider>
                    <Login {...props} />
                </UserProvider>
                </>
                )
            }
        }} />

        <UserProvider>
            <Route path="/register" render={(props) => {
                if (localStorage.getItem("fullstack_token")) {
                    return <Redirect to="/" />
                }
                else {
                    return <Register {...props}/>
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
    </div>
)