import React, { useRef, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from '../users/UserProvider'
import "./Auth.css"
import { Button, Form, FormGroup } from 'reactstrap';

export const Login = (props) => {
    const username = useRef(null)
    const password = useRef(null)
    const invalidDialog = useRef(null)

    const {setLoggedIn } = useContext(UserContext)

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setLoggedIn(true)
                    localStorage.setItem("fullstack_token", res.token)
                    props.history.push("/");
                }
                else {
                    invalidDialog.current.showModal();
                }
            })
        }



    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <Form className="form--login" onSubmit={handleLogin}>
                    <h1 className="login-header">Sign In</h1>
                    <FormGroup>
                        <input
                            ref={username}
                            type="text"
                            name="username"
                            id="username"
                            className="form-control"
                            defaultValue="admin"
                            placeholder="Username"
                            required
                            autoFocus />
                    </FormGroup>
                    <FormGroup>
                        <input ref={password}
                            type="password"
                            id="password"
                            className="form-control"
                            defaultValue="me"
                            placeholder="Password"
                            required />
                    </FormGroup>
                    <FormGroup style={{
                        textAlign:"center"
                    }}>
                        <Button className="btn login-button" type="submit">Log in</Button>
                    </FormGroup>
                </Form>
            </section>
            <section className="link--register">
                <Link to="/register">Or sign up!</Link>
            </section>
        </main>
    )
}