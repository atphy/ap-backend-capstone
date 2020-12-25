import React from "react";

export const ShopVerification = (props) => {

    return (
        <>
            <div className="verification-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            <h1>Hi {props.currentShop.username}</h1>
            <h2>Your shop is still pending verification.</h2>
            <h2>Expect a phone call at the number you provided, {props.currentShop.contact_phone}, or at your contact email, {props.currentShop.contact_email}</h2>
            </div>
        </>
    )
};