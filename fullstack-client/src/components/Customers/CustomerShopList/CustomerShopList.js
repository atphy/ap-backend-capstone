import React, {useContext, useEffect } from "react";
import { ShopContext } from '../../Shops/ShopProvider'
import { ShopRecordList } from '../../Shops/ShopRecordList/ShopRecordList'
import { useHistory } from "react-router-dom";

export const CustomerShopList = (props) => {
    const history = useHistory();

    const { getShops, shops } = useContext(ShopContext)

    useEffect(() => {
        getShops()
    }, [])

    const filteredShops = shops.filter(s => s.customer_distance < props.searchRadius)
    const sortedShops = filteredShops.sort((a, b) => (a.customer_distance > b.customer_distance) ? 1 : -1)

    return (
        <>
            <div className="customer-shop-list-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            <div className="customer-top-info">
            <h3>Or&nbsp;&nbsp;</h3>
            <select onChange={(e) => {
                        if(e.target.value){
                            history.push(`/shops/${e.target.value}`)}}
                        }
                        >
            <option value={null}>Select from all record shops</option>
            {shops.map(shop => {
                if (shop.verified === true) {
                    return <option key={shop.id} value={shop.id}>{shop.username}</option>
                }
            })}
            </select>
            </div>
            <div className="main-shop-list">
            {sortedShops.map(shop => {
                if (shop.verified === true) {
                    return <div key={shop.id}>
                    <h1 onClick={() => {
                    history.push(`/shops/${shop.id}`)}}>
                    {shop.username}</h1>
                    <p>{shop.customer_distance} miles away</p>
                    <ShopRecordList conditionalListClass="d-flex flex-row flex-nowrap container-fluid py-2 shop-record-list-container" conditionalItemClass="shop-record-container" singleCustomer={props.singleCustomer} key={shop.id} currentUserProfile={props.currentUserProfile} currentShop={shop}/>
                </div>
                }
            })}
            </div>
            </div>
        </>
    )
};