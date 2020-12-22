import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

import { RegisterShop } from "./RegisterShop"


export const Register = (props) => {

    const [selectedProfileType, setProfileType] = useState(3)

    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const profile_type = selectedProfileType
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const zip_code = useRef()
    const contact_phone = useRef()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "profile_type": profile_type,
                "zip_code": zip_code.current.value,
                "contact_phone": contact_phone.current.value
            }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => {
                    return res.json()})
                .then(res => {
                        localStorage.setItem("fullstack_token", res.token)
                        props.history.push("/")
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    const shopRegister = (type) => {
        setProfileType(type)
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login form--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                <fieldset className="register-input">
                <fieldset>
                    <input type="radio" value="3" name="profile_type" onClick={e => shopRegister(3)} defaultChecked /> Register as a customer
                    <input type="radio" value="2" name="profile_type" onClick={e => shopRegister(2)} /> Register as a shop
                </fieldset>

                </fieldset>
                <fieldset className="register-input">
                    <input ref={first_name} type="text" name="first_name" className="form-control" placeholder="First Name" required autoFocus />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={last_name} type="text" name="last_name" className="form-control" placeholder="Last Name" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={username} name="username" className="form-control" placeholder="Username" />
                </fieldset>
                <fieldset>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                {selectedProfileType === 2 ? <RegisterShop /> : null}
                <fieldset className="register-input">
                    <input ref={zip_code} type="text" name="zip_code" className="form-control" placeholder="ZIP Code" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={contact_phone} type="text" name="contact_phone" className="form-control" placeholder="Phone Number" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn login-button" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
