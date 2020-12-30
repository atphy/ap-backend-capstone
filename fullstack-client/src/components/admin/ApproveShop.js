import React, {useContext, useEffect} from "react";
import { ShopContext } from '../Shops/ShopProvider'
import { Redirect } from "react-router-dom"
import { Loading } from '../Loading/Loading'

export const ApproveShop = (props) => {

    const { getShops, shops, verifyShop } = useContext(ShopContext)

    useEffect(()=>{
        getShops()
    }, [])

    const handleVerifyShop = (e) => {
        e.preventDefault();
        verifyShop(e.target.id)
}

if (!props.currentUserProfile) {
    return <Loading />
} else {
    if (props.currentUserProfile !== 1) {
    return <Redirect to="/" />
    } else {
        return (
            <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            {shops.map(shop => {
                            return (
                            <div key={shop.id}>
                            <h2>{shop.username}</h2>
                            <h5>{shop.contact_phone}</h5>
                            <h5>{shop.contact_email}</h5>
                                Verified? <input id={shop.id} type="checkbox" checked={shop.verified} onChange={handleVerifyShop}/>
                            </div>
                            )
                        })}
            
            </main>
        </>
    )
                    }
                    }
};