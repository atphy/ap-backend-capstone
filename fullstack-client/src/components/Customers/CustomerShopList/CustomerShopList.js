import React, {useContext, useEffect, useState} from "react";
import { ShopContext } from '../../Shops/ShopProvider'
import { ShopRecordList } from '../../Shops/ShopRecordList/ShopRecordList'

export const CustomerShopList = (props) => {
    const { getShops, shops } = useContext(ShopContext)

    useEffect(() => {
        getShops()
    }, [])

    return (
        <>
            <div className="customer-shop-list-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            <button>Change ZIP code</button>
            {shops.map(shop => {
                if (shop.verified === true) {
                    return <div>
                    <h1>{shop.username}</h1>
                    <ShopRecordList profile_type={"customer"} currentShop={shop}/>
                </div>
                }
            })}
            </div>
        </>
    )
};