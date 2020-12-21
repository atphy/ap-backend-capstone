import React, { useRef } from "react"

export const RegisterShop = () => {

    const address = useRef()
    const city = useRef()
    const state = useRef()

    return (
        <div style={{ textAlign: "center" }}>
                <fieldset className="register-input">
                    <input ref={address} type="text" name="address" className="form-control" placeholder="Street Address" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={city} type="text" name="city" className="form-control" placeholder="City" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={state} type="text" name="state" className="form-control" placeholder="State" required />
                </fieldset>
        </div>
    )
}