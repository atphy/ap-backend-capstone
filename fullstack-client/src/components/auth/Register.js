import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"
import { Button, Form, FormGroup, Input } from 'reactstrap';

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
    
    const address = useRef()
    const city = useRef()
    const state = useRef()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            
            
            const newUser = 
            {
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "profile_type": profile_type,
                "zip_code": zip_code.current.value,
                "contact_phone": contact_phone.current.value
            }
            if (selectedProfileType === 2) {            
            const newShop = {
                "address": address.current.value,
                "city": city.current.value,
                "state": state.current.value,
                "contact_email": email.current.value
            };
            Object.assign(newUser, newShop)
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
            <section>
            <Form className="container--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                <FormGroup className="register-input">
                <FormGroup check>
                    <FormGroup>
                        <Input type="radio" value="3" name="profile_type" onClick={e => shopRegister(3)} defaultChecked /> {'Register as a customer'}
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" value="2" name="profile_type" onClick={e => shopRegister(2)} />{'Register as a shop'}
                    </FormGroup>
                </FormGroup>
                </FormGroup>
                <FormGroup className="register-input">
                    <input ref={first_name} type="text" name="first_name" className="form-control" placeholder="First Name" required autoFocus />
                </FormGroup>
                <FormGroup className="register-input">
                    <input ref={last_name} type="text" name="last_name" className="form-control" placeholder="Last Name" required />
                </FormGroup>
                <FormGroup className="register-input">
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email" required />
                </FormGroup>
                <FormGroup className="register-input">
                    <input ref={username} name="username" className="form-control" placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </FormGroup>
                <FormGroup className="register-input">
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </FormGroup>
                {selectedProfileType === 2 ? 
                        <div style={{ textAlign: "center" }}>
                        <FormGroup className="register-input">
                            <input ref={address} type="text" name="address" className="form-control" placeholder="Street Address" required />
                        </FormGroup>
                        <FormGroup className="register-input">
                            <input ref={city} type="text" name="city" className="form-control" placeholder="City" required />
                        </FormGroup>
                        <FormGroup className="register-input">
                            <input ref={state} type="text" name="state" className="form-control" placeholder="State" required />
                        </FormGroup>
                </div> 
                : null}
                <FormGroup className="register-input">
                    <input ref={zip_code} type="text" name="zip_code" className="form-control" placeholder="ZIP Code" required />
                </FormGroup>
                <FormGroup className="register-input">
                    <input ref={contact_phone} type="text" name="contact_phone" className="form-control" placeholder="Phone Number" required />
                </FormGroup>
                <FormGroup style={{
                    textAlign: "center"
                }}>
                    <Button className="btn login-button" type="submit">Register</Button>
                </FormGroup>
            </Form>
            <section className="link--register">
                Already registered? <Link to="/login">Log in</Link>
            </section>
            </section>
        </main>
    )
}
