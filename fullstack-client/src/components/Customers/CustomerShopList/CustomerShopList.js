import React, {useContext, useEffect, useState} from "react";
import { ShopContext } from '../../Shops/ShopProvider'
import { ShopRecordList } from '../../Shops/ShopRecordList/ShopRecordList'

export const CustomerShopList = (props) => {
    const { getShops, shops } = useContext(ShopContext)

    useEffect(() => {
        getShops()
    }, [])

    const filteredShops = shops.filter(s => s.customer_distance < props.searchRadius)
    const sortedShops = filteredShops.sort((a, b) => (a.customer_distance > b.customer_distance) ? 1 : -1)

    return (
        <>
            <div className="customer-shop-list-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            <h3>Or</h3>
            <select>
            <option value={null}>Select from all record shops</option>
            {shops.map(shop => {
                if (shop.verified === true) {
                    return <option key={shop.id} value={shop.id}>{shop.username}</option>
                }
            })}
            </select>
            {sortedShops.map(shop => {
                if (shop.verified === true) {
                    return <div>
                    <h1>{shop.username}</h1>
                    <h2>{shop.customer_distance} miles away</h2>
                    <ShopRecordList key={shop.id} profile_type={"customer"} currentShop={shop}/>
                </div>
                }
            })}
            </div>
        </>
    )
};