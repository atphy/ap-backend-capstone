import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Fullstack.css"
import { UserProvider } from "./users/UserProvider"

export const Fullstack = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("fullstack_token")) {

                return (
                    <>
                    <UserProvider>
                        <Route render={props =>
                            <ApplicationViews
                            {...props}  />} />

                    </UserProvider>
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
    </>
)