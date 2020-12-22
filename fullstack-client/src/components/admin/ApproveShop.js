import React, {useContext, useEffect} from "react";
import { ShopContext } from '../Shops/ShopProvider'

export const ApproveShop = (props) => {

    const { getShops, shops, verifyShop } = useContext(ShopContext)

    useEffect(()=>{
        getShops()
    }, [])

    const handleVerifyShop = (e) => {
        e.preventDefault();
        verifyShop(e.target.id)
}


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
};